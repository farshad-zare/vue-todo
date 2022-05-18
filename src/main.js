import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import PrimeVue from "primevue/config";

createApp(App).use(store).use(PrimeVue).mount("#app");
