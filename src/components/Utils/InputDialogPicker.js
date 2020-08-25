import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InputFieldWrapper } from "./InputFieldWrapper";
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from "react-native-responsive-screen";

export const InputDialogPicker = ({
    containerStyle,
    label,
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
            <InputFieldWrapper
                label={label}
                containerStyle={containerStyle}
                icon={icon}
                formikKey={formikKey}
                formikProps={formikProps}
                hideEmbeddedErrorMessage={hideEmbeddedErrorMessage}
            >
                <TouchableOpacity onPress={showDialog}>
                    <View
                        style={{
                            justifyContent: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.4)",
                            height: heightPercentageToDP("7%"),
                            borderRadius: heightPercentageToDP("3.5%"),
                            overflow: "hidden",
                        }}
                    >
                        <Text style={styles.text}>
                            {value === ""
                                ? placeholder
                                : list
                                ? list.find((data) => data.value === value)
                                      .label
                                : null}
                        </Text>
                    </View>
                </TouchableOpacity>
            </InputFieldWrapper>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        paddingHorizontal: "10%",
        color: "#FFFFFF",
        textAlignVertical: "center",
        textAlign: "center",
    },
});
