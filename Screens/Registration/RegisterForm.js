import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native"
import { Formik } from "formik";
import { auth, database } from "../../constant/Config";
import { object, string, number, isValid } from "yup"
import { ScrollView } from "react-native-gesture-handler";
import { Styles } from "../../Styles/styles";
import { ScreenHeight } from "../../constant/Constant";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AppColors from "../../Styles/colors";

const SignupSchema = object().shape({
    name: string().required('請輸入姓名'),
    birthYearsAndMonths: string().required('請輸入出生年份和月份'),
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
        .test('password-length', '密碼需為 8-16個符號：包含一個數字(0-9)，一個小寫英文(a-z)，及一個大寫字母(A-Z)', val => {
            if (val !== null && val !== undefined) {
                passwordSchemaHasError = !(val.length >= 8 && val.length <= 16)
                console.log(passwordSchemaHasError);
                return !passwordSchemaHasError
            }
        }),
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
    /* string()
        .label('Confirm Password')
        .required('請輸入確認密碼')
        .test('passwords-match', 'Please make sure your passwords match.',
            function (value) {
                console.log(this.parent)
                return this.parent.password && this.parent.password === value;
            }) */
})

const ProfSignupSchema = object().shape({
    name: string().required('請輸入姓名'),
    birthYearsAndMonths: string().required('請輸入出生年份和月份'),
    email: string().email('電郵地址無效，請以有效格式輸入電郵(例如：foresee@gmail.com)').required('請輸入電郵地址'),
    phone: number().typeError('請輸入數字').required('請輸入聯絡電話').test('len', '電話號碼需為8位數字)',
        val => {
            if (val !== null && val !== undefined) {
                return val.toString().length === 8;
            }
            else
                return true;
        }),
    job: string().required('請輸入職業')
})

const writeUserData = ({ uid, values, isProfessional, navigation }) => {
    if (isProfessional) {
        database.ref('/users/' + uid)
            .set({
                uid: uid,
                name: values.name,
                email: values.email,
                age: Math.abs(moment(values.birthYearsAndMonths).diff(moment(), "years")),
                phone: values.phone,
                job: values.job,
                history: values.history,
                disease: values.disease
            })

        database.ref('professionals/M001/patients/' + uid + '/info')
            .set({
                uid: uid,
                name: values.name,
                email: values.email,
                age: Math.abs(moment(values.birthYearsAndMonths).diff(moment(), "years")),
                phone: values.phone,
                job: values.job,
                history: values.history,
                disease: values.disease
            })

    } else {
        database.ref('/users/' + uid)
            .set({
                uid: uid,
                name: values.name,
                email: values.email,
                age: Math.abs(moment(values.birthYearsAndMonths).diff(moment(), "years")),
                phone: values.phone,
            })
    }
    navigation.navigate('MainScreen');
}


const createAccount = (isProfessional, values, navigation) => {
    if (isProfessional) {
        auth.createUserWithEmailAndPassword(values.email, "NoPassword").then(function (userCreds) {
            const uid = userCreds.user.uid;
            writeUserData({ uid, values, isProfessional, navigation });
        }).catch(error => {
            console.log(error.code, error.message);
        })
    } else {
        auth.createUserWithEmailAndPassword(values.email, values.password).then(function (userCreds) {
            const uid = userCreds.user.uid;
            writeUserData({ uid, values, navigation });
        }).catch(error => {
            console.log(error.code, error.message);
        })
    }
}

const FieldWrapper = ({ textWrapperStyle = {}, children, label, formikKey, formikProps, }) => {
    return (
        <View style={[Styles.formFieldWrapper, textWrapperStyle]}>
            <Text>{label}</Text>
            {children}
            <Text style={{ color: AppColors.errorMessage }}>
                {formikProps.errors[formikKey]}
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

const StyledInputArea = ({ textWrapperStyle, label, formikKey, formikProps, ...rest }) => {

    return (
        <FieldWrapper textWrapperStyle={textWrapperStyle} label={label} formikKey={formikKey} formikProps={formikProps}>
            <TextInput
                style={Styles.formTextInputArea}
                onChangeText={formikProps.handleChange(formikKey)}
                onBlur={formikProps.handleBlur(formikKey)}
                {...rest}
                numberOfLines={5}
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
    const { isProfessional } = route.params;
    console.log("isProfessional?", isProfessional);
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    birthYearsAndMonths: '2003-01-01',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    job: '',
                    history: '',
                    disease: '',
                }}
                onSubmit={(values) => createAccount(route.params.isProfessional, values, navigation)}
                validationSchema={isProfessional ? ProfSignupSchema : SignupSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {formikProps => (
                    <>
                        <PatientRegisterForm formikProps={formikProps} isProfessional={route.params?.isProfessional} />
                        <Button onPress={formikProps.handleSubmit} style={{ width: ScreenHeight * 0.2 }} title='提交' />
                    </>
                )}
            </Formik >
        </>)
}

const PatientRegisterForm = ({ formikProps, isProfessional }) => {

    const { setFieldValue, values } = formikProps;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const handleConfirm = date => {
        hideDatePicker();
        setFieldValue('birthYearsAndMonths', moment(date).format('YYYY-MM-DD'));
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
            {isProfessional ?
                <View>
                    <StyledInput
                        label="職業"
                        formikKey="job"
                        formikProps={formikProps}
                    />
                    <StyledInputArea
                        label="家庭病史"
                        formikKey="history"
                        formikProps={formikProps}
                    />
                    <StyledInputArea
                        label="已知眼疾"
                        formikKey="disease"
                        formikProps={formikProps}
                    />
                </View>
                :
                <View>
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
                </View>
            }
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