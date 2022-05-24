import { createI18n } from "vue-i18n";
import en from "./locale/en.json";
import fa from "./locale/fa.json";

const I18n = createI18n({
  locale: "en",
  legacy: false,
  fallbackLocale: "en",
  messages: { en, fa },
});

export default I18n;
