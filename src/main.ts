import { createApp } from "vue";
import App from "./App.vue";
import { registerElementPlus } from "./plugins/element";
import router from "./plugins/router";
import "@/assets/css/index.less";
const app = createApp(App);
registerElementPlus(app);
app.use(router);
app.mount("#app");
