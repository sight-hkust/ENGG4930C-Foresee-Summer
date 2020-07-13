import { object, string, number, bool } from "yup";

export const SchemaPatient = object().shape({
  selectedNameFields: string().test({
    name: "name_validation",
    test: function (val) {
      let chineseValidationFormat = /^[\u4E00-\u9FA5]{1,4}$/;
      let englishValidationFormat = /^[a-zA-Z][0-9a-zA-Z .,'-]*$/;
      let chineseNameValidationError = null;
      let englishNameValidationError = null;
      const { firstName, lastName, surName, givenName } = this.parent;
      if (firstName || lastName) {
        let chineseValidationResult =
          chineseValidationFormat.test(lastName) &&
          chineseValidationFormat.test(firstName);
        console.log(
          "chineseValidationFormat.test(lastName)",
          chineseValidationFormat.test(lastName)
        );
        console.log(
          "chineseValidationFormat.test(firstName)",
          chineseValidationFormat.test(firstName)
        );
        console.log("chineseValidationResult", chineseValidationResult);
        if (chineseValidationResult == false) {
          chineseNameValidationError = "請輸入有效中文姓名";
        }
      }
      if (surName || givenName) {
        let englishValidationResult =
          englishValidationFormat.test(surName) &&
          englishValidationFormat.test(givenName);
        if (englishValidationResult == false) {
          englishNameValidationError = "Please enter a valid name";
        }
      }
      if (chineseNameValidationError) {
        return this.createError({
          message: chineseNameValidationError,
          path: "selectedNameFields",
        });
      } else {
        if (englishNameValidationError) {
          return this.createError({
            message: englishNameValidationError,
            path: "selectedNameFields",
          });
        }
      }
      return true;
    },
  }),
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
