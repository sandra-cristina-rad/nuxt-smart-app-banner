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
        android?: string;
    },
    price: {
        ios: string;
        android?: string;
    },
    icons?: {
        ios?: string;
        android?: string;
    },
    icon: string; 
    theme?: SmartAppBannerTheme; 
    force?: SmartAppBannerPlatform;
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