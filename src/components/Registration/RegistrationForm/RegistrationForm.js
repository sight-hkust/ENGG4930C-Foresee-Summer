import React, { useState } from "react";
import { Formik } from "formik";
import { Keyboard, StyleSheet, View, Platform, Picker, Text, TouchableOpacity } from "react-native";
import { ScreenHeight, ScreenWidth, FontScale } from "../../../../constant/Constant";
import { SchemaPatient } from "../Schema/SchemaPatient";
import { SchemaProfessional } from "../Schema/SchemaProfessional";
import { ScrollView } from "react-native-gesture-handler";
import { StyledInput } from "../../../../Utils/StyledInput";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
import { createAccount, registerPatientAccount } from "../RegisterAction";
import { LinearGradientBackground } from "../../../../Utils/LinearGradientBackground";
import Logo from "../../../../Utils/Logo";
import { RoundButton } from "../../../../Utils/RoundButton";
import { StyledDatePickerModal } from "../../../../Utils/StyledDatePickerModal";
import DateTimePicker from "@react-native-community/datetimepicker"
import { StyledMultiLinesInput } from "../../../../Utils/StyledMultiLinesInput";
import { SchemaRegisterPatient } from "../Schema/SchemaRegisterPatient";
import { StyledDialogPicker } from "../../../../Utils/StyledDialogPicker";
import { Portal, Dialog, Provider, List } from "react-native-paper";
import { CheckBox } from "react-native-elements";
import { KeyIcon, MailIcon } from "../../../utils/icon";

export const RegistrationForm = ({ navigation, route }) => {
    const { isProfessional, registerPatient } = route.params;
    console.log("isProfessional?", isProfessional);
    return (
        <LinearGradientBackground>
            <Formik
                initialValues={{
                    lastname: '',
                    firstname: '',
                    birthday: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    job: '',
                    role: '',
                    history: '',
                    disease: '',
                    allowedSearch: false,
                }}
                onSubmit={(values) => {
                    isProfessional && registerPatient ?
                        registerPatientAccount({ values, navigation, isProfessional, registerPatient }) :
                        createAccount({ values, navigation, isProfessional, registerPatient })
                }}
                validationSchema={isProfessional ? (registerPatient ? SchemaRegisterPatient : SchemaProfessional) : SchemaPatient}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {formikProps => (
                    <FormDetails
                        formikProps={formikProps}
                        isProfessional={isProfessional}
                        registerPatient={registerPatient} />
                )}
            </Formik >
        </LinearGradientBackground >)
}

