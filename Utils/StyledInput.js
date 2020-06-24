import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { FontScale } from "../constant/Constant"
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
    hideDefaultErrorMessage,
    ...rest }) => {
    return (
        <StyledInputWrapper
            containerStyle={containerStyle}
            icon={icon}
            formikKey={formikKey}
            formikProps={formikProps}
            hideDefaultErrorMessage={hideDefaultErrorMessage}
        >
            <TextInput style={[styles.textInputField, inputFieldStyle]}
                placeholder={placeholder}
                placeholderTextColor={'white'}
                defaultValue={formikProps ? null : defaultValue}
                onChangeText={formikProps && formikKey ? formikProps.handleChange(formikKey) : (value => { setValue(value) })}
                {...rest}
            />
        </StyledInputWrapper>
    )
}




const styles = StyleSheet.create({
    textInputField: {
        flex: 6,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: FontScale * 18,
        color: "#fff",
        fontFamily: 'Roboto',
    },
})