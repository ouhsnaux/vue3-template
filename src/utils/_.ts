export const deepClone = <T>(data: T, map = new Map<any, any>()): T => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  const mapValue = map.get(data);
  if (mapValue) {
    return mapValue;
  }
  if (data instanceof Date) {
    return new Date(data) as unknown as T;
  }
  if (data instanceof RegExp) {
    const result = new RegExp(data.source, data.flags);
    result.lastIndex = data.lastIndex;
    return result as unknown as T;
  }
  const target = Array.isArray(data) ? [] : {};
  map.set(data, target);
  Object.keys(data).forEach((key) => {
    // @ts-ignore
    target[key] = deepClone(data[key], map);
  });
  // @ts-ignore
  return target;
};

export function debounce(func: Function, time = 200, immediate = false) {
  let timeout: number;
  let todo = immediate;
  return function (...rest: any[]) {
    if (immediate && todo) {
      // @ts-ignored
      func.apply(this, rest);
      todo = false;
      return;
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      // @ts-ignored
      func.apply(this, rest);
      todo = true;
    }, time);
  };
}
