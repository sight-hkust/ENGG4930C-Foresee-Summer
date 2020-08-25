import React from "react";
import { ScreenHeight, ScreenWidth, FontScale } from "../constant/Constant";
const { View, Text, StyleSheet } = require("react-native");

export const StyledInputWrapper = ({
    containerStyle,
    icon,
    children,
    formikProps,
    formikKey,
    hideEmbeddedErrorMessage,
}) => {
    return (
        <View
            style={[
                styles.content,
                hideEmbeddedErrorMessage
                    ? { height: ScreenHeight * 0.07 }
                    : { height: ScreenHeight * 0.1 },
                containerStyle,
            ]}
        >
            <View style={styles.textInputBorder}>
                <View style={styles.textInputContainer}>
                    {icon == null ? (
                        <View />
                    ) : (
                        <View style={styles.textInputIcon}>{icon}</View>
                    )}
                    {children}
                </View>
                <View style={{ flex: 1, alignContent: "space-around" }}>
                    <View style={{ flex: 1 }}></View>
                    <View
                        style={{
                            flex: 1,
                            borderRightColor: "#FFFFFF",
                            borderRightWidth: 1,
                        }}
                    ></View>
                </View>
            </View>
            {!hideEmbeddedErrorMessage && (
                <View style={styles.errorMessageContainer}>
                    <Text style={styles.errorMessage}>
                        {formikProps && formikProps.errors[formikKey]
                            ? "* " + formikProps.errors[formikKey]
                            : null}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        marginHorizontal: ScreenWidth * 0.007,
        margin: ScreenHeight * 0.005,
    },
    textInputBorder: {
        flex: 2,
        flexDirection: "row",
        borderColor: "#FFFFFF",
        borderBottomWidth: 1,
        paddingLeft: ScreenWidth * 0.01,
    },
    textInputContainer: {
        flex: 50,
        flexDirection: "row",
        paddingBottom: ScreenHeight * 0.01,
    },
    textInputIcon: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
    },
    errorMessageContainer: {
        flex: 1,
    },
    errorMessage: {
        paddingTop: ScreenWidth * 0.01,
        paddingLeft: ScreenWidth * 0.08,
        textAlign: "left",
        fontSize: 15,
        fontWeight: "700",
        color: "#FFFFFF",
        flexWrap: "wrap",
    },
});
