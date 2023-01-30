export interface SmartBannerOptions {
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
    theme?: SmartAppBannerTheme, // put platform type ('ios', 'android', etc.) here to force single theme on all device
    icon?: string, // full path to icon image if not using website icon image
    force?: SmartAppBannerPlatform, // put platform type ('ios', 'android', etc.) here for emulation
    //onInstall:
}

export enum SmartAppBannerTheme {
    ios = 'ios',
    android = 'android',
    windows = 'windows'
}

export enum SmartAppBannerPlatform {
    ios = 'ios',
    android = 'android',
    windows = 'windows'
}