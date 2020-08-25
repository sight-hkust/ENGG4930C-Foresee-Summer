import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
    FontScale,
    ScreenWidth,
    ScreenHeight,
} from "../../../constant/Constant";

export const InputFieldWrapper = ({
    containerStyle,
    labelContainerStyle,
    iconStyle,
    labelStyle,
    icon,
    children,
    label,
    formikProps,
    formikKey,
    hideEmbbededMessage,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.labelContainer, labelContainerStyle]}>
                <View style={[styles.icon, iconStyle]}>{icon}</View>
                <View style={{ flex: 8, justifyContent: "center" }}>
                    <Text style={[styles.label, labelStyle]}>{label}</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>{children}</View>
            {!hideEmbbededMessage &&
                formikProps &&
                formikProps.errors &&
                formikProps.errors[formikKey] && (
                    <Text style={styles.errorMessage}>
                        * {formikProps.errors[formikKey]}
                    </Text>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: "2%",
    },
    labelContainer: {
        flexDirection: "row",
        paddingLeft: "2%",
        paddingBottom: "5%",
        height: ScreenHeight * 0.08,
    },
    icon: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    label: {
        fontSize: 20,
        color: "white",
        textAlignVertical: "center",
    },
    errorMessage: {
        paddingTop: ScreenWidth * 0.01,
        paddingLeft: ScreenWidth * 0.08,
        textAlign: "left",
        fontSize: 20,
        fontWeight: "700",
        color: "#FFFD78",
        flexWrap: "wrap",
    },
});
