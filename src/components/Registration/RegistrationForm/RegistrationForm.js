import React, { useState } from "react";
import { Formik } from "formik";
import { Button, View, Keyboard } from "react-native";
import { ScreenHeight } from "../../../../constant/Constant";
import { SchemaPatient } from "../Schema/SchemaPatient";
import { SchemaProfessional } from "../Schema/SchemaProfessional";
import { ScrollView } from "react-native-gesture-handler";
import { StyledInput, StyledDatePicker } from "./StyledInput";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { createAccount } from "../RegisterAction";
import { Input } from "react-native-elements";

export const RegistrationForm = ({ navigation, route }) => {
    const { isProfessional, establishedByProfessional } = route.params;
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
                onSubmit={(values) => createAccount({ values, navigation, isProfessional, establishedByProfessional })}
                validationSchema={isProfessional ? SchemaProfessional : SchemaPatient}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {formikProps => (
                    <>
                        <FormDetails formikProps={formikProps} isProfessional={isProfessional} />
                        <Button onPress={
                            () => {
                                Keyboard.dismiss()
                                formikProps.handleSubmit()
                            }} style={{ width: ScreenHeight * 0.2 }} title='提交' />
                    </>
                )}
            </Formik >
        </>)
}

const FormDetails = ({ formikProps, isProfessional }) => {

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
            {isProfessional ?
                null : <StyledDatePicker
                    label="出生年份"
                    showDatePicker={showDatePicker}
                    formikKey="birthYearsAndMonths"
                    value={values.birthYearsAndMonths}
                    formikProps={formikProps}
                />}
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