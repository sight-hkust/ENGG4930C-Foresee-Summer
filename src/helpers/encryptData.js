import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../config/config';

export const encryptData = (data) => {
  let userEncryptedData = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();

  return userEncryptedData;
};

export const decryptData = (encrypt_data) => {
  let userDecryptedData = CryptoJS.AES.decrypt(encrypt_data, SECRET_KEY).toString(CryptoJS.enc.Utf8);

  return userDecryptedData;
};
