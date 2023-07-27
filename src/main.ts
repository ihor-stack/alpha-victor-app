import { createApp } from "vue";
import { createPinia } from "pinia";
import mixpanel from "mixpanel-browser";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

import { createI18n } from "vue-i18n";
import en from "./lang/en";
import cy from "./lang/cy"; // Welsh language

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/alpha-victor.css";
import "./theme/custom-tinymce-editor.css";

/* ServiceWorker */
import "./registerServiceWorker";

/* Pinia */
const pinia = createPinia();

const i18n = createI18n({
  locale: "en",
  legacy: false,
  messages: {
    en,
    cy,
  },
});

mixpanel.init(process.env.VUE_APP_MIXPANEL_TOKEN, {
  debug: true,
  ignore_dnt: true,
});

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia)
  .use(i18n)
  .provide("i18n", i18n);

router.isReady().then(() => {
  app.mount("#app");
});
