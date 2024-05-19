import i18n from 'i18next';
import { en, zh } from "./translations";
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: en,
    },
    zh: {
        translation: zh
    },
};

i18n.use(initReactI18next).use({
    type: 'languageDetector',
    init: () => {},
    /** Must return detected language */
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