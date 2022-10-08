import { getOptions } from '@/api/options';

export const fields1 = [
  {
    form: { prop: 'name', label: '姓名' },
    input: { component: 'ElInput' },
  },
  {
    form: { prop: 'age', label: '年龄' },
    input: { component: 'NumberInput' },
  },
  {
    form: { prop: 'password', label: '密码' },
    input: { component: 'ElInput', type: 'password' },
  },
  {
    form: { prop: 'interest', label: '爱好', labelWidth: '50px' },
    input: { component: 'ElInput', type: 'textarea' },
  },
  {
    form: { prop: 'favorite1', label: '爱吃' },
    input: { component: 'SelectInput', options: getOptions() },
  },
  {
    form: { prop: 'favorite2', label: '爱吃' },
    input: { component: 'RadioGroup', options: getOptions() },
  },
  {
    form: { prop: 'favorite3', label: '爱吃' },
    input: { component: 'CheckboxGroup', options: getOptions() },
  },
];

export const fields2 = [
  {
    form: {
      prop: 'name',
      label: '姓名',
      rules: [{ required: true, trigger: 'blur', message: '姓名不能为空' }],
    },
    input: { component: 'ElInput' },
  },
  {
    form: {
      prop: 'age',
      label: '年龄',
      rules: [
        { required: true, trigger: 'blur', message: '请输入年龄' },
        {
          validator: (rule: any, value: number, callback: Function) => {
            if (value < 18) {
              callback(new Error('未成年'));
              return;
            }
            callback();
          },
        },
      ],
    },
    input: { component: 'NumberInput' },
  },
  {
    form: { prop: 'favorite3', label: '爱吃', rules: [{ required: true, message: '请选择' }] },
    input: { component: 'CheckboxGroup', options: getOptions() },
  },
];

export const fields3 = [
  {
    form: {
      prop: 'name',
      label: '姓名',
    },
    input: { slotName: 'name', type: 'textarea' },
  },
];

export const fields4 = [
  {
    form: { prop: 'favorite1', label: '爱吃' },
    input: {
      component: 'SelectInput',
      options: getOptions(),
    },
  },
  {
    form: { prop: 'favorite2', label: '爱吃' },
    input: { component: 'RadioGroup', options: getOptions() },
  },
  {
    form: { prop: 'favorite3', label: '爱吃' },
    input: { component: 'CheckboxGroup', options: getOptions() },
  },
];
