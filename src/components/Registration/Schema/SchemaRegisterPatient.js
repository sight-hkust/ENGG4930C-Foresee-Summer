import { object, string, number } from "yup"
export const SchemaRegisterPatient = object().shape({
    firstname_chi: string().required('請輸入病人姓名'),
    lastname_chi: string().required('請輸入病人姓名'),
    birthday: string().required('請輸入病人出生日期'),
    email: string().email('電郵地址無效，請以有效格式輸入電郵(例如：foresee@gmail.com)').required('請輸入電郵地址'),
    phone: number().typeError('請輸入數字').required('請輸入聯絡電話').test('len', '請輸入有效的電話號碼(8位數字)',
        val => {
            if (val !== null && val !== undefined) {
                return val.toString().length === 8;
            }
            else
                return true;
        }),
})