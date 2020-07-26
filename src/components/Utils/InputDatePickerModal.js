import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import { InputFieldWrapper } from "./InputFieldWrapper";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { View } from "react-native-animatable";

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
      showDatePicker
    >
      <TouchableOpacity onPress={() => showDatePicker()}>
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            height: heightPercentageToDP("7%"),
            borderRadius: heightPercentageToDP("3.5%"),
            marginHorizontal: "3%",
          }}
        >
          <Text style={styles.textField} textAlignVertical="center" {...rest}>
            {value == "" ? "" : moment(value).format("YYYY-MM-DD")}
          </Text>
        </View>
      </TouchableOpacity>
    </InputFieldWrapper>
  );
};

const styles = StyleSheet.create({
  textField: {
    overflow: "hidden",
    paddingHorizontal: "10%",
    width: "100%",
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
