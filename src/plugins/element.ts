import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import { App } from "vue";

export function registerElementPlus(app: App) {
  app.use(ElementPlus);
}
