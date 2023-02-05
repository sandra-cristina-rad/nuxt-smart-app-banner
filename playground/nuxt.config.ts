import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['../src/module'],
  "nuxt-smart-app-banner": {
    bannerOptions: {
      title: "Title",
      androidAppId: "",
      icon: "https://icon-library.com/images/play-store-icon/play-store-icon-9.jpg",
      iosAppId: "",
      appStoreLanguage: "us",
    }

  }
})
