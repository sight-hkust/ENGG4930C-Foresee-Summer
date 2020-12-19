import React, {useState} from "react";
import {StyleSheet, Text, View, Alert} from "react-native";
import {LinearGradientBackground} from "../Utils/LinearGradientBackground";
import {InputTextField} from "../Utils/InputTextField";
import {Icon} from "react-native-elements";
import {auth} from "../../config/config";
import {RoundButton} from "../../../Utils/RoundButton";
import {KeyIcon, MailIcon} from "../Utils/Icons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

import i18n from 'i18n-js';
import {useLocalization} from "../../strings/Strings";

export const ForgetPassword = ({route, navigation}) => {
    useLocalization();
    const [sendMailSuccess, setSendMailSuccess] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");

    return (
        <LinearGradientBackground>
            <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
                {!sendMailSuccess ? (
                    <>
                        <Text style={styles.title}>{i18n.t('forgetPassword1')}</Text>
                        <InputTextField
                            label={i18n.t('forgetPassword2')}
                            icon={MailIcon}
                            containerStyle={{width: "85%"}}
                            onChangeText={(e) => {
                                setEmailAddress(e);
                            }}
                        />
                        <RoundButton
                            title={i18n.t('forgetPassword3')}
                            containerStyle={{width: "50%"}}
                            onPress={() => {
                                auth
                                    .sendPasswordResetEmail(emailAddress)
                                    .then(function () {
                                        setSendMailSuccess(true);
                                    })
                                    .catch(function (error) {
                                        let alertMsg = "";
                                        switch (error.toString()) {
                                            case "Error: The email address is badly formatted.":
                                                alertMsg = i18n.t('forgetPassword4');
                                                break;
                                            case "Error: There is no user record corresponding to this identifier. The user may have been deleted.":
                                                alertMsg = i18n.t('forgetPassword5');
                                                break;
                                            default:
                                                alertMsg = error.toString();
                                        }
                                        Alert.alert(alertMsg);
                                    });
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Icon size={40} type="material-icon" name="done" color="rgb(146, 255, 177)" containerStyle={{
                            borderWidth: 4,
                            borderRadius: 100,
                            borderColor: "rgb(146, 255, 177)",
                            marginBottom: hp("2%")
                        }}/>
                        <Text style={styles.title}>{i18n.t('forgetPassword6')}</Text>
                        <Text style={styles.title}>{i18n.t('forgetPassword7')}</Text>
                        <RoundButton
                            title={i18n.t('forgetPassword8')}
                            containerStyle={{width: "50%", marginTop: hp("2%")}}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    </>
                )}
            </View>
        </LinearGradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: hp("3%"),
        color: "#fff",
        marginVertical: hp("2%"),
    },
});
