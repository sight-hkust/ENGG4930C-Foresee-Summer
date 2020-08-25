import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, ScrollView, Alert } from "react-native";
import MenuScreen from "../Utils/MenuScreen";
import { ScreenHeight, ScreenWidth } from "../constant/Constant";
import { Icon, Input } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Formik } from "formik";
import { RoundButton } from "../Utils/RoundButton";
import { database } from "../src/config/config";
import { updateProfessionalProfileSchema, updatePatientProfileSchema } from "../src/utils/schema";
import { decryptData } from "../src/utils/encryptData";

const UpdateProfileScreen = ({ route, navigation }) => {
  const { user, type } = route.params;
  console.log("user: ", user);
  return (
    <MenuScreen>
      {user && (
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            nameError: "",
            selectedNameFields: "chi",
            chineseNameError: "",
            englishNameError: "",
            gender: "M",
            birthday: user.birthday ? user.birthday : moment().format("YYYY-MM-DD"),
            parent: {},
            parentSelectionDisabled: false,
            email: "",
            tel_country_code: "+852",
            phone: user.phone,
            job: user.job ? user.job : "",
            role: "",
            history: user.history ? user.history : "",
            disease: user.disease ? user.disease : "",
            allowedSearch: false,
          }}
          onSubmit={async (values, { setSubmitting, resetForm, setStatus, setErrors }) => {
            let userRef = "";
            let updateValue = {};
            if (type == "normal") {
              userRef = database.ref("/users/" + user.uid);
              updateValue = {
                firstName: values.firstName,
                lastName: values.lastName,
                birthday: values.birthday,
                phone: values.phone,
                job: values.job,
                disease: values.disease,
                history: values.history,
              };
            } else {
              userRef = database.ref("/professionals/" + user.uid);
              updateValue = {
                firstName: values.firstName,
                lastName: values.lastName,
                birthday: values.birthday,
                phone: values.phone,
              };
            }
            userRef
              .update(updateValue)
              .then(function () {
                Alert.alert("更新資料完成");
              })
              .catch((err) => {
                Alert.alert("更新資料錯誤");
              });
          }}
          validationSchema={type == "normal" ? updatePatientProfileSchema : updateProfessionalProfileSchema}
        >
          {(formikProps) => <UpdateProfileFormDetails formikProps={formikProps} type={type} />}
        </Formik>
      )}
    </MenuScreen>
  );
};

