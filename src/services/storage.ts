function getItem(key: string) {
  return localStorage.getItem(key);
}

function getObject(key: string) {
  const result = getItem(key);
  return result ? JSON.parse(result) : {};
}

function setItem(key: string, value: string | object) {
  let content = '';
  if (typeof value === 'string') {
    content = value;
  } else {
    content = JSON.stringify(value);
  }
  localStorage.setItem(key, content);
}

function setObject(key: string, value: object) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key: string) {
  localStorage.removeItem(key);
}

export { getItem, getObject, setItem, setObject, removeItem };
