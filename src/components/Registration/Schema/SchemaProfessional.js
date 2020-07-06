import { object, string, number } from "yup";

export const SchemaProfessional = object().shape({
  /* firstName: string().when(["surName", "givenName"], {
    is: (surName, givenName) => {
      return  surName === undefined || givenName === undefined;
    },
    then: string().test({
      name: "chi_firstname_validation",
      test: function (val) {
        let validChineseNameFormat = /^[\u4e00-\u9fa5]$/;
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
  }), */
  /* surName: string().when(["lastName", "firstName"], {
    is: (lastName, firstName) => {
      return lastName === undefined || firstName === undefined;
    },
    then: string() .test({
      name: "eng_lastname_validation",
      test: function (val) {
        let onlyContainEnglishFormat = /^[a-zA-Z ]{3,}$/g;
        if (!onlyContainEnglishFormat.test(val)) {
          return this.createError({
            message: "Please enter a valid name",
            path: "surName",
          });
        }
        return true;
      },
    }),
    otherwise: null,
  }), */
  /* surName: string().when(["firstName", "lastName"], {
    is: (firstName, lastName) => firstName === "" || lastName === "",
    then: string()
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
    otherwise: null,
  }), */
  /* lastName: string().when("firstName", {
    is: (val) => val === "",
    then: string("Please enter a valid name")
      .required()
      .test({
        name: "eng_lastname_validation",
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
    otherwise: null,
  }), */
  firstName: string().test({
    name: "chi_firstname_validation",
    test: function (val) {
      let validChineseNameFormat = /^[\u4e00-\u9fa5]$/;
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
  lastName: string().test({
    name: "chi_firstname_validation",
    test: function (val) {
      let validChineseNameFormat = /^[\u4e00-\u9fa5]$/;
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
});
