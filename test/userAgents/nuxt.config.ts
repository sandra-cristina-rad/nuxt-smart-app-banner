import MyModule from '../../src/module';

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  "nuxt-smart-app-banner": {
    bannerOptions: {
      title: "Title",
      androidAppId: "com.redlinegames.attackhole",
      icon: "https://icon-library.com/images/play-store-icon/play-store-icon-9.jpg",
      iosAppId: "426415753",
      appStoreLanguage: "by",
    }
  }
})