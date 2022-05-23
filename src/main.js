import { createApp } from "vue";
import ToastService from "primevue/toastservice";
import App from "./App.vue";
import store from "./store";
import PrimeVue from "primevue/config";

createApp(App).use(store).use(PrimeVue).use(ToastService).mount("#app");
