import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, ScrollView, Alert } from "react-native";
import MenuScreen from "../Utils/MenuScreen";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";
import { Input } from "react-native-elements";
import { Formik } from "formik";
import { RoundButton } from "../Utils/RoundButton";
import { auth } from "../src/config/config";
import { changePasswordSchema } from "../src/utils/schema";
import * as firebase from "firebase";
require("firebase/functions");

import i18n from 'i18n-js';
import {useLocalization} from "../src/strings/Strings";

const ChangePasswordScreen = ({ route, navigation }) => {
    useLocalization();
  const changeUserPassword = firebase.functions().httpsCallable("changeUserPassword");
  return (
    <MenuScreen>
      {
        <Formik
          initialValues={{
            password: "",
            confirmpassword: "",
            passwordError: "",
          }}
          validationSchema={changePasswordSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values, { setSubmitting, resetForm, setStatus, setErrors }) => {
            const newPassword = values.password;
            const uid = auth.currentUser.uid;
            /* console.log(newPassword);
            console.log(uid); */
            changeUserPassword({ uid, newPassword })
              .then((response) => {
                console.log(response);
                Alert.alert(i18n.t('change_password_alert_title'), null, [
                  {
                    text: "OK",
                    onPress: () => {
                      console.log("finish change password.");
                      navigation.navigate("ProfileTabMain");
                    },
                  },
                ]);
              })
              .catch((err) => console.log(err));
          }}
        >
          {(formikProps) => <FormDetails formikProps={formikProps} />}
        </Formik>
      }
    </MenuScreen>
  );
};

const FormDetails = ({ formikProps }) => {
  useEffect(() => {
    console.log(formikProps.errors);
  }, [formikProps.errors]);
  return (
    <View style={ChangePasswordScreenStyle.container}>
      <Input
        label={i18n.t('change_password_input_1')}
        labelStyle={ChangePasswordScreenStyle.labelStyle}
        inputContainerStyle={{ borderBottomColor: "#FFFFFF" }}
        inputStyle={ChangePasswordScreenStyle.inputStyle}
        defaultValue={formikProps.values["password"]}
        onChangeText={formikProps.handleChange("password")}
        secureTextEntry
      />
      <Input
        label={i18n.t('change_password_input_2')}
        labelStyle={ChangePasswordScreenStyle.labelStyle}
        inputContainerStyle={{ borderBottomColor: "#FFFFFF" }}
        inputStyle={ChangePasswordScreenStyle.inputStyle}
        defaultValue={formikProps.values["confirmPassword"]}
        onChangeText={formikProps.handleChange("confirmPassword")}
        secureTextEntry
      />
      {formikProps.errors && formikProps.errors["passwordError"] && (
        <View style={{ marginBottom: ScreenHeight * 0.035 }}>
          <Text style={ChangePasswordScreenStyle.errorStyle}>{formikProps.errors["passwordError"]}</Text>
        </View>
      )}
      <RoundButton
        title={i18n.t('change_password_round_button')}
        onPress={() => {
          Keyboard.dismiss();
          formikProps.handleSubmit();
        }}
        containerStyle={{ width: ScreenWidth * 0.4 }}
        buttonStyle={{ borderRadius: ScreenWidth * 0.15 }}
      />
    </View>
  );
};

export default ChangePasswordScreen;

const ChangePasswordScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: ScreenWidth * 0.07,
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
