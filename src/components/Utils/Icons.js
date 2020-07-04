import React from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Icon } from "react-native-elements";
import { FontScale } from "../../../constant/Constant";
const MailIcon = (
  <Icon
    name="email-outline"
    type="material-community"
    color="#FFFFFF"
    size={34}
  />
);
const KeyIcon = (
  <Icon name="key" type="feather" color="#FFFFFF" size={FontScale * 30} />
);
const PhoneIcon = (
  <Icon name="phone" type="feather" color="#FFFFFF" size={FontScale * 30} />
);
const ScanQRIcon = ({ color, size }) => {
  return (
    <MaterialCommunityIcon
      name="qrcode-scan"
      color={color}
      size={FontScale * 25}
    />
  );
};

export { MailIcon, KeyIcon, PhoneIcon };
