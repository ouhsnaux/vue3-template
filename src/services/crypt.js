import { sm4 as SM4 } from 'gm-crypt';
import { getToken } from './token';

let sm4;

export const setCryptKey = () => {
  const token = getToken();
  if (!token) {
    return;
  }
  sm4 = new SM4({
    key: token.padEnd(16, '0').slice(0, 16),
    mode: 'ecb',
    cipherType: 'base64',
  });
};

setCryptKey();

export const sm4Encrypt = (data) => sm4.encrypt(data);

export const sm4Decrypt = (data) => sm4.decrypt(data);
