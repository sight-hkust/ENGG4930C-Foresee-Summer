import React from "react";
import { ScreenHeight, ScreenWidth, FontScale } from "../constant/Constant"
import TextFieldBorder from '../assets/images/TextFieldBorder.png'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AppColors from "../Styles/colors";
const { View, TextInput, StyleSheet, ImageBackground, Text } = require("react-native")


const iconDefault = <MaterialCommunityIcon name='eye' size={30} color={'white'} />

export const StyledInput = ({
    containerStyle,
    placeholder,
    icon,
    defaultValue,
    setValue,
    formikProps,
    formikKey,
    ...rest }) => {
    return (
        <>
            <ImageBackground
                source={TextFieldBorder}
                style={[styles.textFieldBorder, containerStyle]}
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
                        onChangeText={value => { formikProps && formikKey ? formikProps.handleChange(formikKey) : setValue(value) }}
                        {...rest}
                    />
                </View>
                <Text style={styles.errorMessage}>
                    {formikProps && formikProps.errors[formikKey] ? '* ' + formikProps.errors[formikKey] : null}
                </Text>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    textFieldBorder: {
        width: ScreenWidth * 0.7,
        height: ScreenHeight * 0.1,
        marginBottom: ScreenHeight * 0.02
    },
    textInputContainer: {
        flexDirection: "row",
        borderColor: '#FFFFFF',
        paddingBottom: ScreenHeight * 0.01,
    },
    textInputIcon: {
        flex: 1,
        alignItems: 'center',
    },
    textInputField: {
        flex: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: FontScale * 18,
        color: "#fff",
        fontFamily: 'Roboto',
        paddingRight: ScreenWidth * 0.02,
    },
    errorMessage: {
        paddingTop: ScreenWidth * 0.01,
        paddingLeft: ScreenWidth * 0.08,
        textAlign: 'center',
        fontSize: FontScale * 15,
        fontWeight: '700',
        color: '#FFFFFF'
    }
})