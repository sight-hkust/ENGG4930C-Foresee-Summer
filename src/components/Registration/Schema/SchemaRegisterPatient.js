import { object, string, number } from "yup";
export const SchemaRegisterPatient = object().shape({
  selectedNameFields: string().test({
    name: "name_validation",
    test: function (val) {
      const {
        firstName,
        lastName,
        surName,
        givenName,
        selectedNameFields,
      } = this.parent;

      if (selectedNameFields == "chi") {
        if (!firstName && !lastName && !surName && !givenName) {
          return this.createError({
            message: "請輸入姓名",
            path: "chineseNameError",
          });
        }
        if (!firstName && lastName) {
          return this.createError({
            message: "請輸入有效姓名",
            path: "chineseNameError",
          });
        }
        if (!surName && givenName) {
          return this.createError({
            message: "Please enter a valid name",
            path: "englishNameError",
          });
        }
      } else {
        if (!firstName && !lastName && !surName && !givenName) {
          return this.createError({
            message: "Please enter a valid name",
            path: "englishNameError",
          });
        }
        if (!firstName && lastName) {
          return this.createError({
            message: "請輸入有效姓名",
            path: "chineseNameError",
          });
        }
        if (!surName && givenName) {
          return this.createError({
            message: "Please enter a valid name",
            path: "englishNameError",
          });
        }
      }

      let chineseValidationFormat = /^[\u4E00-\u9FA5]{1,4}$/;
      let englishValidationFormat = /^[a-zA-Z][0-9a-zA-Z .,'-]*$/;
      let chineseNameValidationError = null;
      let englishNameValidationError = null;

      if (firstName || lastName) {
        let chineseValidationResult =
          chineseValidationFormat.test(lastName) &&
          chineseValidationFormat.test(firstName);
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
  birthday: string().required("請輸入病人出生日期"),
  email: string().required("請輸入有效電子郵件").email("請輸入有效電郵"),
});
