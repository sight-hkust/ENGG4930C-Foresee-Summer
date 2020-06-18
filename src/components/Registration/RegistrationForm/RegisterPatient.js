import React, { useState } from "react";
import { View, Button } from "react-native"
import { Formik } from "formik";
import { auth, database } from "../../../../constant/Config";
import { ScrollView } from "react-native-gesture-handler";
import { ScreenHeight } from "../../../../constant/Constant";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { StyledInput, StyledDatePicker, StyledInputArea } from "./StyledInput";



/* const ProfSignupSchema = object().shape({
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
}) */

export const RegisterPatient= ({ formikProps, isProfessional }) => {

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