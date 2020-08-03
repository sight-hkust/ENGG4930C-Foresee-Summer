import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ModalBox from "react-native-modalbox";
import { ScreenHeight } from "../../constant/Constant";

const BottomModalBox = ({
  isOpen,
  onClosed,
  modalContainerStyle,
  children,
}) => {
  return (
    <ModalBox
      isOpen={isOpen}
      coverScreen={true}
      backdrop={true}
      backdropOpacity={0.5}
      backdropPressToClose={true}
      position={"bottom"}
      onClosed={onClosed}
      style={[BottomModalBoxStyles.modal, modalContainerStyle]}
    >
      <View
        style={{
          alignSelf: "center",
          width: "30%",
          height: ScreenHeight * 0.004,
          borderRadius: ScreenHeight * 0.002,
          marginBottom: ScreenHeight * 0.015,
          backgroundColor: "#1772A6",
        }}
      />
      {children}
    </ModalBox>
  );
};

export default BottomModalBox;
const BottomModalBoxStyles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: ScreenHeight * 0.5,
    borderTopLeftRadius: ScreenHeight * 0.05,
    borderTopRightRadius: ScreenHeight * 0.05,
    paddingTop: ScreenHeight * 0.05,
  },
});
