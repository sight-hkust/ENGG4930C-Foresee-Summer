import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState, useRef } from "react";
import Logo from "../Utils/Logo";
import firebase from "firebase";
import { auth } from "../../config/config";
import { useEffect } from "react";
import { LinearGradientBackground } from "../../../Utils/LinearGradientBackground";
import { RoundButton } from "../../../Utils/RoundButton";
import {
  ScreenHeight,
  FontScale,
  Scale,
  ScreenWidth,
} from "../../../constant/Constant";
import { KeyIcon, MailIcon, PhoneIcon } from "../Utils/Icons";
import Modal from "react-native-modal";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { VerificationInput } from "../Utils/VerificationInput";
import { PhoneInputField } from "../Utils/PhoneInputField";

export const LoginWithPhone = ({ navigation, route }) => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoadingState(false);
        navigation.navigate("Main");
      }
    });
  });

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const recaptchaVerifierRef = useRef(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isVerficationModalShown, setVerifcationModalState] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setLoadingState] = useState(false);

  const handleVerification = () => {
    auth
      .signInWithPhoneNumber("+852" + phoneNumber, recaptchaVerifierRef.current)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setVerifcationModalState(true);
      })
      .catch((error) => handleLoginError(error.code + error.message));
  };

  const handleLoginError = (message) => {
    console.log(message);
    /* setLoginErrorMessage(message); */
    setLoadingState(false);
  };

  return (
    <>
      <LinearGradientBackground>
        <KeyboardAvoidingView behavior={"position"}>
          <View style={styles.content}>
            <Logo />
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifierRef}
              firebaseConfig={firebaseConfig}
            />
            <View
              style={{
                marginTop: ScreenHeight * 0.1,
                marginBottom: ScreenHeight * 0.05,
              }}
            >
              <PhoneInputField
                label="電話號碼"
                icon={PhoneIcon}
                defaultValue={phoneNumber}
                setCountryCode={(countryCode) => setCountryCode(countryCode)}
                setPhoneNumber={(phoneNumber) => setPhoneNumber(phoneNumber)}
                hideEmbeddedErrorMessage={true}
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
              <RoundButton title={"提取驗證碼"} onPress={handleVerification} />
            </View>
            <View style={styles.registrationNav}>
              <Text style={styles.registrationNavText}>未有用戶? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text
                  style={[styles.registrationNavText, { color: "#FFFFFF" }]}
                >
                  登記
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradientBackground>
      <Modal
        isVisible={isVerficationModalShown}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        backdropOpacity={0.5}
        onBackdropPress={() => setVerifcationModalState(false)}
      >
        <VerificationInput
          confirmationResult={confirmationResult}
          setVerifcationModalState={setVerifcationModalState}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: ScreenHeight * 0.15,
    marginHorizontal: ScreenWidth * 0.15,
  },
  registrationNav: {
    flexDirection: "row",
    marginTop: ScreenHeight * 0.02,
    alignSelf: "center",
  },
  registrationNavText: {
    fontSize: FontScale * 18,

    color: "#24559E",
  },
});
