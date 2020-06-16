import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Styles } from "../../../../Styles/styles";
import AppColors from '../../../../Styles/colors';
import moment from 'moment';


const FieldWrapper = ({ textWrapperStyle = {}, children, label, formikKey, formikProps, }) => {
    return (
        <View style={[Styles.formFieldWrapper, textWrapperStyle]}>
            <Text>{label}</Text>
            {children}
            <Text style={{ color: AppColors.errorMessage }}>
                {formikProps.errors[formikKey]}
            </Text>
        </View>
    )
}

const StyledInput = ({ textWrapperStyle, label, formikKey, formikProps, ...rest }) => {
    return (
        <FieldWrapper textWrapperStyle={textWrapperStyle} label={label} formikKey={formikKey} formikProps={formikProps}>
            <TextInput
                style={Styles.formTextInput}
                onChangeText={formikProps.handleChange(formikKey)}
                onBlur={formikProps.handleBlur(formikKey)}
                {...rest}
            />
        </FieldWrapper>
    )
}

const StyledInputArea = ({ textWrapperStyle, label, formikKey, formikProps, ...rest }) => {

    return (
        <FieldWrapper textWrapperStyle={textWrapperStyle} label={label} formikKey={formikKey} formikProps={formikProps}>
            <TextInput
                style={Styles.formTextInputArea}
                onChangeText={formikProps.handleChange(formikKey)}
                onBlur={formikProps.handleBlur(formikKey)}
                {...rest}

            />
        </FieldWrapper>
    )
}

const StyledDatePicker = ({ textWrapperStyle, value, showDatePicker, label, formikKey, formikProps }) => {
    return (
        <FieldWrapper textWrapperStyle={textWrapperStyle} label={label} formikKey={formikKey} formikProps={formikProps}>
            <Text
                style={[Styles.formTextInput, { textAlignVertical: 'center' }]}
                onPress={() => showDatePicker()}>
                {moment(value).format('YYYY-MM-DD')}
            </Text>
        </FieldWrapper >
    )
}

export {StyledInput, StyledInputArea, StyledDatePicker}