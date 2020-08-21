import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, ScrollView, Alert } from "react-native";
import MenuScreen from "../Utils/MenuScreen";
import { ScreenHeight, ScreenWidth } from "../constant/Constant";
import { Icon, Input } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Formik } from "formik";
import { updateProfileSchemaProfessional } from "../src/utils/updateProfileSchemaProfessional ";
import { RoundButton } from "../Utils/RoundButton";
import { database } from "../src/config/config";

const UpdateProfileScreen = ({ route, navigation }) => {
  const { user, type } = route.params;
  /* console.log(user); */

  const [fieldEditingState, setFieldsEditingState] = useState({
    lastName: false,
  });

  const editIcon = <Icon name="pencil" type="foundation" size={30} color="white" />;

  return (
    <MenuScreen>
      {user && (
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            surName: "",
            givenName: "",
            nameError: "",
            selectedNameFields: "chi",
            chineseNameError: "",
            englishNameError: "",
            gender: "M",
            birthday: user.birthday ? user.birthday : moment().startOf("day").toJSON(),
            parent: {},
            parentSelectionDisabled: false,
            email: "",
            tel_country_code: "+852",
            phone: user.phone,
            job: user.job ? user.job : "",
            role: "",
            history: user.history,
            disease: user.disease,
            allowedSearch: false,
          }}
          validationSchema={updateProfileSchemaProfessional}
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
                job: values.job
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
                console.log(err);
                Alert.alert("更新資料錯誤");
              });
          }}
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
  console.log(formikProps.values.birthday);
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
              label={"家族病史"}
              labelStyle={UpdateProfileScreenStyle.labelStyle}
              inputContainerStyle={{ borderBottomColor: "#FFFFFF" }}
              inputStyle={UpdateProfileScreenStyle.inputStyle}
              defaultValue={formikProps.values["history"]}
              multiline={true}
              onChangeText={formikProps.handleChange("history")}
            />
            <Input
              label={"職業"}
              labelStyle={UpdateProfileScreenStyle.labelStyle}
              inputContainerStyle={{ borderBottomColor: "#FFFFFF" }}
              inputStyle={UpdateProfileScreenStyle.inputStyle}
              defaultValue={formikProps.values["job"]}
              onChangeText={formikProps.handleChange("job")}
              errorMessage={formikProps.erros && formikProps.erros["job"]}
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
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={_hideDatePicker} date={moment(formikProps.values["birthday"]).toDate()} maximumDate={new Date()} />
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
