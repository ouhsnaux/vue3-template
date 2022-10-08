import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useEnv } from '../../build';
import { getToken, removeToken } from './token';
// import 'element-plus/es/components/message/style/css';

interface Response {
  code: number;
  msg: string;
  data: object;
}

const { VITE_API_TIME_OUT, VITE_API_BASE_URL } = useEnv(import.meta.env);
const request = axios.create({
  baseURL: VITE_API_BASE_URL,
  timeout: VITE_API_TIME_OUT,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

const handleHttpReq = (config: AxiosRequestConfig) => {
  // 添加token
  const token = getToken();
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};

const handleExpired = () => {
  ElMessageBox.alert('登录状态已过期，需要重新登录', '系统提示', {
    confirmButtonText: '确定',
    type: 'warning',
    showClose: false,
  }).then(() => {
    removeToken();
    window.location.reload();
  });
};

const handleHttpError = (err: Error) => {
  if (err.message.includes('timeout')) {
    err.message = '请求超时！';
  }
  ElMessage({ message: err.message, type: 'error' });
  return Promise.reject(err);
};

const handleHttpRes = (res: AxiosResponse<Response>) => {
  const { code, msg, data } = res.data;
  if (code === 200) {
    return data;
  }
  if (code === 401) {
    return handleExpired();
  }
  return handleHttpError(new Error(msg));
};

request.interceptors.request.use(handleHttpReq, Promise.reject);
request.interceptors.response.use(handleHttpRes, handleHttpError);

export default request;
