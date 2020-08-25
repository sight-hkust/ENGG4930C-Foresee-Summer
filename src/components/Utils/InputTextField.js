import React from "react";

import { InputFieldWrapper } from "./InputFieldWrapper";
import { StyleSheet } from "react-native";
import { ScreenHeight, FontScale } from "../../../constant/Constant";
import jsonPathToValue from "../../utils/jsonPathToValue";
import { Input } from "react-native-elements";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";

export const InputTextField = ({
    containerStyle,
    placeholder,
    textInputStyle,
    iconStyle,
    labelContainerStyle,
    icon,
    label,
    formikProps,
    formikKey,
    defaultValue,
    setValue,
    hideEmbbededMessage,
    ...rest
}) => {
    return (
        <InputFieldWrapper
            containerStyle={containerStyle}
            icon={icon}
            iconStyle={iconStyle}
            labelContainerStyle={labelContainerStyle}
            formikKey={formikKey}
            formikProps={formikProps}
            label={label}
            hideEmbbededMessage={hideEmbbededMessage}
        >
            {/* <TextInput
        style={[styles.textinput, textInputStyle]}
        placeholder={placeholder}
        defaultValue={
          formikProps ? formikProps.values[formikKey] : defaultValue
        }
        onChangeText={
          formikProps && formikKey
            ? formikProps.handleChange(formikKey)
            : (value) => {
                setValue(value);
              }
        }
        selectionColor={"white"}
        {...rest}
      /> */}
            <Input
                inputContainerStyle={styles.textInputContainer}
                inputStyle={styles.textInput}
                errorStyle={{ height: 0 }}
                selectionColor="white"
                defaultValue={
                    formikProps ? formikProps.values[formikKey] : defaultValue
                }
                onChangeText={
                    formikProps && formikKey
                        ? formikProps.handleChange(formikKey)
                        : (value) => {
                              setValue(value);
                          }
                }
                {...rest}
            />
        </InputFieldWrapper>
    );
};

const styles = StyleSheet.create({
    textInputContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        height: heightPercentageToDP("7%"),
        borderRadius: heightPercentageToDP("3.5%"),
        width: "100%",
        borderBottomColor: "transparent",
        overflow: "hidden",
        padding: widthPercentageToDP("1.5%"),
    },
    textInput: {
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: "center",
        textAlignVertical: "center",
        alignSelf: "center",
    },
});
