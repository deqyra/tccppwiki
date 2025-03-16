import { defineConfig } from "vitepress";
import footnote from "markdown-it-footnote";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Together C & C++",
    description: "The Together C & C++ Community",
    outDir: "../dist",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Examples", link: "/markdown-examples" },
        ],
        sidebar: [
            {
                text: "Examples",
                items: [
                    { text: "Markdown Examples", link: "/markdown-examples" },
                    { text: "Runtime API Examples", link: "/api-examples" },
                ],
            },
        ],
        socialLinks: [{ icon: "github", link: "https://github.com/TCCPP/wiki" }],
    },
    markdown: {
        lineNumbers: true,
        math: true,
        config: md => {
            md.use(footnote);
        },
    },
    cleanUrls: true,
});
