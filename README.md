# Nuxt Smart App Banner [nuxt ^3.0.0]

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

![Alt text](android_view.png?raw=true "dsdfsdfsdfsdf") ![Alt text](ios_view.png?raw=true "Title")

Based on\
'jQuery Smart Banner' by Arnold Daniels <arnold@jasny.net> https://github.com/jasny/jquery.smartbanner ,\
'Smart App Banner' by Vitaly Glibin <glibin.v@gmail.com> https://github.com/kudago/smart-app-banner

> Smart App Banner for Nuxt

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- Smart App Banner for Anroid/IOS
- Nuxt 3 compatible
- Support native IOS banner
- Callbacks available

## Quick Setup

1. Add `nuxt-smart-app-banner` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-smart-app-banner

# Using yarn
yarn add --dev nuxt-smart-app-banner

# Using npm
npm install --save-dev nuxt-smart-app-banner
```

2. Add `nuxt-smart-app-banner` to the `modules` section of `nuxt.config.ts` and provide module config

```js
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    modules: ['nuxt-smart-app-banner'],
    "nuxt-smart-app-banner": {
        bannerOptions: {
           ...
        }

    }
})

```

3. Place smart banner component into desired component, page or layout\
⚠️ Note: if you set overrideComponentNameWith, use custom name instead of SmartAppBanner ⚠️
```html
<template>
  <div>
  🔥<SmartAppBanner/>🔥
    <NuxtWelcome />
  </div>
</template>
```
That's it! You can now use Nuxt Smart App Banner in your Nuxt app ✨

## Config overview
```js
export interface ModuleOptions {
  overrideComponentNameWith?: string; // Use to override default component name
  bannerOptions: {
    useNativeIosBannerForSafari: boolean; // use native ios banner if available instead of custom (default: true)
    daysHidden: number;  // days to banner appear again after close button is clicked (defaults to 15)
    daysReminder: number;  // days to banner appear again after "VIEW" button is clicked (defaults to 90)
    appStoreLanguage: string; // ios app store language
    title: string;  // title text shown on banner
    author: string;  // author text shown on banner
    button: string;  // button text shown on banner
    androidAppId: string;  // android app id
    iosAppId: string; // ios app id
    store: {
        ios: string; // Instore text shown on banner for ios
        android: string; // Instore text shown on banner for android
    },
    price: {
        ios: string; // Price text shown on banner for ios
        android: string; // Price text shown on banner for ios
    },
    icons?: {
        ios: string; // Url for app icon shown on banner for ios
        android: string; // Url for app icon shown on banner for android
    },
    icon: string; // fallback icon url for all platforms
    theme?: SmartAppBannerTheme; // put platform type here to force single theme on all device
    force?: SmartAppBannerPlatform, // put platform type here for force banner platform for debug
    onInstall?: (platform: SmartAppBannerPlatform, appId: string) => void; // callback fired on clicking install button
    onDismiss?: (platform: SmartAppBannerPlatform, appId: string) => void; // callback fired on clicking close button
    onShown?: (platform: SmartAppBannerPlatform, appId: string) => void; // callback fired on banner shown
    onNotShown?: (platform: SmartAppBannerPlatform, appId: string, reason: SmartAppBannerNotShownReason) => void; // callback fired on banner not shown because it was previously either clicked or dismissed
    }
}
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-smart-app-banner/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-smart-app-banner

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-smart-app-banner.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-smart-app-banner

[license-src]: https://img.shields.io/npm/l/nuxt-smart-app-banner.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-smart-app-banner

