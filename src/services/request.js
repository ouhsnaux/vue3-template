import axios from 'axios';
import { getToken, removeToken } from '@/services/token';
import { sm4Encrypt, sm4Decrypt } from '@/services/crypt';
import { Message, MessageBox } from 'element-plus';

console.log(import.meta.env);
// 处理请求
const handleHttpReq = (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    const { VITE_ENCRYPT, MODE } = import.meta.env;
    if (VITE_ENCRYPT) {
      if (MODE === 'development') {
        console.log(config.url);
        console.log(config.data);
      }

      // 对请求体进行加密
      if (token && config.data) {
        config.data = sm4Encrypt(JSON.stringify(config.data));
      }
    }
  }
  return config;
};
const alertError = (message) => {
  Message({ message, type: 'error' });
};

let open = false;

const handleExpired = () => {
  if (open) return;
  open = true;
  MessageBox.alert('登录状态已过期，需要重新登录', '系统提示', {
    confirmButtonText: '确定',
    type: 'warning',
    showClose: false,
  }).then(() => {
    removeToken();
    window.location.reload();
  });
};

// 错误处理
const handleHttpErr = (err) => {
  let error;
  if (!(err instanceof Error)) {
    error = err;
  } else if (err.message.includes('timeout')) {
    error = '请求超时！';
  } else {
    error = err.message;
  }

  alertError(error);
  return Promise.reject(error);
};

const errorCodeMsg = {
  401: '认证失败，无法访问系统资源',
  403: '当前操作没有权限',
  404: '访问资源不存在',
  default: '系统未知错误,请反馈给管理员',
};

// 处理返回结果
export const handleHttpRes = (res) => {
  let {
    data: { data: resData },
  } = res;
  const { VITE_ENCRYPT, MODE } = import.meta.env;
  if (VITE_ENCRYPT) {
    if (typeof resData === 'string' && getToken()) {
      try {
        resData = JSON.parse(sm4Decrypt(resData));
      } catch (e) {
        console.log(res.config.url);
        console.error(e);
        handleExpired();
      }
    }
    if (MODE === 'development') {
      console.log(res.config.url);
      console.log(JSON.parse(JSON.stringify(resData || {})));
    }
  }
  const { code, msg, data } = resData;
  if (code === 200) {
    return data;
  }
  if (code === 401) {
    return handleExpired();
  }
  return handleHttpErr(msg || errorCodeMsg[code] || errorCodeMsg.default);
};

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: import.meta.env.VITE_API_TIME_OUT,
});

request.interceptors.request.use(handleHttpReq, Promise.reject);
request.interceptors.response.use(handleHttpRes, handleHttpErr);

export default request;
