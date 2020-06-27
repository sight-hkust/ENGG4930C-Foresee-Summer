import React from "react";
import QRCode from 'react-native-qrcode-svg';
import { ScreenWidth } from "../../constant/Constant";
import { View } from "react-native";
export const QRCodeImage = ({ value, size, ...props }) => {
    return (<View><QRCode
        value={value}
        size={ScreenWidth * 0.7}
        backgroundColor='transparent'
    /></View>)
}