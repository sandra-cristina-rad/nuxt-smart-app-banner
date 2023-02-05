export interface SmartBannerOptions {
    useNativeIosBannerForSafari: boolean;
    daysHidden: number;
    daysReminder: number;
    appStoreLanguage: string;
    title: string;
    author: string;
    button: string;
    androidAppId: string;
    iosAppId: string;
    store: {
        ios: string;
        android: string;
    },
    price: {
        ios: string;
        android: string;
    },
    icons?: {
        ios: string;
        android: string;
    },
    icon: string; // fallback icon url for all platforms
    theme?: SmartAppBannerTheme; // put platform type ('ios', 'android', etc.) here to force single theme on all device
    force?: SmartAppBannerPlatform, // put platform type ('ios', 'android', etc.) here for emulation
    onInstall?: (platform: SmartAppBannerPlatform, appId: string) => void;
    onDismiss?: (platform: SmartAppBannerPlatform, appId: string) => void;
    onShown?: (platform: SmartAppBannerPlatform, appId: string) => void;
    onNotShown?: (platform: SmartAppBannerPlatform, appId: string, reason: SmartAppBannerNotShownReason) => void;
}

export enum SmartAppBannerNotShownReason {
    installed,
    dismissed
}

export enum SmartAppBannerTheme {
    ios = 'ios',
    android = 'android',
}

export enum SmartAppBannerPlatform {
    ios = 'ios',
    android = 'android',
}