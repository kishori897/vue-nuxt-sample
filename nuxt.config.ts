// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Your assessment",
      titleTemplate: (title) => {
        if (title) {
          return `${title} | Shortlister`
        }

        return "Shortlister"
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { hid: "robots", name: "robots", content: "noindex, nofollow" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
      ],
      script: [
        {
          src: "//js.hs-scripts.com/4019327.js",
          id: "hs-script-loader",
          async: true,
          defer: true,
        },
      ],
    },
  },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/stylelint-module",
  ],

  css: ["~/assets/base.css"],

  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_API_END_POINT,
      hostURL: process.env.NUXT_UI_END_POINT,
    },
  },

  experimental: {
    restoreState: true,
  },

  image: {
    dir: "assets",
  },

  compatibilityDate: "2024-07-09",
})
