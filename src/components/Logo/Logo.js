import React from "react";
import icon from "../../../assets/images/icon.png";
import { Image, View, Text } from "react-native"
import { styles } from "./styles";

function Logo(props) {
    return (
        <View style={styles.logoContainer}>
            <Image style={styles.icon} source={icon} resizeMode='contain' />
            <Text style={styles.logoText}>ForeSEE</Text>
        </View>)
}


export default Logo;

