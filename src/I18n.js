import { createI18n } from "vue-i18n";
import en from "./locale/en.json";
import fa from "./locale/fa.json";

const messages = { fa, en };

const I18n = createI18n({
  legacy: false,
  locale: "en",
  messages,
});

export default I18n;
