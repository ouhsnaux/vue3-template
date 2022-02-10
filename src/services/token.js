import { setItem, getItem } from './storage';

const tokenKey = 'token';

export const getToken = () => getItem(tokenKey);

export const hasToken = () => !!getToken();

export const setToken = (token) => {
  setItem(tokenKey, token);
};

export const removeToken = () => {
  setItem(tokenKey, '');
};
