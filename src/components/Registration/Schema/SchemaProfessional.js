import { object, string, number } from "yup"

export const SchemaProfessional = object().shape({
    firstname_chi: string().required('請輸入姓名'),
    lastname_chi: string().required('請輸入姓名'),
    role: string().required('請選擇角色'),
    email: string().email('電郵地址無效，請以有效格式輸入電郵(例如：foresee@gmail.com)').required('請輸入電郵地址'),
    phone: number().typeError('請輸入數字').required('請輸入聯絡電話').test('len', '請輸入有效的電話號碼(8位數字)',
        val => {
            if (val !== null && val !== undefined) {
                return val.toString().length === 8;
            }
            else
                return true;
        }),
    password: string()
        .label('Password').required('請輸入密碼')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            '密碼需為8-16個符號，包含一個數字(0-9)、一個小寫英文(a-z)及一個大寫字母(a-z)'),
    confirmPassword:
        string().when(
            'password', {
            is: (val) => (val === undefined || val === null),
            then: null,
            otherwise: string()
                .label('Confirm Password')
                .required('請輸入確認密碼')
                .test('passwords-match', '密碼與確認密碼不相同',
                    function (value) {
                        return this.parent.password && this.parent.password === value;
                    })
        })
})