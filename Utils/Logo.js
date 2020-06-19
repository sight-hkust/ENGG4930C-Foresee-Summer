import React from "react";
import icon from "../assets/images/icon.png";
import { Image, View, Text } from "react-native"
import { StyleSheet } from "react-native";
import { ScreenWidth, ScreenHeight, FontScale } from '../constant/Constant';

export const Logo = ({ style }) => {
    return (
        <View style={[styles.logoContainer, style]}>
            <Image style={styles.icon} source={icon} resizeMode='contain' />
            <Text style={styles.logoText}>ForeSEE</Text>
        </View>)
}


const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: "row",
        height: ScreenHeight * 0.225,
        width: ScreenWidth * 0.55,
        alignSelf: 'center'
    },
    logoText: {
        color: 'white',
        fontWeight: "700",
        textAlignVertical: 'center',
        fontSize: FontScale * 20,
        left: ScreenWidth * 0.03,
        flex: 4
    },
    icon: {
        flex: 3,
        height: '100%',
    }
})


export default Logo;

