import DefaultTheme from "vitepress/theme-without-fonts";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "@xterm/xterm/css/xterm.css";

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    app.use(PrimeVue, {theme: {preset: Aura}});
  },
};
