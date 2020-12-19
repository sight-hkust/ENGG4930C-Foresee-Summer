import { number, object, string } from "yup";


export const ReviewSchema = object({
  L_SPH: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  R_SPH: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  L_CYL: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  R_CYL: string()
    .required("此項必填（如無度數，請填0）")
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  L_Axis: string().when("L_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  R_Axis: string().when("R_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  L_PRISM: string().max(4, "稜鏡(PRISM)應在2個數字以內").notRequired(),

  R_PRISM: string().max(4, "稜鏡(PRISM)應在2個數字以內").notRequired(),

  L_PD: string().matches("^[0-9]*$", "請輸入大於0的整數").max(3, "瞳孔距離(PD)超出合理範圍").notRequired(),
  R_PD: string().matches("^[0-9]*$", "請輸入大於0的整數").max(3, "瞳孔距離(PD)超出合理範圍").notRequired(),
  L_VA: string().matches("^[0-9]+[./]+[0-9]+$", "格式錯誤，請輸入分數(如20/20)或小數(如1.0)"),
  R_VA: string().matches("^[0-9]+[./]+[0-9]+$", "格式錯誤，請輸入分數(如20/20)或小數(如1.0)"),

  Adj_L_SPH: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Adj_R_SPH: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Adj_L_CYL: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Adj_R_CYL: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Adj_L_Axis: string().when("Adj_L_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  Adj_R_Axis: string().when("Adj_R_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  Adj_L_PRISM: string().max(2, "稜鏡(PRISM)應在2個數字以內").notRequired(),
  Adj_R_PRISM: string().max(2, "稜鏡(PRISM)應在2個數字以內").notRequired(),
  Far_L_SPH: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Far_R_SPH: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Far_L_CYL: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Far_R_CYL: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Far_L_Axis: string().when("Far_L_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  Far_R_Axis: string().when("Far_R_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  Far_L_PRISM: string().max(2, "稜鏡(PRISM)應在2個數字以內").notRequired(),
  Far_R_PRISM: string().max(2, "稜鏡(PRISM)應在2個數字以內").notRequired(),
  Con_L_SPH: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Con_R_SPH: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Con_L_CYL: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Con_R_CYL: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Con_L_Axis: string().when("Con_L_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  Con_R_Axis: string().when("Con_R_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  Mid_L_SPH: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Mid_R_SPH: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Mid_L_CYL: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Mid_R_CYL: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Mid_L_Axis: string().when("Mid_L_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  Mid_R_Axis: string().when("Mid_R_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  Mid_L_PRISM: string().max(2, "稜鏡(PRISM)應在2個數字以內").notRequired(),
  Mid_R_PRISM: string().max(2, "稜鏡(PRISM)應在2個數字以內").notRequired(),

  Near_L_SPH: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Near_R_SPH: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "球面度數(SPH)應在4個數字以內")
    .test("divisible by 25", "球面度數(SPH)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Near_L_CYL: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Near_R_CYL: string()
    .matches("^[0-9]*$", "請輸入大過或等於0的整數")
    .max(4, "散光度數(CYL)應在4個數字以內")
    .test("divisible by 25", "散光度數(CYL)應為0或以00, 25, 50或75作尾", (value) => value % 25 == 0),
  Near_L_Axis: string().when("Near_L_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  Near_R_Axis: string().when("Near_R_CYL", {
    is: (val) => val > 0,
    then: string()
      .required("此項必填")
      .test("between 0 and 180", "散光軸度(Axis)應在 0 和 180 之間", (value) => value >= 0 && value <= 180)
      .matches("^[0-9]*$", "請輸入整數"),
    otherwise: string().notRequired(),
  }),
  Near_L_PRISM: string().max(2, "稜鏡(PRISM)應在2個數字以內").notRequired(),
  Near_R_PRISM: string().max(2, "稜鏡(PRISM)應在2個數字以內").notRequired(),
});
