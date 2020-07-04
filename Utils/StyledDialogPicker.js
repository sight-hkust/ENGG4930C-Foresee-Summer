import React from 'react';
import { Picker, View, Text, StyleSheet } from 'react-native';
import { StyledInputWrapper } from './StyledInputWrapper';
import { FontScale } from '../constant/Constant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dialog, List, Portal, Provider } from 'react-native-paper';

export const StyledDialogPicker = ({
    containerStyle,
    visible,
    placeholder,
    icon,
    formikKey,
    formikProps,
    showDialog,
    handleDialogOption,
    value,
    list,
    hideEmbeddedErrorMessage,
    ...rest
}) => {
    return (
        <>
            <StyledInputWrapper
                containerStyle={containerStyle}
                icon={icon}
                formikKey={formikKey}
                formikProps={formikProps}
                hideEmbeddedErrorMessage={hideEmbeddedErrorMessage}
            >
                <View style={styles.pickerContainer}>
                    <TouchableOpacity onPress={showDialog}>
                        <Text style={styles.text}>{value === '' ?
                            placeholder : list.find(data => data.value === value).label}</Text>
                    </TouchableOpacity>
                </View>
            </StyledInputWrapper>
        </>
    )
}


const styles = StyleSheet.create({
    pickerContainer: {
        flex: 6,
        alignSelf: 'center',
    }, text: {
        textAlign: 'center',
        fontSize: FontScale * 18,
        color: "#fff",
        
    }
})