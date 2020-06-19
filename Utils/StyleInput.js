import React from "react";
import { ScreenHeight, ScreenWidth, FontScale } from "../constant/Constant"
import TextFieldBorder from '../assets/images/TextFieldBorder.png'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
const { View, TextInput, StyleSheet, ImageBackground } = require("react-native")


const iconDefault = <MaterialCommunityIcon name='eye' size={30} color={'white'} />

export const StyledInput = ({ placeholder, icon, defaultValue, setValue }) => {
    return (
        <>
            <ImageBackground
                source={TextFieldBorder}
                style={styles.textFieldBorder}
                resizeMethod="resize"
                resizeMode="contain">
                <View style={styles.textInputContainer}>
                    <View style={styles.textInputIcon}>
                        {icon === undefined ? iconDefault : icon}
                    </View>
                    <TextInput style={styles.textInputField}
                        placeholder={placeholder}
                        placeholderTextColor={'white'}
                        defaultValue={defaultValue}
                        onChangeText={value => setValue(value)}
                    />

                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    textFieldBorder: {
        width: ScreenWidth * 0.6,
        height: ScreenHeight * 0.1,
        marginBottom: ScreenHeight * 0.02
    },
    textInputContainer: {
        flexDirection: "row",
        borderColor: '#FFFFFF',
        /* borderBottomWidth: 1,
        borderRightWidth: 0.5, */
        paddingBottom: ScreenHeight * 0.01,
        marginBottom: ScreenHeight * 0.05,
    },
    textInputIcon: {
        flex: 2,
        alignItems: 'center',
    },
    textInputField: {
        flex: 5,
        textAlignVertical: 'center',
        fontSize: FontScale * 20,
        color: "#fff",
        fontFamily: 'Roboto',
    },
})