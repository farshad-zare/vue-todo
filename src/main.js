import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import I18n from "./I18n";

// import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

// app.use(ElementPlus);
app.use(store);
app.use(I18n);
app.mount("#app");
