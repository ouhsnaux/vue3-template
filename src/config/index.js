import * as common from './common';
import * as development from './dev';
import * as production from './prod';

const config = import.meta.env === 'development' ? development : production;

export default {
  ...common,
  ...config,
};
