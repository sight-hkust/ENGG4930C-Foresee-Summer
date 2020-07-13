import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InputFieldWrapper } from "./InputFieldWrapper";
import { FontScale, ScreenHeight } from "../../../constant/Constant";

export const InputDialogPicker = ({
  containerStyle,
  label,
  placeholder,
  icon,
  formikKey,
  formikProps,
  showDialog,
  handleDialogOption,
  value,
  list,
  hideEmbeddedErrorMessage,
  ...rest
}) => {
  return (
    <>
      <InputFieldWrapper
        label={label}
        containerStyle={containerStyle}
        icon={icon}
        formikKey={formikKey}
        formikProps={formikProps}
        hideEmbeddedErrorMessage={hideEmbeddedErrorMessage}
      >
        <TouchableOpacity onPress={showDialog}>
          <Text style={styles.text}>
            {value === ""
              ? placeholder
              : list
              ? list.find((data) => data.value === value).label
              : null}
          </Text>
        </TouchableOpacity>
      </InputFieldWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    height: ScreenHeight * 0.065,
    borderRadius: ScreenHeight * 0.035,
    fontSize:20,
    paddingHorizontal: "10%",
    color: "#FFFFFF",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
