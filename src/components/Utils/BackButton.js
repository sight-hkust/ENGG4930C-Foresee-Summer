import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { ScreenWidth } from "../../../constant/Constant";

export const BackButton = ({
    size = ScreenWidth * 0.1,
    onPress = () => {},
}) => {
    return (
        <TouchableOpacity
            style={{ paddingLeft: ScreenWidth * 0.03 }}
            onPress={onPress}
        >
            <Icon name="arrow-back" color="white" size={size} type="ionicons" />
        </TouchableOpacity>
    );
};
