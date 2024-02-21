import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const pinia = createPinia();
pinia.use(piniaPersist);

// const apiURL = "http://116.62.190.1:9999";
const apiURL = "http://localhost:9123";

axios.defaults.baseURL = apiURL;
app.config.globalProperties.$downloadPath = apiURL;

app.use(pinia);
app.use(router);

app.use(ElementPlus, {
  locale: zhCn,
});

app.mount("#app");
