import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'
import { Theme, Platform } from "./types";

export interface ModuleOptions {
  addPlugin: boolean,
  daysHidden: number,
  daysReminder: number,
  appStoreLanguage: string,
  title: string,
  author: string,
  button: string,
  androidAppId: string,
  iosAppId: string,
  windowsAppId: string,
  store: {
    ios: string,
    android: string,
    windows: string
  },
  price: {
    ios: string,
    android: string,
    windows: string
  },
  theme?: Theme, // put platform type ('ios', 'android', etc.) here to force single theme on all device
  icon?: string, // full path to icon image if not using website icon image
  force?: Platform, // put platform type ('ios', 'android', etc.) here for emulation
  //onInstall: 
}


export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-smart-banner',
    configKey: 'nuxt-smart-banner'
  },
  defaults: {
    addPlugin: true,
    daysHidden: 15,   // days to hide banner after close button is clicked (defaults to 15)
    daysReminder: 90, // days to hide banner after "VIEW" button is clicked (defaults to 90)
    appStoreLanguage: 'us', // language code for the App Store (defaults to user's browser language)
    title: 'MyPage',
    author: 'MyCompany LLC',
    button: 'VIEW',
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
    //icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAIjElEQVR4Xu1b2W8b5xH/8VyeS1pHJNmS4ypqUsdHHTsNGseJEaVHCqQFkgJ96FNRtC8B8tADRf+LvvYPCAq3D23RtA0QwGjhukB6OEGMBrEV2dZBSqQk3tcuubvszFKUSFESueR+FJBooAVFcbm785v5Zn4z38hx7fnn6jhCKRaLcDgcR/YEjmMAjj3geAkcx4Aji0B0489lEKzrgF6tw+V1oFQqQSsYcAUdcHqGnw2GmgUMrY7IlBczl0MYPSPB43OBVdaqBtJrFdz/Wwqp5QqcBMywZKgAnH0lislzAbjdTvh8HlNHRalBqxk7+n56N43F99LQCaxhyFAAqJMuz35vDPKkF9GRAGRZAv+NhUlQfDULXW+AYBh1PFrMYOEdAqEmHgThAPB6f2o+glMXg5AjPkSi/g7DxlayBMiusrmcgviDAhb/khEeF4QD4JddeP4HE2xrTJ+Odiif2iqhXKq2/Z29YHklh9V/5JCPt39m97IQCgAbde4FGaevhBAIejE6Fmx7fla+VKzSMmhXi9/HVvPIJCt4+G4OTre4oCgUAE51L/x4An7ZjWBIwshowFRWVTSw8pq2G/z2WjaRLEKpaPj3r2MIRCW7Db9zPaEAaJU65n96Ei6yICvOIFRVDSod3SrARKIItarhgxsxeIzPAABWTMhgrazkYdQN/Oc3K5DgN/mCCBHqAbwErv5oAoGI29Kz14gXxGI500tu/eoBohNhOJ1iIBAKgBkEr1IQfDZkCYDNTQqOpRoKmwo++t0aIiOhrkvG0g1aThYKAN/HF3Lh6g8ndohPtwetVGpIJEpwOIFP/pxEdq2McNgagN3u0fq5cACYCD15Xcb0M92V4OC4vl40ny+fJOv/dg0+2QO/z2dFJ0vnCgfApLd6HZfeGMHo6U4W2HzaXE5FJlMx31bLGj68Eac0qSMcCtL6J3cQJEMBwFSKip6X35qGlyrAVmHWF4/nqRZoUGGOGx+8vUocoAafJEGSvIJUb1xWOABcAkdPSrjwnRF4/ftbMp9XkUpVdhhhnQui22kUlw2qBYTqLxYAzudPXo9SIRToGgRTqTIKhRbeT98tJapYuV2g5gkxRjFZUAwAbPWRGQnnXxuhpkfv65fZn0I0uVXYG9buFJG6R40SAR0jIUvgsSf8pPwJEJGzJLz+l5YynTmfrL/1SRmJD0u2e4IQAMZnfbhA1m8p8XsCwiyDl7P7kp7Y+zmkH6lw2ryLJAQALn6uvzllGYAKVX+8DPYrj//3p3WUUzpxAnsLIyEAGER+vvQ1GeGp9hrARb1A95402HQNjnFZ6gTls6rJA1pFU3V8dGMdwRM+eL32pgUhAJj5nEDY2sjybzu6jM8FcWaeukIHrA0ufpILBSy8uwG4dsM+02IHYSmCFAkDgLWu1TQiOITEtjz2xQBmrobMfgA3Q/brCWw+LOLBzRS8Urv38Lkej73WHwoRanXlmfMhzL0sm2tco1RZol4gN0CbLJDP5eJn4a8pBELi+H/rMzkuXXhafO+ZFwKlxMuvT2L6abkjIySTJXAVyKIWNdz/QxbhaKCnzDHISdyJdjxz8dxQANBKBr75i1n4w51uzA+ytLSb/u6+vYlwpL2BOoiiB313qAD4wm58/a1Z8oROvHlJPHrEAZOEfl/6O+0T5MUWQWagHpYHsPufvTaGuZdO7GsMDoirq40WGEthQ0Xydg0uT+80uh8PGRoATsOJV385e2Bfr1yugeNAkwDx69LNIozSZwAAXa3jyutTmL4YPtBImYxiZoNWUQs64jdVONrbB/0Y+sDvCPcA5jtTTwXxle+ePJQWJ2kThGnwXsku1pD+uGb2B0WIcAD8RFvnf3Kmg9u35WFy9+XlnLkr3CH02cZ/VZTiRKYE9AOEAiDBjfmfPd41kB1WATYBSbyvorJhPwhCAGC3D9FG6EtvztCWWHffPagC3OsNG3dUFGO6rcvBdgAM2gmavhTG5W9P9eyy2awCProKLYHswnZMsCkw2gqAVqzj4rfG8cQ16gRZ4JYblP7K2zS4FxAqSR2Jf6ldT+3lBNsAYMufe2UccxaV53x/YAA8RIPKpo71fw6eIm0DYPxMAF/9/inLPUCeC1qhSZBuW+X7YZGh5ZC9RwXUANnBFgDqlL5f/fmsOfJmVYo0HbK1Vbb6tZ3zV96rgIlWv2ILADPnZXz5NZ4Bsibs/vF4AdXqbsPE2hWA3FIV6btkgT69YGAAdKVO212PQx611qhk5XkniHeEBhGuLD/9Y4E6RdbmD5r3HBgAl+TA2TfG4Kf2lT/goeFHtzkE6Wrp57GDNg3EpIfzPjc/VYVyep+W2wGNJ0lu0b5i9ogAkKclnH6ROjzby7A568dBjSc6WoObYRgm3e0n4B3mJWt3CqjEnH1NkAzsAWPU5Jy8Ir5zcxgA+YSCtVsKJL/1BspAADDZOfVcCCO0DXaUUsnVsPhODqGI9R7iYABQl2fmxTCiM8Pp3h4EMjdR7/0+DflE9wmUvdcYCAC+mNfvwhe+EYUnQEVP/+m4bwfiyZMHN9MoEzOU5SMAgJ+8XFQgn5IwcSGEyKSf/gnC2Rh8thsQivicNDiQllM1bN2vIP2wbN7G7XbRrtERAcAgKIpKIy1VGOU6QtNemgv0wuN2wzfmRmDMAw95Cjc4edOU5345E5gpsDUPEmiMG1uV5wt4VF6jVKnmdShpHTXaH2R3L60T/aWsx9dhoL1eL4IBGqTsI6cOvARafZcfXtNoy0vn7TBOeYbZAjdnBOhovG6/Z7Nte4g/3BJE2comMI3D3BOkdErf2rmVy0Vg0sEAe6jjNMh2ua0A7LeQ2V3rpDnfyDAt3DhYH1aK/AA+PwPQUJDfN362X00+QTm++WrztJhwAHqJbsHg0fGIYwCGtTN0mCcce8DnfQkEAtYpbC+xpddz/g9BWBl9TxtTdQAAAABJRU5ErkJggg==' // full path to icon image if not using website icon image
    // , force: 'ios' // Uncomment for platform emulation

  },
  setup(options, nuxt) {
    if (options.addPlugin) {
      const { resolve } = createResolver(import.meta.url)
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)

      addPlugin(resolve(runtimeDir, 'plugin'))
      addComponent({
        name: 'SmartBanner',
        global: true,
        filePath: resolve('./components/Banner.vue'),
        mode: 'client'
      })
      nuxt.options.runtimeConfig.public.smartAppBanner = options;
    }
  }
})
