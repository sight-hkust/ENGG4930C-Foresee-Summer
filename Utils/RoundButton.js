import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { ScreenHeight, FontScale } from '../constant/Constant';

export const RoundButton = ({ title, onPress, containerStyle, buttonStyle, ...props }) => {
    return (
        <TouchableOpacity style={[{ zIndex: 2 }, containerStyle]} onPress={onPress}>
            <View style={[{ ...styles.submitButton, ...props.buttonStyle }, buttonStyle]}>
                <Text style={{ ...styles.submitButtonText, ...props.textStyle }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitButton: {
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
        borderRadius: ScreenHeight * 0.03,
        width: '80%',
        height: ScreenHeight * 0.06,
        alignSelf: "center",
        elevation: 4,
    },
    submitButtonText: {
        textAlign: "center",
        textAlignVertical: 'center',
        color: '#2D9CDB',
        fontSize: FontScale * 20,
        fontFamily: 'Roboto',
    },
})