import { number, object, string } from "yup";
export const SchemaRecords = object({
  L_SPH: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test(
      "divisible by 25",
      "球面度數(SPH)應為0或以00, 25, 50或75作尾",
      (value) => value % 25 == 0
    ),
  R_SPH: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test(
      "divisible by 25",
      "球面度數(SPH)應為0或以00, 25, 50或75作尾",
      (value) => value % 25 == 0
    ),
  L_VA: number()
    .test(
      "range",
      "視力(Visual Acuity)應在 0 和 1 之間",
      (value) => value >= 0 || value <= 1 || value == null
    )
    .max(1.0, "視力(Visual Acuity)應在 0 和 1 之間"),
  R_VA: number()
    .test(
      "range",
      "視力(Visual Acuity)應在 0 和 1 之間",
      (value) => value >= 0 || value <= 1 || value == null
    )
    .max(1.0, "視力(Visual Acuity)應在 0 和 1 之間"),
  L_CYL: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test(
      "divisible by 25",
      "散光度數(CYL)應為0或以00, 25, 50或75作尾",
      (value) => value % 25 == 0
    ),
  R_CYL: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test(
      "divisible by 25",
      "散光度數(CYL)應為0或以00, 25, 50或75作尾",
      (value) => value % 25 == 0
    ),
  L_Axis: string().when("L_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test(
        "between 0 and 180",
        "散光軸度(Axis)應在 0 和 180 之間",
        (value) => value >= 0 && value <= 180
      )
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  R_Axis: string().when("L_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test(
        "between 0 and 180",
        "散光軸度(Axis)應在 0 和 180 之間",
        (value) => value >= 0 && value <= 180
      )
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  PD: string()
    .matches("^[0-9]*$", "請輸入大於0的整數")
    .max(3, "瞳孔距離(PD)超出合理範圍")
    .notRequired(),
});
