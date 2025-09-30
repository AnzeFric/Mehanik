import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, sl } from "./translations/_index";
import useTranslationStore from "@/stores/useTranslationStore";

const resources = {
  en: {
    translation: en,
  },
  sl: {
    translation: sl,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: useTranslationStore.getState().selectedTranslation,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
