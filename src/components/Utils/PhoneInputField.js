import React, { useState, useEffect } from "react";

import { InputFieldWrapper } from "./InputFieldWrapper";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  ScreenHeight,
  FontScale,
  ScreenWidth,
} from "../../../constant/Constant";
import data from "../Utils/countryTelCodes";
import { Icon } from "react-native-elements";
import Modal from "react-native-modal";

export const PhoneInputField = ({
  contianerStyle,
  placeholder,
  textInputStyle,
  icon,
  label,
  formikProps,
  formikKey,
  defaultValue,
  setCountryCode,
  setPhoneNumber,
  hideEmbbededMessage,
  ...rest
}) => {
  const defaultCountry = data.filter((object) => object.name === "香港")[0];
  const defaultFlag = defaultCountry.flag;
  const defaultDialCode = defaultCountry.dial_code;
  const countryData = data;
  const [flag, setFlag] = useState(defaultFlag);
  const [dialCode, setDialCode] = useState(defaultDialCode);
  const [isModalShown, setModalState] = useState(false);

  const _showModal = () => {
    setModalState(true);
  };

  const _hideModal = () => {
    setModalState(false);
  };

  const selectCountry = (countryName) => {
    const countrySelected = countryData.filter(
      (object) => object.name === countryName
    )[0];
    formikProps
      ? formikProps.setFieldValue("tel_country_code", countrySelected.dial_code)
      : setCountryCode(countrySelected.dial_code);
    setDialCode(countrySelected.dial_code);
    setFlag(countrySelected.flag);
    _hideModal();
  };

  return (
    <>
      <InputFieldWrapper
        contianerStyle={contianerStyle}
        icon={icon}
        formikKey={formikKey}
        formikProps={formikProps}
        label={label}
        hideEmbbededMessage={hideEmbbededMessage}
      >
        <View style={styles.phoneInputFieldContainer}>
          <TouchableOpacity style={styles.button} onPress={_showModal}>
            <Text style={styles.region}>{flag} </Text>
            <Icon name="caretdown" type="antdesign" color="black" size={12} />
          </TouchableOpacity>
          <TextInput
            style={[styles.textinput, textInputStyle]}
            placeholder={placeholder}
            defaultValue={formikProps ? null : defaultValue}
            onChangeText={
              formikProps && formikKey
                ? formikProps.handleChange(formikKey)
                : (value) => {
                    setPhoneNumber(value);
                  }
            }
            selectionColor={"white"}
            {...rest}
          />
        </View>
      </InputFieldWrapper>
      <Modal isVisible={isModalShown} onBackdropPress={_hideModal}>
        <View
          style={{
            flex: 1,
            marginHorizontal: ScreenWidth * 0.05,
            marginVertical: ScreenHeight * 0.15,
          }}
        >
          <View style={styles.listContainer}>
            <FlatList
              ItemSeparatorComponent={({ highlighted }) => (
                <View
                  style={[styles.separator, highlighted && { marginLeft: 0 }]}
                />
              )}
              data={countryData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      selectCountry(item.name);
                    }}
                  >
                    <View style={styles.listItem}>
                      <Text style={styles.listItemFlag}>{item.flag}</Text>
                      <Text style={styles.listItemText}>
                        {item.name} ({item.dial_code})
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  phoneInputFieldContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    height: ScreenHeight * 0.065,
    borderRadius: ScreenHeight * 0.035,
    paddingHorizontal: "7%",
  },
  separator: { borderBottomWidth: 0.37, borderBottomColor: "#00000070" },
  button: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  region: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  textinput: {
    flex: 3.3,
    fontSize: 20,
    color: "#FFFFFF",
    textAlignVertical: "center",
  },
  listContainer: {
    backgroundColor: "#FFFFFF",
  },
  listItem: { flex: 1, flexDirection: "row", height: ScreenHeight * 0.1 },
  listItemFlag: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  listItemText: {
    flex: 3,
    fontSize:  20,
    textAlign: "left",
    textAlignVertical: "center",
  },
});
