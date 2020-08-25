import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
    ScreenHeight,
    FontScale,
    ScreenWidth,
} from "../../../../constant/Constant";
import { LinearGradientBackground } from "../../Utils/LinearGradientBackground";
import Logo from "../../Utils/Logo";
import { RoundButton } from "../../../../Utils/RoundButton";

const test = async () => {
    return await nanoid();
};

export const LinkExistingUserInfo = ({ navigation }) => {
    return (
        <LinearGradientBackground>
            <View style={styles.content}>
                <Logo />
                <View style={styles.optionsContainer}>
                    <Text style={styles.title}>是否已登記用戶?</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: ScreenWidth * 0.12,
                            width: "100%",
                            paddingHorizontal: ScreenWidth * 0.2,
                            alignContent: "space-between",
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <RoundButton
                                onPress={() =>
                                    navigation.navigate(
                                        "Register With Phone Number",
                                        {
                                            isProfessional: true,
                                        }
                                    )
                                }
                                buttonStyle={{
                                    width: ScreenWidth * 0.15,
                                    height: ScreenWidth * 0.15,
                                    borderRadius: ScreenWidth * 0.075,
                                }}
                                type="outline"
                                icon={{
                                    name: "check",
                                    type: "feather",
                                    color: "white",
                                }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <RoundButton
                                onPress={() =>
                                    navigation.navigate("Registration Form", {
                                        isProfessional: false,
                                    })
                                }
                                buttonStyle={{
                                    width: ScreenWidth * 0.15,
                                    height: ScreenWidth * 0.15,
                                    borderRadius: ScreenWidth * 0.075,
                                }}
                                type="outline"
                                icon={{
                                    name: "close",
                                    type: "ant",
                                    color: "white",
                                }}
                            />
                        </View>
                    </View>
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
    },
    title: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 25,
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
        fontSize: 18,
    },
});
