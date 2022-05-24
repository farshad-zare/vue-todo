import { createApp } from "vue";
import ToastService from "primevue/toastservice";
import App from "./App.vue";
import store from "./store";
import I18n from "./I18n";
import PrimeVue from "primevue/config";

const app = createApp(App);
app.use(store);
app.use(PrimeVue);
app.use(I18n);
app.use(ToastService);
app.mount("#app");
