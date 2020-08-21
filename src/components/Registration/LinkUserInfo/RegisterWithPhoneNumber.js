import React from "react";
import { LinearGradientBackground } from "../../Utils/LinearGradientBackground";
import { View, StyleSheet, Text, TextInput } from "react-native";
import Logo from "../../Utils/Logo";
import { ScreenHeight, FontScale, ScreenWidth, Scale } from "../../../../constant/Constant";
import { RoundButton } from "../../../../Utils/RoundButton";
import { Formik } from "formik";
import { object, number } from "yup";
import { useState } from "react";
import { database } from "../../../config/config";
const phoneValidation = object().shape({
  phone: number()
    .typeError("請輸入數字")
    .required("請輸入聯絡電話")
    .test("len", "請輸入有效的電話號碼(8位數字)", (val) => {
      if (val !== null && val !== undefined) {
        return val.toString().length === 8;
      } else return true;
    }),
});

export const RegisterWithPhoneNumber = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const checkIfUserInfoExist = (phoneNumber) => {
    database
      .ref("userInfo")
      .once("value")
      .then((dataSnapshot) => {
        dataSnapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().phone == phoneNumber) {
            navigation.navigate("RegisterExisting", {
              uidFound: childSnapshot.key,
            });
          }
        });
      })
      .catch((err) => setErrorMessage(err));
  };

  return (
    <LinearGradientBackground>
      <View style={styles.content}>
        <Logo />
        <View style={styles.optionsContainer}>
          <Text style={styles.title}>請輸入已登記電話號碼</Text>
          <Formik initialValues={{ phone: "" }} validationSchema={phoneValidation} onSubmit={(values) => checkIfUserInfoExist(values.phone)}>
            {(formikProps) => (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    borderColor: "white",
                    borderBottomWidth: Scale * 0.5,
                    padding: ScreenWidth * 0.01,
                    width: ScreenWidth * 0.6,
                    marginTop: ScreenHeight * 0.05,
                  }}
                >
                  <Text style={[styles.title, { flex: 4, fontSize: 20 }]}>+852</Text>
                  <TextInput
                    style={{
                      flex: 8,
                      marginLeft: ScreenWidth * 0.02,
                      fontSize: 20,
                      color: "white",
                    }}
                    onChangeText={formikProps.handleChange("phone")}
                    onSubmitEditing={() => formikProps.handleSubmit()}
                    keyboardType="phone-pad"
                  />
                </View>
                {formikProps.errors && <Text style={styles.errorMessage}>{errorMessage === null ? formikProps.errors["phone"] : errorMessage}</Text>}
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingHorizontal: ScreenWidth * 0.2,
                    alignContent: "space-around",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <RoundButton onPress={() => navigation.navigate("Login")} type="outline" title="返回" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <RoundButton onPress={() => formikProps.handleSubmit()} type="outline" title="確認" />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </LinearGradientBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: ScreenHeight * 0.15,
  },
  optionsContainer: {
    marginTop: ScreenHeight * 0.1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 22,
    color: "white",
  },
  button: {
    margin: ScreenHeight * 0.03,
    borderColor: "white",
    borderRadius: ScreenWidth * 0.07,
    borderWidth: 1,
    width: ScreenWidth * 0.45,
    height: ScreenHeight * 0.07,
    shadowRadius: ScreenWidth * 0.07,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: FontScale * 18,
  },
  errorMessage: {
    margin: ScreenHeight * 0.02,
    textAlign: "left",
    fontSize: FontScale * 15,
    fontWeight: "700",
    color: "#FFFFFF",
    flexWrap: "wrap",
  },
});
