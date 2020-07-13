import React from "react";

import { InputFieldWrapper } from "./InputFieldWrapper";
import { TextInput, StyleSheet } from "react-native";
import { ScreenHeight, FontScale } from "../../../constant/Constant";
import jsonPathToValue from "../../helpers/jsonPathToValue";

export const InputTextField = ({
  contianerStyle,
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
        textContentType="telephoneNumber"
        {...rest}
      />
    </InputFieldWrapper>
  );
};

const styles = StyleSheet.create({
  textinput: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    height: ScreenHeight * 0.065,
    borderRadius: ScreenHeight * 0.035,
    width: "100%",
    paddingHorizontal: "10%",
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
