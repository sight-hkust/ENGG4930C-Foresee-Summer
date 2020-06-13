import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native"
import { Formik } from "formik";
import { auth, database } from "../../../constant/Config";
import * as Yup from "yup"
import { ScrollView } from "react-native-gesture-handler";
import { Styles } from "../../../Styles/styles";
import { ScreenHeight } from "../../../constant/Constant";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('請輸入姓名'),
    birthYearsAndMonths: Yup.string().required('請輸入出生年份和月份'),
    email: Yup.string().email('電郵地址無效，請以有效格式輸入電郵(例如：foresee@gmail.com)').required('請輸入電郵地址'),
    phone: Yup.number().typeError('請輸入數字').required('請輸入聯絡電話').test('len', '請輸入有效的電話號碼(8位數字)',
        val => val.toString().length === 8),
    password:
        Yup.string()
            .label('Password').required('請輸入密碼')
            .min(7, 'Password must be at least 7 characters.')
            .max(16, 'The accound system can contain up to 16 characters.'),
    confirmPassword:
        /*  Yup.string().when(
             'password', {
             is: true,
             then: Yup.string()
                 .label('Confirm Password')
                 .required('Required')
                 .test('passwords-match', 'Please make sure your passwords match.',
                     function (value) {
                         console.log(this.parent)
                         return this.parent.password && this.parent.password === value;
                     }),
             otherwise: Yup.string()
                 .label('Confirm Password')
                 .required('Required')
                 .test('passwords-empty', 'Please fill in password.',
                     function () {
                         return this.parent.password;
                     })
         }) */
        Yup.string()
            .label('Confirm Password')
            .required('請輸入確認密碼')
            .test('passwords-match', 'Please make sure your passwords match.',
                function (value) {
                    console.log(this.parent)
                    return this.parent.password && this.parent.password === value;
                })
})

const writeUserData = ({ uid, values }) => {
    console.log(uid)
    database.ref('/users/' + uid)
        .set({
            uid: uid,
            name: values.name,
            email: values.email,
            age: Math.abs(moment(values.birthYearsAndMonths).diff(moment(), "years")),
            phone: values.phone,
        })
}


const createAccount = (values) => {
    auth.createUserWithEmailAndPassword(values.email, values.password).then(function (userCreds) {
        const uid = userCreds.user.uid;
        writeUserData({ uid, values });
    }).catch(error => {
        console.log(error.code, error.message);
    })

}

const FieldWrapper = ({ textWrapperStyle = {}, children, label, formikKey, formikProps, }) => {
    return (
        <View style={[Styles.formFieldWrapper, textWrapperStyle]}>
            <Text>{label}</Text>
            {children}
            <Text style={{ color: 'red' }}>
                {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
            </Text>
        </View>
    )
}

const StyledInput = ({ textWrapperStyle, label, formikKey, formikProps, ...rest }) => {

    return (
        <FieldWrapper textWrapperStyle={textWrapperStyle} label={label} formikKey={formikKey} formikProps={formikProps}>
            <TextInput
                style={Styles.formTextInput}
                onChangeText={formikProps.handleChange(formikKey)}
                onBlur={formikProps.handleBlur(formikKey)}
                {...rest}
            />
        </FieldWrapper>
    )
}

const StyledDatePicker = ({ textWrapperStyle, value, showDatePicker, label, formikKey, formikProps }) => {
    return (
        <FieldWrapper textWrapperStyle={textWrapperStyle} label={label} formikKey={formikKey} formikProps={formikProps}>
            <Text
                style={[Styles.formTextInput, { textAlignVertical: 'center' }]}
                onPress={() => showDatePicker()}>
                {moment(value).format('YYYY-MM-DD')}
            </Text>
        </FieldWrapper >
    )
}


export const RegisterForm = ({ navigation, route }) => {


    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    birthYearsAndMonths: '1989-06-04',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: ''
                }}
                onSubmit={(values) => createAccount(values)}
                validationSchema={SignupSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {formikProps => (
                    <>
                        <PatientRegisterForm formikProps={formikProps} />
                        <Button onPress={formikProps.handleSubmit} style={{ width: ScreenHeight * 0.2 }} title='提交' />
                    </>
                )}
            </Formik >
        </>)
}

const PatientRegisterForm = ({ formikProps }) => {

    const { setFieldValue, values } = formikProps;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const handleConfirm = date => {
        setFieldValue('birthYearsAndMonths', moment(date).format('YYYY-MM-DD'));
        hideDatePicker();
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <StyledInput
                textWrapperStyle={{ marginTop: ScreenHeight * 0.07 }}
                label="姓名(全名)"
                formikKey="name"
                formikProps={formikProps}
                autoFocus={false}
            />
            <StyledDatePicker
                label="出生年份"
                showDatePicker={showDatePicker}
                formikKey="birthYearsAndMonths"
                value={values.birthYearsAndMonths}
                formikProps={formikProps}
            />
            <StyledInput
                label="電子郵件"
                formikKey="email"
                formikProps={formikProps}
            />
            <StyledInput
                label="電話號碼"
                formikKey="phone"
                formikProps={formikProps}
                keyboardType={'numeric'}
            />
            <StyledInput
                label="密碼"
                formikKey="password"
                formikProps={formikProps}
                secureTextEntry={true}
            />
            <StyledInput
                label="確認密碼"
                formikKey="confirmPassword"
                formikProps={formikProps}
                secureTextEntry={true}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={moment().toDate()}
            />
        </ScrollView>
    )
}