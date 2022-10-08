import request from '@/services/request';
import { Options, RequestOptions } from '@/@types/options';

export const getOptions: RequestOptions = () => request.get('option');

type RequestMultiOptions = (keys: Array<string>) => Promise<Record<string, Options>>;
const getMultiOptions: RequestMultiOptions = (keys) => request.get('options', { params: { keys } });

const optionMap: Record<string, Options> = {};
let queueKeys: Array<string> = [];
const fetchingKeys: Array<Array<string>> = [];
const resolveMap: Record<string, Array<Function>> = {};
const rejectMap: Record<string, Array<Function>> = {};
let timeout: any;
const maxQueueLength = 20;

const batchFetch = () => {
  const keys = queueKeys.slice(0, maxQueueLength);
  queueKeys = queueKeys.slice(maxQueueLength);
  fetchingKeys.push(keys);
  getMultiOptions(keys)
    .then((data) => {
      keys.forEach((key) => {
        resolveMap[key].forEach((resolve) => {
          optionMap[key] = data[key];
          resolve(data[key]);
        });
      });
    })
    .catch((e) => {
      keys.forEach((key) => {
        rejectMap[key].forEach((reject) => {
          reject(e);
        });
      });
    })
    .finally(() => {
      const index = fetchingKeys.findIndex((item) => item === keys);
      fetchingKeys.splice(index, 1);
      keys.forEach((key) => {
        delete resolveMap[key];
        delete rejectMap[key];
      });
    });
};

export const getOption = (key: string): Promise<Options> => {
  if (optionMap[key]) {
    return Promise.resolve(optionMap[key]);
  }
  return new Promise((resolve, reject) => {
    if (!resolveMap[key]) {
      resolveMap[key] = [];
      rejectMap[key] = [];
    }
    resolveMap[key].push(resolve);
    rejectMap[key].push(reject);
    if (queueKeys.includes(key) || fetchingKeys.some((arr) => arr.includes(key))) {
      return;
    }
    clearTimeout(timeout);
    if (queueKeys.length >= maxQueueLength) {
      batchFetch();
    } else {
      timeout = setTimeout(() => {
        batchFetch();
      }, 200);
    }
  });
};
