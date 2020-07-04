import React, { useState } from "react";
import { Formik } from "formik";
import {
  Keyboard,
  View,
  Platform,
  StyleSheet,
  Picker,
  Text,
} from "react-native";
import {
  ScreenHeight,
  ScreenWidth,
  FontScale,
} from "../../../../constant/Constant";
import { SchemaPatient } from "../Schema/SchemaPatient";
import { SchemaProfessional } from "../Schema/SchemaProfessional";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import moment from "moment";
import { createAccount, registerPatientAccount } from "../RegisterAction";
import { LinearGradientBackground } from "../../../../Utils/LinearGradientBackground";
import Logo from "../../../../Utils/Logo";
import { RoundButton } from "../../../../Utils/RoundButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyledMultiLinesInput } from "../../../../Utils/StyledMultiLinesInput";
import { SchemaRegisterPatient } from "../Schema/SchemaRegisterPatient";
import { Portal, Dialog, Provider, List, Modal } from "react-native-paper";
import { CheckBox, Icon } from "react-native-elements";
import { InputTextField } from "../../Utils/InputTextField";
import { InputDialogPicker } from "../../Utils/InputDialogPicker";
import { MailIcon, KeyIcon, PhoneIcon } from "../../Utils/Icons";
import { PhoneInputField } from "../../Utils/PhoneInputField";
import { InputDatePickerModal } from "../../Utils/InputDatePickerModal";

export const RegistrationForm = ({ navigation, route }) => {
  const { isProfessional, registerPatient } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [
    isRegisterMethodDialogVisible,
    setRegisterMethodDialogVisibility,
  ] = useState(true);

  const _showRegisterMethodDialog = () =>
    setRegisterMethodDialogVisibility(true);

  const _hideRegisterMethodDialog = () =>
    setRegisterMethodDialogVisibility(false);

  const registerMethods = [
    { key: "0", label: "以電子郵件註冊" },
    { key: "1", label: "以電話註冊" },
  ];
  return (
    <>
      <LinearGradientBackground>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            surName: "",
            givenName: "",
            firstNameFilled: false,
            lastNameFilled: false,
            surNameFilled: false,
            givenNameFilled: false,
            birthday: "",
            email: "",
            password: "",
            confirmPassword: "",
            tel_country_code: "+852",
            tel_number: "",
            job: "",
            role: "",
            history: "",
            disease: "",
            allowedSearch: false,
          }}
          onSubmit={(values) => {
            console.log(values);
            /* setIsLoading(true); */
            isProfessional && registerPatient
              ? registerPatientAccount({
                  values,
                  isProfessional,
                  registerPatient,
                  onComplete: () => {
                    setIsLoading(false);
                    navigation.goBack();
                  },
                })
              : createAccount({
                  values,
                  navigation,
                  isProfessional,
                  registerPatient,
                });
          }}
          validationSchema={
            isProfessional
              ? registerPatient
                ? SchemaRegisterPatient
                : SchemaProfessional
              : SchemaPatient
          }
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(formikProps) => (
            <FormDetails
              formikProps={formikProps}
              isProfessional={isProfessional}
              registerPatient={registerPatient}
              isLoading={isLoading}
            />
          )}
        </Formik>
      </LinearGradientBackground>

      {/* <Modal
        visible={isRegisterMethodDialogVisible}
        transparent={true}
        onRequestClose={_hideRegisterMethodDialog}
        onDismiss={_hideRegisterMethodDialog}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}></View>
        </View>
      </Modal> */}
      <Provider>
        <Modal visible={isRegisterMethodDialogVisible}></Modal>
      </Provider>
    </>
  );
};

