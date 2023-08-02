import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import englishTranslation from "./English.json";
import russianTranslation from "./Russian.json";

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      english: {
        translation: englishTranslation,
      },
      russian: {
        translation: russianTranslation,
      },
    },
    lng: "english", 
    fallbackLng: "english", 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
