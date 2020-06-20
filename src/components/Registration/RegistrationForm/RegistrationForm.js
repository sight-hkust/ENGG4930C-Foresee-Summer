import React, { useState } from "react";
import { Formik } from "formik";
import { Keyboard, StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "../../../../constant/Constant";
import { SchemaPatient } from "../Schema/SchemaPatient";
import { SchemaProfessional } from "../Schema/SchemaProfessional";
import { ScrollView } from "react-native-gesture-handler";
import { StyledInput } from "../../../../Utils/StyleInput";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import { createAccount } from "../RegisterAction";
import { LinearGradientBackground } from "../../../../Utils/LinearGradientBackground";
import Logo from "../../../../Utils/Logo";
import { RoundButton } from "../../../../Utils/RoundButton";

export const RegistrationForm = ({ navigation, route }) => {
    const { isProfessional, establishedByProfessional } = route.params;
    console.log("isProfessional?", isProfessional);
    return (
        <LinearGradientBackground>
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
        </LinearGradientBackground>)
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

    const personIcon = <MaterialIcons name='person' color={'white'} size={35} />
    const hourGlass = <SimpleLineIcons name='hourglass' color={'white'} size={32} />
    return (
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
        </ScrollView>)
}


const styles = StyleSheet.create({
    logoContainer: {
        marginTop: ScreenHeight * 0.1,
    }
})