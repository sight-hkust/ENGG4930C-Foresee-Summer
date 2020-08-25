import { object, string, number, bool } from "yup";

const nameValidation = string().test({
  name: "name_validation",
  test: function (val) {
    const { firstName, lastName } = this.parent;
    if (!firstName || !lastName) {
      return this.createError({
        message: "請輸入姓名",
        path: "nameError",
      });
    } else {
      const chineseValidationFormat = /^[\u4E00-\u9FA5]+$/;
      const englishValidationFormat = /^[a-zA-Z][0-9a-zA-Z .,'-]*$/;
      if (chineseValidationFormat.test(firstName) && chineseValidationFormat.test(lastName)) {
        return true;
      }
      if (englishValidationFormat.test(firstName) && englishValidationFormat.test(lastName)) {
        return true;
      }
      return this.createError({
        message: "請輸入有效姓名",
        path: "nameError",
      });
    }
  },
});

const passwordValidation = string()
  .label("Password")
  .required("請輸入密碼")
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/, "密碼需為 8-16個符號：包含一個數字(0-9)，一個小寫英文(a-z)，及一個大寫字母(A-Z)");

const confirmationPasswordValidation = string().when("password", {
  is: (val) => val === undefined || val === null,
  then: null,
  otherwise: string()
    .label("Confirm Password")
    .required("請輸入確認密碼")
    .test("passwords-match", "密碼與確認密碼不相同", function (value) {
      return this.parent.password && this.parent.password === value;
    }),
});

const emailValidation = string().email("電郵地址無效，請以有效格式輸入電郵(例如：foresee@gmail.com)").required("請輸入電郵地址");
const phoneValidation = number()
  .typeError("請輸入數字")
  .required("請輸入聯絡電話")
  .test("len", "請輸入有效的電話號碼(8位數字)", (val) => {
    if (val !== null && val !== undefined) {
      return val.toString().length === 8;
    } else return true;
  });

export const schemaRegisterPatient = object().shape({
  nameValidation,
  gender: string().required("請選擇性別"),
  birthday: string().required("請輸入出生年份和月份"),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmationPasswordValidation,
  tel_number: phoneValidation,
});

export const schemaRegisterProfessional = object().shape({
  nameValidation,
  gender: string().required("請選擇性別"),
  role: string().required("請選擇你的角色"),
  tel_number: phoneValidation,
  password: passwordValidation,
  confirmPassword: confirmationPasswordValidation,
  email: emailValidation,
});

export const schemaRegisterChild = object().shape({
  nameValidation,
  gender: string().required("請選擇性別"),
  birthday: string().required("請輸入病人出生日期"),
});

export const schemaEnrollPatient = object().shape({
  nameValidation,
  gender: string().required("請選擇性別"),
  birthday: string().required("請輸入病人出生日期"),
  email: emailValidation,
});

export const updateProfessionalProfileSchema = object().shape({
  nameValidation,
  birthday: string().required("請輸入出生年份和月份"),
  phone: phoneValidation,
});

export const updatePatientProfileSchema = object().shape({
  nameValidation,
  phone: phoneValidation,
});

export const changePasswordSchema = object().shape({
  passwordValidation: string().test({
    name: passwordValidation,
    test: function (val) {
      const { password, confirmPassword } = this.parent;
      if (!password) {
        return this.createError({ message: "請輸入新密碼", path: "passwordError" });
      }

      if (!confirmPassword) {
        return this.createError({ message: "請輸入確認密碼", path: "passwordError" });
      }

      const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;
      if (!passwordFormat.test(password)) {
        return this.createError({ message: "密碼需為 8-16個符號：包含一個數字(0-9)，一個小寫英文(a-z)，及一個大寫字母(A-Z)", path: "passwordError" });
      }
      if (password != confirmPassword) {
        return this.createError({ message: "密碼與確認密碼不相同", path: "passwordError" });
      }
      return true;
    },
  }),
});
