import MyModule from '../../src/module';
//import { SmartAppBannerNotShownReason, SmartAppBannerPlatform } from '../../src/runtime/types';

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  "nuxt-smart-app-banner": {
    bannerOptions: {
      title: "Title",
      androidAppId: "com.redlinegames.attackhole",
      icon: "https://icon-library.com/images/play-store-icon/play-store-icon-9.jpg",
      //onInstall: (platform: SmartAppBannerPlatform, appId: string) => console.log("onInstall click"),
      //onDismiss: (platform: SmartAppBannerPlatform, appId: string) => console.log("onDismiss click"),
      //onShown: (platform: SmartAppBannerPlatform, appId: string) => console.log("onShown click"),
      //onNotShown: (platform: SmartAppBannerPlatform, appId: string, reason: SmartAppBannerNotShownReason) => console.log(`onNotShown click ${reason}`),
    }
  }
})