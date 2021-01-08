import * as Localization from "expo-localization";
import i18n from "i18n-js";

const DEFAULT_LANG = Localization.locale;
const CHANGE_LANG = "CHANGE_LANG";

//en: en-HK
//hk: zh-Hant-HK

const initialState = {
  currentLanguage: DEFAULT_LANG,
};

export const changeLanguageAction = (lang) => {
  return (dispatch) => {
    i18n.locale = lang;
    dispatch({ type: CHANGE_LANG, payload: lang });
  };
};

export const languageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_LANG:
      return {
        ...state,
        currentLanguage: payload,
      };
    default:
      return state;
  }
};
