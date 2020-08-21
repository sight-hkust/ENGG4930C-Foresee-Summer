import { object, string, number } from "yup";

export const updateProfileSchemaProfessional = object().shape({
  selectedNameFields: string().test({
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
  }),
/*   gender: string().required("請選擇性別"),
  role: string().required("請選擇你的角色"), */
  phone: number()
    .typeError("請輸入數字")
    .required("請輸入聯絡電話")
    .test("len", "請輸入有效的電話號碼(8位數字)", (val) => {
      if (val !== null && val !== undefined) {
        return val.toString().length === 8;
      } else return true;
    }),
});
