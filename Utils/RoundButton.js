import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ScreenHeight, FontScale, Scale, ScreenWidth } from "../constant/Constant";
import { Icon } from "react-native-elements";

export const RoundButton = ({ title, icon, onPress, containerStyle, buttonStyle, type = "normal", ...props }) => {
  return (
    <TouchableOpacity style={[{ zIndex: 2 }, containerStyle]} onPress={onPress}>
      <View style={[type === "normal" ? styles.normalButton : styles.outlineButton, { ...props.buttonStyle }, buttonStyle]}>
        {icon === undefined ? (
          <Text style={[type === "normal" ? styles.submitButtonText : styles.outlineButtonText, { ...props.textStyle }]}>{title}</Text>
        ) : (
          <Icon name={icon.name} size={icon.size} type={icon.type} color={icon.color} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  normalButton: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: ScreenHeight * 0.03,
    width: "80%",
    height: ScreenHeight * 0.06,
    alignSelf: "center",
    elevation: 4,
  },
  outlineButton: {
    justifyContent: "center",
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: Scale * 0.5,
    borderRadius: ScreenHeight * 0.1,
    height: ScreenHeight * 0.06,
    width: ScreenWidth * 0.2,
    alignSelf: "center",
  },
  submitButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#2D9CDB",
    fontSize: 20,
  },
  outlineButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 20,
  },
});
