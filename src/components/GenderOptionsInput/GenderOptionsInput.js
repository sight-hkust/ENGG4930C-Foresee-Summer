import React, { useState } from "react";
import { InputFieldWrapper } from "../Utils/InputFieldWrapper";
import { ButtonGroup } from "react-native-elements";
import { ScreenHeight, ScreenWidth } from "../../../constant/Constant";
import { GenderIcon } from "../Icons";

import i18n from 'i18n-js';
import {useLocalization} from "../../strings/Strings";

const GenderOptionsInput = ({ containerStyle, iconStyle, labelContainerStyle, hideEmbbededMessage, icon, label, formikKey, formikProps }) => {
  useLocalization();
  const [selectedGenderIndex, setSelectedGenderIndex] = useState(0);
  const genderOptions = [i18n.t('gender1'), i18n.t('gender2')];
  const updateSelectedGenderIndex = (selectedIndex) => {
    formikProps.setFieldValue("gender", selectedIndex == 0 ? "M" : "F");
    setSelectedGenderIndex(selectedIndex);
  };

  return (
    <InputFieldWrapper
      containerStyle={containerStyle}
      labelContainerStyle={labelContainerStyle}
      iconStyle={iconStyle}
      icon={<GenderIcon />}
      label={label}
      hideEmbbededMessage={hideEmbbededMessage}
      formikKey={formikKey}
      formikProps={formikProps}
    >
      <ButtonGroup
        onPress={updateSelectedGenderIndex}
        selectedIndex={selectedGenderIndex}
        buttons={genderOptions}
        selectedButtonStyle={{
          borderWidth: 0,
        }}
        innerBorderStyle={{
          width: 0,
        }}
        selectedButtonStyle={{
          borderWidth: 0,
        }}
        textStyle={{
          fontSize: ScreenHeight * 0.025,
          color: "#FFFFFF",
        }}
        containerStyle={{
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          height: ScreenHeight * 0.07,
          borderRadius: ScreenHeight * 0.035,
          borderWidth: 0,
          width: ScreenWidth * 0.78,
          marginHorizontal: ScreenWidth * 0.5,
        }}
      />
    </InputFieldWrapper>
  );
};

export default GenderOptionsInput;
