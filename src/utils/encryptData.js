import CryptoJS from "crypto-js";
import { cryptoJSkey } from "../../secrets";

const encryptDataType = ["birthday", "email", "phone"];

export const encryptData = (data) => {
  let result = {};

  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (encryptDataType.includes(key)) {
      const encryptedData = CryptoJS.AES.encrypt(
        data[key],
        cryptoJSkey
      ).toString();
      result[key] = encryptedData;
    } else {
      result[key] = data[key];
    }
  });

  return result;
};

export const decryptData = (encryptedData) => {
  let result = {};
  const keys = Object.keys(encryptedData);
  keys.forEach((key) => {
    if (encryptDataType.includes(key)) {
      const decryptedData = CryptoJS.AES.decrypt(
        encryptedData[key],
        cryptoJSkey
      ).toString(CryptoJS.enc.Utf8);
      result[key] = decryptedData;
    } else {
      result[key] = encryptedData[key];
    }
  });
  return result;
};
