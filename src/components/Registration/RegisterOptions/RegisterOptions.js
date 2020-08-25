import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradientBackground } from "../../Utils/LinearGradientBackground";
import Logo from "../../Utils/Logo";
import {
    ScreenHeight,
    FontScale,
    ScreenWidth,
} from "../../../../constant/Constant";
import { heightPercentageToDP } from "react-native-responsive-screen";

export const RegisterOptions = ({ navigation }) => {
    return (
        <LinearGradientBackground>
            <View style={styles.content}>
                <Logo />
                <View style={styles.optionsContainer}>
                    <Text style={styles.title}>你的角色是什麼？</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Registration Form", {
                                isProfessional: true,
                                registerPatient: false,
                            })
                        }
                    >
                        <View
                            style={[
                                styles.button,
                                { marginTop: ScreenHeight * 0.06 },
                            ]}
                        >
                            <Text style={styles.buttonTitle}>眼科專業人員</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Registration Form", {
                                isProfessional: false,
                                registerPatient: false,
                            })
                        }
                    >
                        <View style={[styles.button]}>
                            <Text style={styles.buttonTitle}>普通用戶</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradientBackground>
    );
};

export default RegisterOptions;

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
        fontSize: 32,
        color: "white",
    },
    button: {
        margin: ScreenHeight * 0.03,
        borderColor: "white",
        borderWidth: 1,
        width: ScreenWidth * 0.6,
        borderRadius: heightPercentageToDP("7%"),
        height: heightPercentageToDP("8%"),
        shadowRadius: ScreenWidth * 0.07,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTitle: {
        color: "white",
        fontSize: 22,
    },
});
