// 非空
export const isEmpty = (arr) => !arr || arr.length === 0;

// 提取其中的值
export const extract = (arr, key) => arr.map((item) => item[key]);

// 获取最后一个值
export const getLast = (arr) => (isEmpty(arr) ? null : arr[arr.length - 1]);
