import { object, string, number } from "yup";

export const SchemaProfessional = object().shape({
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
  role: string().required("請選擇你的角色"),
  /* phone: number()
    .typeError("請輸入數字")
    .required("請輸入聯絡電話")
    .test("len", "請輸入有效的電話號碼(8位數字)", (val) => {
      if (val !== null && val !== undefined) {
        return val.toString().length === 8;
      } else return true;
    }), */
  password: string()
    .label("Password")
    .required("請輸入密碼")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "密碼需為8-16個符號，包含一個數字(0-9)、一個小寫英文(a-z)及一個大寫字母(a-z)"
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
  email: string().required("請輸入有效電子郵件").email("請輸入有效電子郵件"),
});
