import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeLanguageAction } from "../../reducers/language";
import RNPickerSelect from "react-native-picker-select";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Platform } from "react-native";

function LanguageSelector({ navigation, lang, changeLang }) {
  const [selectedLanguage, setSelectedLanguage] = useState(lang);

  return (
    <>
      <RNPickerSelect
        value={selectedLanguage}
        style={{ inputAndroid: { height: hp("5%"), fontSize: hp("1.5%"), width: wp("30%") }, inputIOS: { height: hp("5%"), fontSize: hp("1.5%"), width: wp("30%") } }}
        onValueChange={(itemValue) => {
          setSelectedLanguage(itemValue != null ? itemValue : "zh");
          if (Platform.OS === "android") {
            changeLanguageAction(itemValue != null ? itemValue : "zh");
            navigation.navigate("Splash");
          }
        }}
        onDonePress={(itemValue) => {
          setSelectedLanguage(selectedLanguage != null ? selectedLanguage : "zh");
          changeLanguageAction(selectedLanguage != null ? selectedLanguage : "zh");
          navigation.navigate("Splash");
        }}
        items={[
          { label: "English", value: "en" },
          { label: "繁體中文", value: "zh" },
        ]}
      />
    </>
  );
}

function mapState(state) {
  const { currentLanguage } = state.languageReducer;
  return { currentLanguage };
}

const actionCreators = {
  changeLanguageAction: changeLanguageAction.changeLanguageAction,
};

export default connect(mapState, actionCreators)(LanguageSelector);