const UpdateProfileFormDetails = ({ formikProps, type }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const _showDatePicker = () => setDatePickerVisibility(true);
  const _hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date) => {
    _hideDatePicker();
    formikProps.setFieldValue("birthday", moment(date).toJSON(), false);
  };

  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
      <View style={{ marginTop: ScreenHeight * 0.2, paddingHorizontal: ScreenWidth * 0.1 }}>
        <View style={{ flexDirection: "row" }}>
          <Input
            label={"姓"}
            labelStyle={UpdateProfileScreenStyle.labelStyle}
            inputContainerStyle={{ borderBottomColor: "#FFFFFF" }}
            inputStyle={UpdateProfileScreenStyle.inputStyle}
            containerStyle={{ flex: 1 }}
            defaultValue={formikProps.values["lastName"]}
            onChangeText={formikProps.handleChange("lastName")}
          />
          <Input
            label={"名"}
            labelStyle={UpdateProfileScreenStyle.labelStyle}
            inputContainerStyle={{ borderBottomColor: "#FFFFFF" }}
            inputStyle={UpdateProfileScreenStyle.inputStyle}
            containerStyle={{ flex: 1 }}
            defaultValue={formikProps.values["firstName"]}
            onChangeText={formikProps.handleChange("firstName")}
          />
        </View>
        {formikProps.errors && formikProps.errors["nameError"] && (
          <View style={{ marginTop: -ScreenHeight * 0.01, marginBottom: ScreenHeight * 0.01, paddingLeft: ScreenHeight * 0.015 }}>
            <Text style={UpdateProfileScreenStyle.errorStyle}>{formikProps.errors["nameError"]}</Text>
          </View>
        )}
        <View style={{ marginBottom: ScreenHeight * 0.024, marginHorizontal: ScreenWidth * 0.022 }}>
          <View style={{ marginBottom: ScreenHeight * 0.012 }}>
            <Text style={{ color: "#FFFFFF", fontSize: ScreenWidth * 0.043, fontWeight: "bold" }}>出生日期</Text>
          </View>
          <TouchableOpacity onPress={_showDatePicker} style={{}}>
            {/*  <View style={FormItemStyle.dropDownButton}>
                <Image source={DropDown} />
              </View> */}
            <View style={{ borderBottomColor: "#FFFFFF", borderBottomWidth: 1 }}>
              <Text style={{ color: "#FFFFFF", fontSize: ScreenWidth * 0.043 }}>{moment(formikProps.values["birthday"]).format("YYYY-MM-DD")}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Input
          label={"電話號碼"}
          labelStyle={UpdateProfileScreenStyle.labelStyle}
          inputContainerStyle={{ borderBottomColor: "#FFFFFF" }}
          inputStyle={UpdateProfileScreenStyle.inputStyle}
          errorStyle={UpdateProfileScreenStyle.errorStyle}
          defaultValue={formikProps.values["phone"]}
          onChangeText={formikProps.handleChange("phone")}
          keyboardType="phone-pad"
          errorMessage={formikProps.errors["phone"]}
        />
        {type == "normal" ? (
          <>
            <Input
              label={"職業"}
              labelStyle={UpdateProfileScreenStyle.labelStyle}
              inputContainerStyle={{ borderBottomColor: "#FFFFFF" }}
              inputStyle={UpdateProfileScreenStyle.inputStyle}
              defaultValue={formikProps.values["job"]}
              onChangeText={formikProps.handleChange("job")}
              errorMessage={formikProps.erros && formikProps.erros["job"]}
            />
            <Input
              label={"家族病史"}
              labelStyle={UpdateProfileScreenStyle.labelStyle}
              inputContainerStyle={{
                borderColor: "#FFFFFF",
                borderWidth: 1,
                borderRadius: ScreenHeight * 0.015,
                minHeight: ScreenHeight * 0.25,
                marginTop: ScreenHeight * 0.02,
                paddingVertical: ScreenHeight * 0.025,
                paddingHorizontal: ScreenHeight * 0.009,
              }}
              inputStyle={[UpdateProfileScreenStyle.inputStyle, { height: "100%" }]}
              defaultValue={formikProps.values["history"]}
              multiline={true}
              onChangeText={formikProps.handleChange("history")}
            />
            <Input
              label={"已知眼疾"}
              labelStyle={UpdateProfileScreenStyle.labelStyle}
              inputContainerStyle={{
                borderColor: "#FFFFFF",
                borderWidth: 1,
                borderRadius: ScreenHeight * 0.015,
                minHeight: ScreenHeight * 0.25,
                marginTop: ScreenHeight * 0.02,
                paddingVertical: ScreenHeight * 0.025,
                paddingHorizontal: ScreenHeight * 0.009,
              }}
              inputStyle={[UpdateProfileScreenStyle.inputStyle, { height: "100%" }]}
              defaultValue={formikProps.values["disease"]}
              multiline={true}
              onChangeText={formikProps.handleChange("disease")}
            />
          </>
        ) : null}
        <RoundButton
          title="更新資料"
          onPress={() => {
            Keyboard.dismiss();
            formikProps.handleSubmit();
          }}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={_hideDatePicker}
        date={moment(formikProps.values["birthday"]).toDate()}
        maximumDate={new Date()}
      />
    </ScrollView>
  );
};

export default UpdateProfileScreen;

const UpdateProfileScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  labelStyle: {
    fontSize: ScreenWidth * 0.043,
    color: "#FFFFFF",
  },
  inputStyle: {
    fontSize: ScreenWidth * 0.043,
    color: "#FFFFFF",
  },
  errorStyle: {
    fontSize: ScreenWidth * 0.043,
    color: "#FFFD78",
  },
});
