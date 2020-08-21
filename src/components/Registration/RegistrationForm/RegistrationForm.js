import React, { useState } from "react";
import { Formik } from "formik";
import { Keyboard, View, Platform, StyleSheet, Picker, Text, TouchableOpacity, Modal, StatusBar } from "react-native";
import { ScreenHeight, ScreenWidth, FontScale } from "../../../../constant/Constant";
import { SchemaPatient } from "../Schema/SchemaPatient";
import { SchemaProfessional } from "../Schema/SchemaProfessional";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton, Switch, Button, Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import moment from "moment";
import { createAccount, registerPatientAccount, registerChildAccount } from "../RegisterAction";
import { LinearGradientBackground } from "../../../../Utils/LinearGradientBackground";
import Logo from "../../Utils/Logo";
import { RoundButton } from "../../../../Utils/RoundButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SchemaRegisterPatient } from "../Schema/SchemaRegisterPatient";
import { Portal, Dialog, Provider, List } from "react-native-paper";
import { CheckBox, Icon, ButtonGroup } from "react-native-elements";
import { InputTextField } from "../../Utils/InputTextField";
import { InputDialogPicker } from "../../Utils/InputDialogPicker";
import { MailIcon, KeyIcon, PhoneIcon, FamilyIcon } from "../../Utils/Icons";
import { PhoneInputField } from "../../Utils/PhoneInputField";
import { InputDatePickerModal } from "../../Utils/InputDatePickerModal";
import MenuScreen from "../../../../Utils/MenuScreen";
import PatientSearchPanel from "../../Utils/PatientSearchPanel";
import { SchemaRegisterChild } from "../Schema/SchemaRegisterChild";
import { CommonActions } from "@react-navigation/native";
import { MultiLinesInputTextField } from "../../Utils/MultiLinesInputTextField";
import { heightPercentageToDP } from "react-native-responsive-screen";
import GenderOptionsInput from "../../GenderOptionsInput/GenderOptionsInput";

export const RegistrationForm = ({ navigation, route }) => {
  const { isProfessional, registerPatient, registerChild } = route.params;

  const useMenuScreen = (isProfessional && registerPatient) || (!isProfessional && registerChild);
  return (
    <>
      {useMenuScreen ? (
        <MenuScreen>
          <FormComponent navigation={navigation} route={route} />
        </MenuScreen>
      ) : (
        <LinearGradientBackground>
          <FormComponent navigation={navigation} route={route} />
        </LinearGradientBackground>
      )}
    </>
  );
};

const FormComponent = ({ navigation, route }) => {
  const { isProfessional, registerPatient, registerChild } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMethodDialogVisible, setRegisterMethodDialogVisibility] = useState(true);
  const dateTimePickerIOSConfirmButton = useState(false);
  const [errorMessageFromServer, setErrorMessageFromServer] = useState("");

  const _showRegisterMethodDialog = () => setRegisterMethodDialogVisibility(true);

  const _hideRegisterMethodDialog = () => setRegisterMethodDialogVisibility(false);

  const setServerError = (error) => {
    console.log(error.code);
    switch (error.code) {
      case "auth/email-already-in-use":
        setErrorMessageFromServer("電子郵件已註冊");
        break;
      default:
        setErrorMessageFromServer(error.code + " " + error.message);
        break;
    }
  };

  const registerMethods = [
    { key: "0", label: "以電子郵件註冊" },
    { key: "1", label: "以電話註冊" },
  ];
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        surName: "",
        givenName: "",
        selectedNameFields: "chi",
        chineseNameError: "",
        englishNameError: "",
        gender: "",
        birthday: "",
        parent: {},
        parentSelectionDisabled: false,
        email: "",
        password: "",
        confirmPassword: "",
        tel_country_code: "+852",
        tel_number: "",
        job: "",
        role: "",
        part: "",
        history: "",
        disease: "",
        allowedSearch: false,
      }}
      onSubmit={async (values, { setSubmitting, resetForm, setStatus, setErrors }) => {
        try {
          switch (true) {
            case registerChild:
              registerChildAccount({
                values,
                registerChild,
                returnOnComplete: () => {
                  setIsLoading(false);
                  navigation.dispatch(
                    CommonActions.navigate({
                      name: "HomeScreen",
                      params: {
                        actions: navigation.popToTop(),
                      },
                    })
                  );
                  resetForm({});
                  setStatus({ success: true });
                },
              });
              break;
            case registerPatient:
              registerPatientAccount({
                values,
                returnOnComplete: () => {
                  setIsLoading(false);
                  navigation.navigate("ProfMainMenu");
                  resetForm({});
                  setStatus({ success: true });
                },
                setServerError: setServerError,
              });
              break;
            default:
              createAccount({
                values,
                navigation,
                isProfessional,
                setServerError: setServerError,
                returnOnComplete: () => {
                  setIsLoading(false);
                  resetForm({});
                  setStatus({ success: true });
                },
              });
              break;
          }
        } catch (error) {
          setSubmitting(false);
          setStatus({ success: false });
          setErrors({ submit: error.message });
        }
      }}
      validationSchema={isProfessional ? (registerPatient ? SchemaRegisterPatient : SchemaProfessional) : registerChild ? SchemaRegisterChild : SchemaPatient}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {(formikProps) => (
        <FormDetails
          formikProps={formikProps}
          isProfessional={isProfessional}
          registerPatient={registerPatient}
          isLoading={isLoading}
          errorMessageFromServer={errorMessageFromServer}
          registerChild={registerChild}
        />
      )}
    </Formik>
  );
};

