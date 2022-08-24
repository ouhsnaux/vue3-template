// 需要与.env配置文件保持一致
// const baseURL = '/api';

export default [
  {
    url: '/api/option',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶' },
          { value: '选项3', label: '蚵仔煎' },
          { value: '选项4', label: '龙须面' },
          { value: '选项5', label: '北京烤鸭' },
        ],
      };
    },
  },
  {
    url: '/api/getUser',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: ['tom', 'jerry'],
      };
    },
  },
];