const FormDetails = ({
  formikProps,
  isProfessional,
  registerPatient,
  isLoading,
}) => {
  const { setFieldValue, values } = formikProps;
  const [selectedNameField, setSelectedNameField] = useState("chi");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isRoleDialogVisible, setRoleDialogVisibility] = useState(false);
  const _showDatePicker = () => setDatePickerVisibility(true);
  const _hideDatePicker = () => setDatePickerVisibility(false);

  const _showRoleDialog = () => setRoleDialogVisibility(true);
  const _hideRoleDialog = () => setRoleDialogVisibility(false);

  const handleDateChange = (event, selectedDate) => {
    _hideDatePicker();
    setFieldValue("birthday", moment(selectedDate).format("YYYY-MM-DD"));
  };

  const handleRoleDialogOption = (value) => {
    _hideRoleDialog();
    setFieldValue("role", value);
  };

  const toggleCheckbox = () => {
    setFieldValue("allowedSearch", !values.allowedSearch);
  };

  const roleList = [
    { key: "0", label: "眼科醫生", value: "ophthalmologist" },
    { key: "1", label: "視光師", value: "optometrist" },
  ];

  const personIcon = (
    <Icon name="person" type={"material"} color={"white"} size={35} />
  ); /* name='person' color={'white'} size={35} /> */
  const hourGlassIcon = (
    <SimpleLineIcons name="hourglass" color={"white"} size={32} />
  );
  const jobIcon = (
    <MaterialCommunityIcons name="briefcase" color={"white"} size={35} />
  );
  const illnessIcon = (
    <MaterialCommunityIcons name="pill" color={"white"} size={35} />
  );
  const historyIcon = (
    <MaterialCommunityIcons name="file" color={"white"} size={35} />
  );

  return (
    <>
      <ScrollView
        style={{ paddingHorizontal: ScreenWidth * 0.11 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        <Logo style={styles.logoContainer} />
        <View style={styles.inputFieldsContainer}>
          {selectedNameField === "chi" ? (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <InputTextField
                label={"姓"}
                icon={personIcon}
                contianerStyle={{ flex: 1, marginRight: "3%" }}
                iconStyle={{ flex: 6 }}
                formikProps={formikProps}
                formikKey={"lastName"}
                hideEmbbededMessage={true}
              />
              <InputTextField
                label={"名"}
                iconStyle={{ flex: 6 }}
                contianerStyle={{ flex: 1 }}
                formikProps={formikProps}
                formikKey={"firstName"}
                hideEmbbededMessage={true}
              />
            </View>
          ) : null}
          {selectedNameField === "eng" ? (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <InputTextField
                label={"Surname"}
                contianerStyle={{ flex: 1, marginRight: "3%" }}
                iconStyle={{ flex: 0.3 }}
                formikProps={formikProps}
                formikKey={"surName"}
                hideEmbbededMessage={true}
              />
              <InputTextField
                label={"Given Name"}
                iconStyle={{ flex: 0.3 }}
                contianerStyle={{ flex: 1 }}
                formikProps={formikProps}
                formikKey={"givenName"}
                hideEmbbededMessage={true}
              />
            </View>
          ) : null}
          <View
            style={{ flexDirection: "row", paddingLeft: ScreenWidth * 0.02 }}
          >
            <View style={{ flexDirection: "row", marginRight: "4%" }}>
              <Text
                style={{
                  textAlignVertical: "center",
                  fontSize: FontScale * 15,
                  color: "#FFFFFF",
                }}
              >
                中文
              </Text>
              <RadioButton
                value="chi"
                status={selectedNameField === "chi" ? "checked" : "unchecked"}
                onPress={() => setSelectedNameField("chi")}
                color="#FFFFFF"
                uncheckedColor="#FFFFFF"
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  textAlignVertical: "center",
                  fontSize: FontScale * 15,
                  color: "#FFFFFF",
                }}
              >
                Eng
              </Text>
              <RadioButton
                value="eng"
                status={selectedNameField === "eng" ? "checked" : "unchecked"}
                onPress={() => setSelectedNameField("eng")}
                color="#FFFFFF"
                uncheckedColor="#FFFFFF"
              />
            </View>
          </View>
          {false && (
            <Text
              style={{
                paddingTop: ScreenWidth * 0.01,
                paddingLeft: ScreenWidth * 0.08,
                textAlign: "left",
                fontSize: FontScale * 18,
                fontWeight: "700",
                color: "#FFFFFF",
                flexWrap: "wrap",
              }}
            >
              {formikProps.errors &&
                (selectedNameField === "chi"
                  ? formikProps.errors &&
                    formikProps.errors["name"] &&
                    formikProps.errors["name"]["lastName"]
                    ? "* " + formikProps.errors["name"]["lastName"]
                    : null
                  : formikProps.errors &&
                    formikProps.errors["name"] &&
                    formikProps.errors["name"]["surName"]
                  ? "* " + formikProps.errors["name"]["surName"]
                  : null)}
            </Text>
          )}

          {isProfessional && !registerPatient ? (
            <InputDialogPicker
              label={"職業"}
              icon={jobIcon}
              onDismiss={() => _hideRoleDialog()}
              value={values.role}
              list={roleList}
              formikKey={"role"}
              formikProps={formikProps}
              showDialog={_showRoleDialog}
            />
          ) : (
            <InputDatePickerModal
              icon={hourGlassIcon}
              formikProps={formikProps}
              formikKey="birthday"
              showDatePicker={_showDatePicker}
              value={values.birthday}
            />
          )}
          <PhoneInputField
            label={"電話號碼"}
            icon={PhoneIcon}
            formikProps={formikProps}
            formikKey="tel_number"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
          <InputTextField
            label={"電子郵件"}
            icon={MailIcon}
            formikProps={formikProps}
            formikKey={"email"}
          />
          {registerPatient ? (
            <>
              <InputTextField
                label="職業（非必須）"
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
            </>
          ) : (
            <>
              <InputTextField
                containerStyle={{ height: "auto" }}
                label={"密碼"}
                icon={KeyIcon}
                formikProps={formikProps}
                formikKey="password"
                secureTextEntry
              />
              <InputTextField
                label={"確認密碼"}
                icon={KeyIcon}
                formikProps={formikProps}
                formikKey="confirmPassword"
                secureTextEntry
              />
            </>
          )}
          {!isProfessional ? (
            <CheckBox
              containerStyle={{
                backgroundColor: "transparent",
                borderWidth: 0,
              }}
              textStyle={{
                textAlign: "left",
                fontSize: FontScale * 15,
                color: "#FFFFFF",
              }}
              checkedColor={"#FFFFFF"}
              uncheckedColor={"#E3E3E3"}
              fontFamily="Roboto"
              checked={values.allowedSearch}
              onPress={toggleCheckbox}
              center
              title={"本人同意提供個人資料\n予眼科專家參考"}
            />
          ) : null}
        </View>

        <RoundButton
          buttonStyle={{ marginBottom: ScreenHeight * 0.2 }}
          title="提交"
          onPress={() => {
            Keyboard.dismiss();
            console.log(formikProps.errors);
            formikProps.handleSubmit();
          }}
        />
      </ScrollView>
      {isDatePickerVisible && (
        <DateTimePicker
          mode="date"
          display={Platform.OS === "android" ? "spinner" : "default"}
          value={
            values.birthday === ""
              ? new Date()
              : moment(values.birthday).toDate()
          }
          onChange={handleDateChange}
        />
      )}
      <Provider>
        <Portal>
          <Dialog visible={isRoleDialogVisible} onDismiss={_hideRoleDialog}>
            <Dialog.Title>請選擇你的職業</Dialog.Title>
            <Dialog.Content>
              {roleList.map((data) => (
                <List.Item
                  key={data.key}
                  title={data.label}
                  onPress={handleRoleDialogOption.bind(this, data.value)}
                />
              ))}
            </Dialog.Content>
          </Dialog>
          <Dialog visible={isLoading}></Dialog>
        </Portal>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: ScreenHeight * 0.1,
  },
  inputFieldsContainer: { marginBottom: "10%" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
