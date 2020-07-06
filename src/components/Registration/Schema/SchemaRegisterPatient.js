import { object, string, number } from "yup";
export const SchemaRegisterPatient = object().shape({
  firstName: string().when("selectedNameField", {
    is: (val) => val === "chi",
    then: string()
      .required("請輸入有效姓名")
      .test({
        name: "chi_firstname_validation",
        test: function (val) {
          let validChineseNameFormat = /^[\u4E00-\u9FA5]{1,4}$/g;
          if (
            val === undefined ||
            val === null ||
            !validChineseNameFormat.test(val)
          ) {
            console.log(validChineseNameFormat.test(val));
            return this.createError({
              message: "請輸入有效姓名",
              path: "lastName",
            });
          }
          return true;
        },
      }),
    otherwise: null,
  }),
  lastName: string().when("selectedNameField", {
    is: (val) => val === "chi",
    then: string()
      .required("請輸入有效姓名")
      .test({
        name: "chi_firstname_validation",
        test: function (val) {
          let validChineseNameFormat = /^[\u4E00-\u9FA5]{1,4}$/g;
          if (
            val === undefined ||
            val === null ||
            !validChineseNameFormat.test(val)
          ) {
            return this.createError({
              message: "請輸入有效姓名",
              path: "lastName",
            });
          }
          return true;
        },
      }),
    otherwise: null,
  }),
  surName: string().when("selectedNameField", {
    is: (val) => val === "eng",
    then: string().required("Please enter valid name"),
    otherwise: null,
  }),
  lastNameName: string().when("selectedNameField", {
    is: (val) => val === "eng",
    then: string().required("Please enter valid name"),
    otherwise: null,
  }),
  birthday: string().required("請輸入病人出生日期"),
});
