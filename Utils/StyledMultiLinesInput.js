import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import {
    ScreenHeight,
    Scale,
    FontScale,
    ScreenWidth,
} from "../constant/Constant";

export const StyledMultiLinesInput = ({
    icon,
    label,
    formikKey,
    formikProps,
}) => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: ScreenHeight * 0.01,
                }}
            >
                <View style={{ flex: 1, alignItems: "center" }}>{icon}</View>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TextInput
                style={styles.inputField}
                textAlignVertical={"top"}
                multiline
                onChangeText={formikProps.handleChange(formikKey)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: ScreenHeight * 0.45,
        marginHorizontal: ScreenWidth * 0.007,
        marginBottom: ScreenHeight * 0.05,
    },
    label: {
        flex: 4,
        fontSize: 18,
        color: "#fff",

        textAlignVertical: "center",
    },
    inputField: {
        flex: 3,
        borderRadius: ScreenHeight * 0.02,
        borderWidth: 1,
        borderColor: "white",
        padding: ScreenHeight * 0.02,

        color: "#fff",
        fontSize: 16,
    },
});
