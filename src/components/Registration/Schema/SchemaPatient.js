import { object, string, number, bool } from "yup";

export const SchemaPatient = object().shape({
  birthday: string().required("請輸入出生年份和月份"),
  email: string()
    .email("電郵地址無效，請以有效格式輸入電郵(例如：foresee@gmail.com)")
    .required("請輸入電郵地址"),
  password: string()
    .label("Password")
    .required("請輸入密碼")
    .test(
      "password-length",
      "密碼需為 8-16個符號：包含一個數字(0-9)，一個小寫英文(a-z)，及一個大寫字母(A-Z)",
      (val) => {
        if (val !== null && val !== undefined) {
          passwordSchemaHasError = !(val.length >= 8 && val.length <= 16);
          console.log(passwordSchemaHasError);
          return !passwordSchemaHasError;
        }
      }
    ),
  confirmPassword: string().when("password", {
    is: (val) => val === undefined || val === null,
    then: null,
    otherwise: string()
      .label("Confirm Password")
      .required("請輸入確認密碼")
      .test("passwords-match", "密碼與確認密碼不相同", function (value) {
        return this.parent.password && this.parent.password === value;
      }),
  }),
});
