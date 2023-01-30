# Nuxt Smart App Banner [alfa]

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

![Alt text](android_view.png?raw=true "dsdfsdfsdfsdf") ![Alt text](ios_view.png?raw=true "Title")

Based on\
'jQuery Smart Banner' by Arnold Daniels <arnold@jasny.net> https://github.com/jasny/jquery.smartbanner ,\
'Smart App Banner' by Vitaly Glibin <glibin.v@gmail.com> https://github.com/kudago/smart-app-banner

> Smart App Banner for Nuxt

- [✨ &nbsp;Release Notes(not implemented yet)](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- &nbsp;Smart App Banner for Anroid/IOS
- 🚠 &nbsp;Bar
- 🌲 &nbsp;Baz

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
  modules: [
    ['nuxt-smart-app-banner'],
    "nuxt-smart-app-banner": {
        addPlugin: true,
        overrideComponentNameWith: '', // Use custom name for component to avoid collisions if need (default <SmartAppBanner/>)
        bannerOptions: {
            daysHidden: 15,   // days to hide banner after close button is clicked (defaults to 15)
            daysReminder: 90, // days to hide banner after "VIEW" button is clicked (defaults to 90)
            appStoreLanguage: 'us', // language code for the App Store 
            title: 'Title',
            author: 'Company LLC',
            button: 'View',
            icon: '', // path to application icon 
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
            androidAppId: "", // android app id in com.******* format
            iosAppId: "", // ios app id, should be numeric 
            windowsAppId: "",
            // , theme: '' // put platform type ('ios', 'android', etc.) here to force single theme on all device
    }
  ]
})
```
3. Place smart banner component into desired component, page or layout
```html
<template>
  <div>
  🔥<SmartAppBanner/>🔥
    <NuxtWelcome />
  </div>
</template>
```
That's it! You can now use Nuxt Smart App Banner in your Nuxt app ✨

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

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-smart-app-banner.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-smart-app-banner

[license-src]: https://img.shields.io/npm/l/nuxt-smart-app-banner.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-smart-app-banner

