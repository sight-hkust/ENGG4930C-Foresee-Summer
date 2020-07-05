import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  ScreenHeight,
  ScreenWidth,
  FontScale,
} from "../../../constant/Constant";
import moment from "moment";
import { InputFieldWrapper } from "./InputFieldWrapper";

export const InputDatePickerModal = ({
  containerStyle,
  placeholder,
  icon,
  label,
  formikKey,
  formikProps,
  showDatePicker,
  value,
  hideEmbeddedErrorMessage,
  ...rest
}) => {
  return (
    <InputFieldWrapper
      containerStyle={containerStyle}
      icon={icon}
      label={"出生日期"}
      formikKey={formikKey}
      formikProps={formikProps}
      hideEmbeddedErrorMessage={hideEmbeddedErrorMessage}
    >
      <Text style={styles.textField} onPress={() => showDatePicker()} {...rest}>
        {value == "" ? "" : moment(value).format("YYYY-MM-DD")}
      </Text>
    </InputFieldWrapper>
  );
};

const styles = StyleSheet.create({
  textField: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    height: ScreenHeight * 0.065,
    borderRadius: ScreenHeight * 0.035,
    width: "100%",
    paddingHorizontal: "10%",
    fontSize:  18,
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
