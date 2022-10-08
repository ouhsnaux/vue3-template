import { deepClone } from '../_';

const setDeepVal = (data: any, prop: string, value: any) => {
  if (!prop.includes('.')) {
    data[prop] = value;
    return;
  }
  const propArr = prop.split('.');
  const last = propArr.pop() as string;
  let result = data;
  propArr.forEach((item) => {
    if (!result) {
      return;
    }
    result = result[item];
  });
  if (!result) {
    return;
  }
  result[last] = value;
};

export default function (fields: Array<any>) {
  return fields.reduce((acc, cur) => {
    const {
      form: { prop },
      input: { defaultValue },
    } = cur;
    let realValue = defaultValue;
    switch (typeof defaultValue) {
      case 'function':
        realValue = defaultValue();
        break;
      case 'object':
        realValue = defaultValue && deepClone(defaultValue);
        break;
      default:
        break;
    }
    setDeepVal(acc, prop, realValue);
    return acc;
  }, {});
}