const FormDetails = ({ formikProps, isProfessional, registerPatient }) => {

    const { setFieldValue, values } = formikProps;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDialogVisible, setDialogVisibility] = useState(false);
    const [allowedSearch, setAllowedSearch] = useState(false);

    const _showDatePicker = () => setDatePickerVisibility(true);

    const _hideDatePicker = () => setDatePickerVisibility(false);

    const _showDialog = () => setDialogVisibility(true);
    const _hideDialog = () => setDialogVisibility(false);

    const handleDateChange = (event, selectedDate) => {
        _hideDatePicker();
        setFieldValue('birthday', moment(selectedDate).format('YYYY-MM-DD'));
    }


    const handleDialogOption = (value) => {
        _hideDialog();
        setFieldValue('role', value)
    }

    const toggleCheckbox = () => {
        setFieldValue('allowedSearch', !values.allowedSearch)
    }

    const roleList = [
        { key: '0', label: '眼科醫生', value: 'ophthalmologist' },
        { key: '1', label: '視光師', value: 'optometrist' },
    ];

    const personIcon = <MaterialIcons name='person' color={'white'} size={35} />
    const hourGlassIcon = <SimpleLineIcons name='hourglass' color={'white'} size={32} />
    const phoneIcon = <Feather name='phone' color={'white'} size={32} />
    const jobIcon = <MaterialCommunityIcons name='briefcase' color={'white'} size={35} />
    const illnessIcon = <MaterialCommunityIcons name='pill' color={'white'} size={35} />
    const historyIcon = <MaterialCommunityIcons name='file' color={'white'} size={35} />

    return (
        <>
            <ScrollView
                style={{ paddingHorizontal: ScreenWidth * 0.15 }}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode='on-drag'
            >
                <Logo style={styles.logoContainer} />
                <View style={{ flexDirection: "row" }}>
                    <StyledInput
                        containerStyle={{ flex: 1 }}
                        placeholder={'姓'}
                        icon={personIcon}
                        formikProps={formikProps}
                        formikKey="lastname"
                        inputFieldStyle={{ flex: 3 }}
                        hideEmbeddedErrorMessage
                    />
                    <StyledInput
                        containerStyle={{ flex: 1 }}
                        placeholder={'名'}
                        formikProps={formikProps}
                        formikKey="firstname"
                        inputFieldStyle={{ flex: 3 }}
                        hideEmbeddedErrorMessage
                    />
                </View>
                <View>
                    <Text style={{
                        paddingTop: ScreenWidth * 0.01,
                        paddingLeft: ScreenWidth * 0.08,
                        textAlign: 'left',
                        fontSize: FontScale * 15,
                        fontWeight: '700',
                        color: '#FFFFFF',
                        flexWrap: 'wrap',
                    }}>
                        {formikProps && formikProps.errors['firstname'] ? '* ' + formikProps.errors['firstname'] : null}
                    </Text>
                </View>
                {isProfessional && !registerPatient ?
                    <StyledDialogPicker
                        icon={jobIcon}
                        visible={isDialogVisible}
                        onDismiss={() => _hideDialog()}
                        value={values.role}
                        placeholder={'職業'}
                        formikKey={'role'}
                        formikProps={formikProps}
                        list={roleList}
                        handleDialogOption={handleDialogOption}
                        showDialog={_showDialog}
                    /> :
                    <StyledDatePickerModal
                        icon={hourGlassIcon}
                        formikProps={formikProps}
                        formikKey="birthday"
                        showDatePicker={_showDatePicker}
                        value={values.birthday}
                    />}

                <StyledInput
                    containerStyle={{ height: 'auto' }}
                    placeholder={'電子郵件'}
                    icon={MailIcon}
                    formikProps={formikProps}
                    formikKey="email"
                />
                <StyledInput
                    placeholder={'電話號碼'}
                    icon={phoneIcon}
                    formikProps={formikProps}
                    formikKey="phone"
                    keyboardType={'numeric'}
                />
                {registerPatient ? <>
                    <StyledInput
                        placeholder="職業（非必須）"
                        icon={jobIcon}
                        formikKey="job"
                        formikProps={formikProps}
                    />
                    <StyledMultiLinesInput
                        label="家庭病史（非必須）"
                        icon={historyIcon}
                        formikKey="history"
                        formikProps={formikProps}
                    />
                    <StyledMultiLinesInput
                        label="已知眼疾（非必須）"
                        icon={illnessIcon}
                        formikKey="disease"
                        formikProps={formikProps}
                    />
                </> : <>
                        <StyledInput
                            containerStyle={{ height: 'auto' }}
                            placeholder={'密碼'}
                            icon={KeyIcon}
                            formikProps={formikProps}
                            formikKey="password"
                            secureTextEntry
                        />
                        <StyledInput
                            placeholder={'確認密碼'}
                            icon={KeyIcon}
                            formikProps={formikProps}
                            formikKey="confirmPassword"
                            secureTextEntry
                        />
                    </>}
                {!isProfessional ?
                    <CheckBox
                        containerStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                        }}
                        textStyle={{
                            textAlign: "left",
                            fontSize: FontScale * 15,
                            color: '#FFFFFF'
                        }}
                        checkedColor={'#FFFFFF'}
                        uncheckedColor={'#E3E3E3'}
                        fontFamily='Roboto'
                        checked={values.allowedSearch}
                        onPress={toggleCheckbox}
                        center
                        title={'本人同意提供個人資料\n予眼科專家參考'} /> : null}

                <RoundButton
                    buttonStyle={{ marginBottom: ScreenHeight * 0.2 }}
                    title='提交' onPress={() => {
                        Keyboard.dismiss()
                        console.log(formikProps.errors);
                        formikProps.handleSubmit()
                    }} />
            </ScrollView>
            {isDatePickerVisible && <DateTimePicker
                mode="date"
                display={Platform.OS === 'android' ? "spinner" : "default"}
                value={values.birthday === '' ? new Date() : moment(values.birthday).toDate()}
                onChange={handleDateChange} />}
            <Provider>
                <Portal>
                    <Dialog
                        visible={isDialogVisible}
                        onDismiss={_hideDialog}
                    >
                        <Dialog.Title>請選擇你的職業</Dialog.Title>
                        <Dialog.Content>
                            {roleList.map(data => (
                                <List.Item
                                    key={data.key}
                                    title={data.label}
                                    onPress={handleDialogOption.bind(this, data.value)} />))}
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </Provider>

        </>)
}


const styles = StyleSheet.create({
    logoContainer: {
        marginTop: ScreenHeight * 0.1,
    }
})