import * as Localization from "expo-localization";
import i18n from "i18n-js";

import en_strings from "./en";
import zh_strings from "./zh";

export function useLocalization() {
  i18n.translations = {
    en: en_strings,
    zh: zh_strings,
  };

  i18n.locale = Localization.locale;
  // When a value is missing from a language it'll fallback to another language with the key present.
  i18n.fallbacks = true;
}
