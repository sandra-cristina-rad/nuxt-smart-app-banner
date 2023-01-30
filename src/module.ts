import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'
import { SmartBannerOptions } from "./runtime/types";
export interface ModuleOptions {
  addPlugin: boolean;
  overrideComponentNameWith: string;
  bannerOptions: SmartBannerOptions;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-smart-banner',
    configKey: 'nuxt-smart-banner',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    addPlugin: true,
    overrideComponentNameWith: '',
    bannerOptions: {
      daysHidden: 15,   // days to hide banner after close button is clicked (defaults to 15)
      daysReminder: 90, // days to hide banner after "VIEW" button is clicked (defaults to 90)
      appStoreLanguage: 'us', // language code for the App Store 
      title: 'Title',
      author: 'Company LLC',
      button: 'View',
      store: {
        ios: 'On the App Store',
        android: 'In Google Play',
        windows: 'In Windows store'
      },
      price: {
        ios: 'FREE',
        android: 'FREE',
        windows: 'FREE'
      },
      androidAppId: "",
      iosAppId: "",
      windowsAppId: "",
      // , theme: '' // put platform type ('ios', 'android', etc.) here to force single theme on all device
      //, icon: ''
    }

  },
  setup(options, nuxt) {
    if (options.addPlugin) {
      const { resolve } = createResolver(import.meta.url)
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)

      addPlugin(resolve(runtimeDir, 'plugin'))
      addComponent({
        name: options.overrideComponentNameWith || 'SmartAppBanner',
        global: true,
        filePath: resolve('./runtime/components/SmartAppBanner.vue'),
        mode: 'client'
      })
      nuxt.options.runtimeConfig.public.smartAppBanner = options.bannerOptions;
    }
  }
})
