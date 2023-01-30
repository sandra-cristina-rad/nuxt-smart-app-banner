# Nuxt Smart App Banner [alfa]

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Based on\
'jQuery Smart Banner' by Arnold Daniels <arnold@jasny.net> https://github.com/jasny/jquery.smartbanner,\
'Smart App Banner' by Vitaly Glibin <glibin.v@gmail.com> https://github.com/kudago/smart-app-banner

> Smart App Banner for Nuxt

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰ &nbsp;Foo
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
export default defineNuxtConfig({
  modules: [
    ['nuxt-smart-app-banner', {
        addPlugin: true,
        overrideComponentNameWith: '',
        bannerOptions: {
            daysHidden: 15,   // days to hide banner after close button is clicked (defaults to 15)
            daysReminder: 90, // days to hide banner after "VIEW" button is clicked (defaults to 90)
            appStoreLanguage: 'us', // language code for the App Store 
            title: 'Title',
            author: 'Company LLC',
            button: 'View',
            icon: '',
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
    }]
  ]
})
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

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-smart-app-banner/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-smart-app-banner

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-smart-app-banner.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-smart-app-banner

[license-src]: https://img.shields.io/npm/l/nuxt-smart-app-banner.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-smart-app-banner

