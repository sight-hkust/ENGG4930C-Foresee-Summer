import { object, string, number } from "yup"
export const SchemaRegisterPatient = object().shape({
    firstName: string().required('請輸入病人姓名'),
    lastName: string().required('請輸入病人姓名'),
    birthday: string().required('請輸入病人出生日期'),
    /* email: string().email('電郵地址無效，請以有效格式輸入電郵(例如：foresee@gmail.com)').required('請輸入電郵地址'), */
})