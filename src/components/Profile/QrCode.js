import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { auth } from "../../config/config";
import { useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { ScreenHeight, ScreenWidth, FontScale } from "../../../constant/Constant";
import { RoundButton } from "../../../Utils/RoundButton";
import MenuScreen from "../../../Utils/MenuScreen";

export default function QrCode({ navigation, route }) {
  console.log("qr code route: ", route.params.id);
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <MenuScreen>
      <View
        style={{
          paddingVertical: "2%",
          margin: ScreenHeight * 0.05,
          borderRadius: ScreenWidth * 0.02,
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <QRCode
          value={route.params.id} //get child account uid as well!, pass in user id
          size={ScreenWidth * 0.75}
          logoBackgroundColor="transparent"
          backgroundColor="transparent"
        />
      </View>
      <View style={{ flex: 1, paddingVertical: "2%" }}>
        <Text
          style={{
            fontSize: FontScale * 25,
            color: "#FFFFFF",
            textAlignVertical: "center",
            textAlign: "center",
            marginBottom: "5%",
          }}
        >
          {"請讓眼科醫生/視光師\n掃描QR Code以進行配對"}
        </Text>
        <RoundButton title="返回" onPress={() => navigation.goBack()} />
      </View>
    </MenuScreen>
  );
}
