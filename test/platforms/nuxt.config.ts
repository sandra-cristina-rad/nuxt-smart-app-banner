import MyModule from '../../src/module';

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  "nuxt-smart-app-banner": {
    overrideComponentNameWith: '',
    bannerOptions: {
      useNativeIosBannerForSafari: true,
      daysHidden: 15,   // days to hide banner after close button is clicked (defaults to 15)
      daysReminder: 90, // days to hide banner after "VIEW" button is clicked (defaults to 90)
      title: 'Title',
      author: 'Company LLC',
      button: 'View',
      icon: '',
      icons: {
        "android": "https://icon-library.com/images/play-store-icon/play-store-icon-9.jpg",
        "ios": "https://icon-library.com/images/play-store-icon/play-store-icon-9.jpg",
      },
      store: {
        ios: 'On the App Store',
        android: 'In Google Play',
      },
      price: {
        ios: 'FREE',
        android: 'FREE anroid',
      },
      androidAppId: "com.redlinegames.attackhole",
      iosAppId: "426415753",
      appStoreLanguage: "by",
      // , theme: '' // put platform type ('ios', 'android', etc.) here to force single theme on all device
    }
  }
})