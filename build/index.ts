/* eslint-disable */
const numberTypeKey = ['VITE_API_TIME_OUT'];
// TODO 解决eslint报错问题
export const useEnv = (env: Recordable): ImportMetaEnv =>
  Object.keys(env).reduce((acc, key) => {
    let value = env[key];
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (numberTypeKey.includes(key)) {
      value = +value;
    }
    acc[key] = value;
    return acc;
  }, {});
