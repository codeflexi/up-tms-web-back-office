import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import  vcookies  from "vue-cookies";



import "@/axios";
import "@/style.css";
import App from "@/App.vue";

const pinia = createPinia();


pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App);
app.use(pinia);
app.use(vcookies);
app.use(router);

app.mount("#app");