const FormDetails = ({ formikProps, isProfessional, registerPatient, registerChild, isLoading, errorMessageFromServer }) => {
  const selectedNameFieldsOnRefresh = (selectedNameFields == selectedNameFields) == "eng" && !formikProps.errors["englishNameError"] && formikProps.errors["chineseNameError"] ? "eng" : "chi";
  const { setFieldValue, values } = formikProps;
  const [selectedNameFields, setSelectedNameFields] = useState("chi");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isRoleDialogVisible, setRoleDialogVisibility] = useState(false);
  const [isPartDialogVisible, setPartDialogVisibility] = useState(false);
  const [isFamilySearchFieldVisible, setFamilySearchFieldVisibility] = useState(false);

  const [isFamilySearchDialogVisible, setFamilySearchDialogVisibility] = useState(false);

  const _toggleFamilySearchSwitch = () => setFamilySearchFieldVisibility(!isFamilySearchFieldVisible);

  const _showDatePicker = () => setDatePickerVisibility(true);
  const _hideDatePicker = () => setDatePickerVisibility(false);

  const _showRoleDialog = () => setRoleDialogVisibility(true);
  const _hideRoleDialog = () => setRoleDialogVisibility(false);

  const _showPartDialog = () => setPartDialogVisibility(true);
  const _hidePartDialog = () => setPartDialogVisibility(false);

  const _showFamilySearchDialog = () => {
    setFieldValue("parentSelectionDisabled", false);
    setFamilySearchDialogVisibility(true);
  };
  const _hideFamilySearchDialog = () => {
    setFieldValue("parentSelectionDisabled", true);
    setFamilySearchDialogVisibility(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDatePickerVisibility(false);
    setFieldValue("birthday", moment(currentDate).format("YYYY-MM-DD"));
  };

  const handleDateConfirm = (selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDatePickerVisibility(false);
    setFieldValue("birthday", moment(currentDate).format("YYYY-MM-DD"));
  };

  const handleDatePickerTouchStart = () => {
    console.log("HI");
  };

  const handleRoleDialogOption = (value) => {
    _hideRoleDialog();
    setFieldValue("role", value);
  };

  const handlePartDialogOption = (value) => {
    _hidePartDialog();
    setFieldValue("part", value);
  };

  const toggleCheckbox = () => {
    setFieldValue("allowedSearch", !values.allowedSearch);
  };

  const roleList = [
    { key: "0", label: "眼科醫生", value: "ophthalmologist" },
    { key: "1", label: "視光師", value: "optometrist" },
  ];

  const partList = [
    { key: "0", label: "第一部分", value: "part1" },
    { key: "1", label: "第二部分 ", value: "part2" },
    { key: "2", label: "第三部分", value: "part3" },
    { key: "3", label: "第四部分 ", value: "part4" },
  ];

  const personIcon = <Icon name="person" type={"material"} color={"white"} size={35} />; /* name='person' color={'white'} size={35} /> */
  const hourGlassIcon = <SimpleLineIcons name="hourglass" color={"white"} size={32} />;
  const jobIcon = <MaterialCommunityIcons name="briefcase" color={"white"} size={35} />;
  const illnessIcon = <MaterialCommunityIcons name="pill" color={"white"} size={35} />;
  const historyIcon = <MaterialCommunityIcons name="file" color={"white"} size={35} />;

  return (
    <>
      <View>
        <ScrollView
          style={{
            paddingHorizontal: ScreenWidth * 0.11,
            marginBottom: ScreenHeight * 0.1 * (isProfessional && registerPatient),
            width: "100%",
          }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          {!registerPatient ? (
            !registerChild ? (
              <Logo style={styles.logoContainer} />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: ScreenHeight * 0.045,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                登記子女帳號
              </Text>
            )
          ) : (
            <Text
              style={{
                textAlign: "center",
                marginVertical: 40,
                fontSize: 35,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              登記病人
            </Text>
          )}

          <View style={styles.inputFieldsContainer}>
            {selectedNameFields === "chi" ? (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <InputTextField
                  label={"姓"}
                  icon={personIcon}
                  containerStyle={{
                    flex: 1,
                    marginRight: "3%",
                    marginBottom: "-2%",
                  }}
                  iconStyle={{ flex: 6 }}
                  formikProps={formikProps}
                  formikKey={"lastName"}
                  hideEmbbededMessage={true}
                />
                <InputTextField label={"名"} iconStyle={{ flex: 6 }} containerStyle={{ flex: 1, marginBottom: "-2%" }} formikProps={formikProps} formikKey={"firstName"} hideEmbbededMessage={true} />
              </View>
            ) : null}
            {selectedNameFields === "eng" ? (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <InputTextField
                  label={"Given Name"}
                  containerStyle={{
                    flex: 1,
                    marginRight: "3%",
                    marginBottom: "-2%",
                  }}
                  iconStyle={{ flex: 0.3 }}
                  formikProps={formikProps}
                  formikKey={"givenName"}
                  hideEmbbededMessage={true}
                />
                <InputTextField
                  label={"Surname"}
                  containerStyle={{ flex: 1, marginBottom: "-2%" }}
                  iconStyle={{ flex: 0.3 }}
                  formikProps={formikProps}
                  formikKey={"surName"}
                  hideEmbbededMessage={true}
                />
              </View>
            ) : null}
            <View style={{ flexDirection: "row", paddingLeft: ScreenWidth * 0.02 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginRight: "4%",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    fontSize: 18,
                    color: "#FFFFFF",
                  }}
                >
                  中文
                </Text>
                <RadioButton
                  value="chi"
                  status={selectedNameFields === "chi" ? "checked" : "unchecked"}
                  onPress={() => {
                    setFieldValue("givenName", "");
                    setFieldValue("surName", "");
                    setSelectedNameFields("chi");
                    setFieldValue("selectedNameFields", "chi");
                  }}
                  color="#FFFFFF"
                  uncheckedColor="#FFFFFF"
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    fontSize: 20,
                    color: "#FFFFFF",
                  }}
                >
                  Eng
                </Text>
                <RadioButton
                  value="eng"
                  status={selectedNameFields === "eng" ? "checked" : "unchecked"}
                  onPress={() => {
                    setFieldValue("firstName", "");
                    setFieldValue("lastName", "");
                    setSelectedNameFields("eng");
                    setFieldValue("selectedNameFields", "eng");
                  }}
                  color="#FFFFFF"
                  uncheckedColor="#FFFFFF"
                />
              </View>
            </View>

            {formikProps.errors && (formikProps.errors["chineseNameError"] || formikProps.errors["englishNameError"]) ? (
              <Text
                adjustsFontSizeToFit={true}
                style={{
                  paddingTop: ScreenWidth * 0.01,
                  paddingLeft: ScreenWidth * 0.08,
                  textAlign: "left",
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#FFFD78",
                  flexWrap: "wrap",
                }}
              >
                {"* " + (formikProps.errors["chineseNameError"] ? formikProps.errors["chineseNameError"] : formikProps.errors["englishNameError"])}
              </Text>
            ) : null}

            <GenderOptionsInput formikKey="gender" formikProps={formikProps} label={"性別"} />

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
              <InputDatePickerModal icon={hourGlassIcon} formikProps={formikProps} formikKey="birthday" showDatePicker={_showDatePicker} value={values.birthday} />
            )}

            {isProfessional && !registerPatient && (
              <InputDialogPicker
                label={"註冊資格"}
                icon={jobIcon}
                onDismiss={() => _hidePartDialog()}
                value={values.part}
                list={partList}
                formikKey={"part"}
                formikProps={formikProps}
                showDialog={_showPartDialog}
              />
            )}

            {registerPatient ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: "4%",
                    marginVertical: ScreenHeight * 0.02,
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    {FamilyIcon}
                  </View>
                  <Text
                    style={{
                      flex: 8,
                      fontSize: FontScale * 18,
                      color: "white",
                      textAlignVertical: "center",
                    }}
                  >
                    搜尋病人家屬
                  </Text>
                  <Switch value={isFamilySearchFieldVisible} onValueChange={_toggleFamilySearchSwitch} color="#FFFFFF" />
                </View>
                {isFamilySearchFieldVisible && (
                  <View>
                    <TouchableOpacity onPress={_showFamilySearchDialog}>
                      <Text
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.4)",
                          height: ScreenHeight * 0.065,
                          borderRadius: ScreenHeight * 0.035,
                          fontSize: FontScale * 18,
                          marginBottom: ScreenHeight * 0.01,
                          paddingHorizontal: "10%",
                          color: "#FFFFFF",
                          textAlignVertical: "center",
                          textAlign: "center",
                        }}
                      >
                        {values.parent ? values.parent["name"] : ""}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : null}
            {!registerChild ? (
              <>
                <PhoneInputField label={"電話號碼"} icon={PhoneIcon} formikProps={formikProps} formikKey="tel_number" keyboardType="phone-pad" />
                <InputTextField label={"電子郵件"} icon={MailIcon} formikProps={formikProps} formikKey={"email"} />
              </>
            ) : null}
            {registerPatient || registerChild ? (
              <>
                <InputTextField label="職業（非必須）" icon={jobIcon} formikKey="job" formikProps={formikProps} />
                <MultiLinesInputTextField label="家庭病史（非必須）" icon={historyIcon} formikKey="history" formikProps={formikProps} />
                <MultiLinesInputTextField label="已知眼疾（非必須）" icon={illnessIcon} formikKey="disease" formikProps={formikProps} />
              </>
            ) : (
              <>
                <InputTextField containerStyle={{ height: "auto" }} label={"密碼"} icon={KeyIcon} formikProps={formikProps} formikKey="password" secureTextEntry />
                <InputTextField label={"確認密碼"} icon={KeyIcon} formikProps={formikProps} formikKey="confirmPassword" secureTextEntry />
              </>
            )}

            {
              //temporarily not using
              /* {!isProfessional ? (
              <CheckBox
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                }}
                textStyle={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "#FFFFFF",
                }}
                checkedColor={"#FFFFFF"}
                uncheckedColor={"#E3E3E3"}
                checked={values.allowedSearch}
                onPress={toggleCheckbox}
                center
                title={"本人同意提供個人資料予眼科專家參考"}
              />
            ) : null} */
            }
          </View>
          {errorMessageFromServer != "" && (
            <Text
              style={{
                paddingBottom: ScreenWidth * 0.02,
                textAlign: "center",
                fontSize: 20,
                fontWeight: "700",
                color: "#F34555D3",
                flexWrap: "wrap",
              }}
            >
              {errorMessageFromServer}
            </Text>
          )}
          <RoundButton
            buttonStyle={{ marginBottom: ScreenHeight * 0.1 }}
            title="提交"
            onPress={() => {
              Keyboard.dismiss();
              formikProps.handleSubmit();
            }}
          />
        </ScrollView>
        {Platform.OS === "android" ? (
          isDatePickerVisible && (
            <DateTimePicker testID="dateTimePicker" mode="date" display="spinner" value={values.birthday === "" ? new Date() : moment(values.birthday).toDate()} onChange={handleDateChange} />
          )
        ) : (
          <DateTimePickerModal
            date={values.birthday === "" ? new Date() : moment(values.birthday).toDate()}
            maximumDate={new Date()}
            isVisible={isDatePickerVisible}
            onConfirm={handleDateConfirm}
            onCancel={_hideDatePicker}
          />
        )}
      </View>
      <Provider>
        <Portal>
          {/* {Platform.OS === "ios" ? (
            <Modal visible={isDatePickerVisible} onDismiss={_hideDatePicker}>
              <View
                style={{
                  backgroundColor: "white",
                }}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  mode="date"
                  display="spinner"
                  value={
                    values.birthday === ""
                      ? new Date()
                      : moment(values.birthday).toDate()
                  }
                  onDateChange
                />
                <View>
                  <Button onPress={_hideDatePicker}>CONFIRM</Button>
                </View>
              </View>
            </Modal>
          ) : null} */}

          <Dialog visible={isRoleDialogVisible} onDismiss={_hideRoleDialog}>
            <Dialog.Title>請選擇你的職業</Dialog.Title>
            <Dialog.Content>
              {roleList.map((data) => (
                <List.Item key={data.key} title={data.label} onPress={handleRoleDialogOption.bind(this, data.value)} />
              ))}
            </Dialog.Content>
          </Dialog>

          <Dialog visible={isPartDialogVisible} onDismiss={_hidePartDialog}>
            <Dialog.Title>請選擇你的註冊部分</Dialog.Title>
            <Dialog.Content>
              {partList.map((data) => (
                <List.Item key={data.key} title={data.label} onPress={handlePartDialogOption.bind(this, data.value)} />
              ))}
            </Dialog.Content>
          </Dialog>

          <Dialog visible={isFamilySearchDialogVisible} onDismiss={_hideFamilySearchDialog}>
            <Dialog.Content>
              <PatientSearchPanel setFieldValue={setFieldValue} hideFamilySearchDialog={_hideFamilySearchDialog} />
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
  inputFieldsContainer: {
    marginBottom: "10%",
  },
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
