import {defineConfig} from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "gh2 Editor",
  description: "The Online Editor for gh2",
  appearance: "force-dark",
  themeConfig: {
    logo: "/icon.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: "Learn gh2", link: "https://gh2.dev/"},
      {text: "Examples", link: "https://gh2.dev/examples/zeros"},
    ],
    sidebar: [],
    socialLinks: [{icon: "github", link: "https://github.com/gh2hq/editor"}],
  },
});
