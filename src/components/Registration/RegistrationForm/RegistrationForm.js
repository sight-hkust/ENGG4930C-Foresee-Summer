import React, { useState } from "react";
import { Formik } from "formik";
import { Button, View, Keyboard, StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "../../../../constant/Constant";
import { SchemaPatient } from "../Schema/SchemaPatient";
import { SchemaProfessional } from "../Schema/SchemaProfessional";
import { ScrollView } from "react-native-gesture-handler";
<<<<<<< Updated upstream
import { StyledInput, StyledDatePicker } from "./StyledInput";
=======
import { StyledInput } from "../../../../Utils/StyleInput";
>>>>>>> Stashed changes
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import { createAccount } from "../RegisterAction";
<<<<<<< Updated upstream
import { Input } from "react-native-elements";
=======
import { LinearGradientBackground } from "../../../../Utils/LinearGradientBackground";
import Logo from "../../../../Utils/Logo";
import { RoundButton } from "../../../../Utils/RoundButton";
>>>>>>> Stashed changes

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
                        {/* <Button onPress={
                            () => {
                                Keyboard.dismiss()
                                formikProps.handleSubmit()
                            }} style={{ width: ScreenHeight * 0.2 }} title='提交' /> */}
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

<<<<<<< Updated upstream
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
=======

    const personIcon = <MaterialIcons name='person' color={'white'} size={35} />
    const hourGlass = <SimpleLineIcons name='hourglass' color={'white'} size={32} />

    return (
        <>
            <ScrollView
                style={{ paddingHorizontal: ScreenWidth * 0.15 }}
                showsVerticalScrollIndicator={false}
            >
                <Logo style={styles.logoContainer} />
                <StyledInput
                    placeholder={'姓名(全名)'}
                    icon={personIcon}
                    formikProps={formikProps}
                    formikKey="name"
                />
                <StyledInput
                    placeholder={'電子郵件'}
                    icon={personIcon}
                    formikProps={formikProps}
                    formikKey="email"
                />
                <StyledInput
                    placeholder={'電話號碼'}
                    icon={personIcon}
                    formikProps={formikProps}
                    formikKey="phone"
                    keyboardType={'numeric'}
                />
                <StyledInput
                    placeholder={'密碼'}
                    icon={personIcon}
                    formikProps={formikProps}
                    formikKey="password"
                    secureTextEntry
                />
                <StyledInput
                    placeholder={'確認密碼'}
                    icon={personIcon}
                    formikProps={formikProps}
                    formikKey="confirmPassword"
                    secureTextEntry
                />
                <RoundButton title='提交' onPress={() => {
                    Keyboard.dismiss()
                    formikProps.handleSubmit()
                }} />
                {/* <StyledInput
                    textWrapperStyle={{ marginTop: ScreenHeight * 0.07 }}
                    label="姓名(全名)"
                    formikKey="name"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
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
                /> */}
            </ScrollView>
        </>
>>>>>>> Stashed changes
    )
}


const styles = StyleSheet.create({
    logoContainer: {
        marginTop: ScreenHeight * 0.1,
    }
})