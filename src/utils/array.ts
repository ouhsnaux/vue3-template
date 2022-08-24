// 非空
export const isEmpty = (arr: any[]): boolean => !arr || arr.length === 0;

// 提取其中的值
export const extract = <T, K extends keyof T>(arr: Array<T>, key: K): Array<T[K]> =>
  arr.map((item) => item[key]);

// 获取最后一个值
export const getLast = <T>(arr: Array<T>, index = 1) =>
  isEmpty(arr) ? null : arr[arr.length - index];
