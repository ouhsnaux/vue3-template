export const getItem = (key) => localStorage.getItem(key);

export const getObj = (key) => {
  const str = getItem(key);
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
};

export const setItem = (key, item) => localStorage.setItem(key, item);
