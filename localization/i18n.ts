import i18n from 'i18next';
import { en, zh, zh_hk } from "./translations";
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: en,
    },
    zh: {
        translation: zh
    },
    zh_hk: {
        translation: zh_hk
    },
};

i18n.use(initReactI18next).use({
    type: 'languageDetector',
    init: () => {},
    /** Must return detected language */

    //Expo Localization
    detect: () => {
        return "en";
    }
}).init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;