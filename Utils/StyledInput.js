import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { FontScale } from "../constant/Constant";
import { StyledInputWrapper } from "./StyledInputWrapper";

export const StyledInput = ({
    containerStyle,
    inputFieldStyle,
    placeholder,
    icon,
    defaultValue,
    setValue,
    formikProps,
    formikKey,
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
            <TextInput
                style={[styles.textInputField, inputFieldStyle]}
                placeholder={placeholder}
                placeholderTextColor={"white"}
                defaultValue={formikProps ? null : defaultValue}
                onChangeText={
                    formikProps && formikKey
                        ? formikProps.handleChange(formikKey)
                        : (value) => {
                              setValue(value);
                          }
                }
                {...rest}
            />
        </StyledInputWrapper>
    );
};

const styles = StyleSheet.create({
    textInputField: {
        flex: 5,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18,
        color: "#fff",
    },
});
