import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Logo from "../Utils/Logo";
import { auth, config } from "../../config/config";
import { useEffect } from "react";
import { InputTextField } from "../Utils/InputTextField";
import { LinearGradientBackground } from "../../../Utils/LinearGradientBackground";
import { RoundButton } from "../../../Utils/RoundButton";
import {
  ScreenHeight,
  FontScale,
  Scale,
  ScreenWidth,
} from "../../../constant/Constant";
import { KeyIcon, MailIcon } from "../Utils/Icons";
import Modal from "react-native-modal";

export const LoginWithEmailAndPassword = ({ navigation, route }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoadingState(false);
        navigation.navigate("Main");
      }
    });
    return () => {
      unsubscribe();
    };
  });

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [isLoading, setLoadingState] = useState(false);

  const handleLoginError = (message) => {
    setLoginErrorMessage(message);
    setLoadingState(false);
  };

  const handleLogin = () => {
    setLoadingState(true);
    auth
      .signInWithEmailAndPassword(emailInput, passwordInput)
      .catch(function onFailure(err) {
        switch (err.code) {
          case "auth/invalid-email":
            handleLoginError("電子郵件格式無效");
            break;
          case "auth/wrong-password":
            handleLoginError("密碼錯誤");
            break;
          case "auth/user-not-found":
            handleLoginError("帳號不存在，\n該帳戶有可能已被刪除");
            break;
          default:
            console.log(err.code);
            handleLoginError(err.code + ": " + err.message);
        }
      });
  };

  return (
    <>
      <LinearGradientBackground>
        <KeyboardAvoidingView style={styles.content} behavior={"position"}>
          <Logo />
          <View
            style={{
              marginTop: ScreenHeight * 0.1,
              marginBottom: ScreenHeight * 0.05,
            }}
          >
            <InputTextField
              label="電子郵件"
              icon={MailIcon}
              defaultValue={emailInput}
              setValue={setEmailInput}
              hideEmbeddedErrorMessage={true}
            />
            <InputTextField
              label="密碼"
              icon={KeyIcon}
              defaultValue={passwordInput}
              setValue={setPasswordInput}
              secureTextEntry={true}
              hideEmbeddedErrorMessage
            />
            <View>
              {loginErrorMessage !== "" ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: FontScale * 18,
                    fontWeight: "700",
                    color: "#FFFFFF",
                    flexWrap: "wrap",
                  }}
                >
                  {loginErrorMessage}
                </Text>
              ) : null}
            </View>
          </View>
          <RoundButton title={"登入"} onPress={handleLogin} />
          <View style={styles.registrationNav}>
            <Text style={styles.registrationNavText}>未有用戶? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={[styles.registrationNavText, { color: "#FFFFFF" }]}>
                登記
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradientBackground>
      <Modal
        isVisible={isLoading}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
      >
        <ActivityIndicator size={Scale * 30} color="lightskyblue" />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: ScreenHeight * 0.1,
    marginHorizontal: ScreenWidth * 0.15,
  },
  registrationNav: {
    flexDirection: "row",
    marginTop: ScreenHeight * 0.02,
    alignSelf: "center",
  },
  registrationNavText: {
    fontSize: 18,
    color: "#24559E",
  },
});
