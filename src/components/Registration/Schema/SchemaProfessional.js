import { object, string, number } from "yup";

export const SchemaProfessional = object().shape({
  selectedNameFields: string().test({
    name: "name_validation",
    test: function (val) {
      const { firstName, lastName } = this.parent;

      if (!firstName || !lastName) {
        return this.createError({
          message: "請輸入姓名",
          path: "NameError",
        });
      } else {
        const chineseValidationFormat = /^[\u4E00-\u9FA5]+$/;
        const englishValidationFormat = /^[a-zA-Z][0-9a-zA-Z .,'-]*$/;
        console.log(lastName);
        console.log(chineseValidationFormat.test(firstName));
        if (chineseValidationFormat.test(firstName) && chineseValidationFormat.test(lastName)) {
          return true;
        }
        if (englishValidationFormat.test(firstName) && englishValidationFormat.test(lastName)) {
          return true;
        }
        return this.createError({
          message: "請輸入有效姓名",
          path: "NameError",
        });
      }

      let chineseNameValidationError = null;
      let englishNameValidationError = null;

      if (firstName || lastName) {
        let chineseValidationResult = chineseValidationFormat.test(lastName) && chineseValidationFormat.test(firstName);
        if (chineseValidationResult == false) {
          chineseNameValidationError = "請輸入有效中文姓名";
        }
      }
      if (surName || givenName) {
        let englishValidationResult = englishValidationFormat.test(surName) && englishValidationFormat.test(givenName);
        if (englishValidationResult == false) {
          englishNameValidationError = "Please enter a valid name";
        }
      }
      if (chineseNameValidationError) {
        return this.createError({
          message: chineseNameValidationError,
          path: "chineseNameError",
        });
      } else {
        if (englishNameValidationError) {
          return this.createError({
            message: englishNameValidationError,
            path: "englishNameError",
          });
        }
      }
      return true;
    },
  }),
  gender: string().required("請選擇性別"),
  role: string().required("請選擇你的角色"),
  tel_number: number()
    .typeError("請輸入數字")
    .required("請輸入聯絡電話")
    .test("len", "請輸入有效的電話號碼(8位數字)", (val) => {
      if (val !== null && val !== undefined) {
        return val.toString().length === 8;
      } else return true;
    }),
  password: string()
    .label("Password")
    .required("請輸入密碼")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, "密碼需為8-16個符號，包含一個數字(0-9)、一個小寫英文(a-z)及一個大寫字母(a-z)"),
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
  email: string().required("請輸入有效電子郵件").email("請輸入有效電子郵件"),
});
