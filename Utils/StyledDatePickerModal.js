import React from "react";
import { StyleSheet, Text } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenHeight, ScreenWidth, FontScale } from "../constant/Constant";
import { StyledInputWrapper } from "./StyledInputWrapper";
import moment from "moment";

const iconDefault = (
    <MaterialCommunityIcon name="eye" size={30} color={"white"} />
);

export const StyledDatePickerModal = ({
    containerStyle,
    placeholder,
    icon,
    formikKey,
    formikProps,
    showDatePicker,
    value,
    hideEmbeddedErrorMessage,
    ...rest
}) => {
    return (
        <StyledInputWrapper
            containerStyle={containerStyle}
            icon={icon}
            formikKey={formikKey}
            formikProps={formikProps}
            hideEmbeddedErrorMessage={hideEmbeddedErrorMessage}
        >
            <Text
                style={styles.textField}
                onPress={() => showDatePicker()}
                {...rest}
            >
                {value == "" ? "出生日期" : moment(value).format("YYYY-MM-DD")}
            </Text>
        </StyledInputWrapper>
    );
};

const styles = StyleSheet.create({
    textField: {
        flex: 5,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18,
        color: "#fff",

        paddingRight: ScreenWidth * 0.02,
        /* marginTop: ScreenHeight * 0.01,
        paddingHorizontal: ScreenWidth * 0.02,
        borderWidth: 0.7,
        borderColor: 'grey',
        height: 40,
        borderRadius: 3,
        textAlignVertical: 'center' */
    },
});
