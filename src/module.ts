import { fileURLToPath } from 'url'
import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'
import { SmartBannerOptions } from "./runtime/types";
export interface ModuleOptions {
  overrideComponentNameWith?: string;
  bannerOptions: SmartBannerOptions;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-smart-app-banner',
    configKey: 'nuxt-smart-app-banner',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    bannerOptions: {
      useNativeIosBannerForSafari: true,
      daysHidden: 15,   
      daysReminder: 90, 
      appStoreLanguage: 'us',
      title: 'Title',
      author: 'Company LLC',
      button: 'View',
      icon: '',
      store: {
        ios: 'On the App Store',
        android: 'In Google Play',
      },
      price: {
        ios: 'FREE',
        android: 'FREE',
      },
      androidAppId: "",
      iosAppId: "",
    }

  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addComponent({
      name: options.overrideComponentNameWith || 'SmartAppBanner',
      global: true,
      filePath: resolve('./runtime/components/SmartAppBanner.vue'),
      mode: 'client'
    });

    nuxt.options.runtimeConfig.public.smartAppBanner = options.bannerOptions;
  }
})
