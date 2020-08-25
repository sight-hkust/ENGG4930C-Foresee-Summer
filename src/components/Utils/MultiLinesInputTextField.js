import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { InputFieldWrapper } from "./InputFieldWrapper";

export const MultiLinesInputTextField = ({
    icon,
    label,
    formikKey,
    formikProps,
    contianerStyle,
    iconStyle,
    labelContainerStyle,
    hideEmbbededMessage,
}) => {
    return (
        <InputFieldWrapper
            contianerStyle={contianerStyle}
            icon={icon}
            iconStyle={iconStyle}
            labelContainerStyle={labelContainerStyle}
            formikKey={formikKey}
            formikProps={formikProps}
            label={label}
            hideEmbbededMessage={hideEmbbededMessage}
        >
            <TextInput
                style={styles.inputField}
                textAlignVertical={"top"}
                paddingVertical={"5%"}
                paddingHorizontal={"5%"}
                multiline
                selectionColor={"white"}
                onChangeText={formikProps.handleChange(formikKey)}
            />
        </InputFieldWrapper>
    );
};

const styles = StyleSheet.create({
    inputField: {
        borderRadius: hp("2%"),
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        marginHorizontal: wp("2%"),
        minHeight: hp("30%"),
        fontSize: 20,
    },
});
