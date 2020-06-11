// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

let Strings = new LocalizedStrings({
    en:{
        login: "Login",
        email: "Email",
        password: "Password",
        signUp: "Sign Up",
        leftEye: "Left Eye",
        rightEye: "Right Eye",
        records: "Records",
        rightEyeLabel: "Right Eye Myopia",
        leftEyeLabel: "Left Eye Myopia",
        add: "Add",
        monthOfTest: "Month",
        yearOfTest: "Year"
    },
    zh: {
        login: "登入",
        email: "電子郵件",
        password: "密碼",
        signUp: "新用戶?",
        leftEye: "左眼",
        rightEye: "右眼",
        records: "詳細度數",
        rightEyeLabel: "右眼近視度數",
        leftEyeLabel: "左眼近視度數",
        add: "輸入數據",
        monthOfTest: "月",
        yearOfTest: "年"
    }
});

export default Strings;
