import * as Localization from 'expo-localization';
import i18n from 'i18n-js';


export function useLocalization() {

    // Set the key-value pairs for the different languages you want to support.
    i18n.translations = {
        en: { email: 'E-mail' },
        zh: { email: '電子郵件' },
    };
    // Set the locale once at the beginning of your app.
    i18n.locale = Localization.locale;
}
