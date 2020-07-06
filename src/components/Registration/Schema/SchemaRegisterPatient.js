import { object, string, number } from "yup";
export const SchemaRegisterPatient = object().shape({
  firstName: string()
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
  lastName: string()
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
  /* givenName: string()
    .required("Please enter a valid name")
    .test({
      name: "eng_surname_validation",
      test: function (val) {
        let onlyContainEnglishFormat = /^[a-zA-Z ]{3,}$/g;
        if (!onlyContainEnglishFormat.test(val)) {
          return this.createError({
            message: "Please enter a valid name",
            field: "surName",
          });
        }
        return true;
      },
    }),
  surName: string()
    .required("Please enter a valid name")
    .test({
      name: "eng_surname_validation",
      test: function (val) {
        let onlyContainEnglishFormat = /^[a-zA-Z ]{3,}$/g;
        if (!onlyContainEnglishFormat.test(val)) {
          return this.createError({
            message: "Please enter a valid name",
            field: "surName",
          });
        }
        return true;
      },
    }), */
  birthday: string().required("請輸入病人出生日期"),
  /* email: string().email('電郵地址無效，請以有效格式輸入電郵(例如：foresee@gmail.com)').required('請輸入電郵地址'), */
});
