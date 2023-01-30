
import { SmartAppBannerPlatform, SmartBannerOptions } from "./types";

const mixins = {
    ios: {
        appMeta: 'apple-itunes-app',
        iconRels: ['apple-touch-icon-precomposed', 'apple-touch-icon'],
        getStoreLink: function (appId, lang) {
            return 'https://itunes.apple.com/' + lang + '/app/id' + appId + "?mt=8";
        },
        getAppId: (bannerConfig: SmartBannerOptions) => bannerConfig.iosAppId
    },
    android: {
        appMeta: 'google-play-app',
        iconRels: ['android-touch-icon', 'apple-touch-icon-precomposed', 'apple-touch-icon'],
        getStoreLink: function (appId, lang) {
            return 'http://play.google.com/store/apps/details?id=' + appId;
        },
        getAppId: (bannerConfig: SmartBannerOptions) => bannerConfig.androidAppId
    },
    windows: {
        appMeta: 'msApplication-ID',
        iconRels: ['windows-touch-icon', 'apple-touch-icon-precomposed', 'apple-touch-icon'],
        getStoreLink: function (appId, lang) {
            return 'http://www.windowsphone.com/s?appid=' + appId;
        },
        getAppId: (bannerConfig: SmartBannerOptions) => bannerConfig.windowsAppId
    }
};

export const identifyPlatform = function (bannerConfig: any, osName: string) {
    let appId: string | null = null;
    let platform: SmartAppBannerPlatform | null = null;
    if (bannerConfig.force) {
        platform = bannerConfig.force;
    } else if (osName === 'Windows Phone' || osName === 'Windows Mobile') {
        platform = SmartAppBannerPlatform.windows;
    } else if (osName === 'iOS') {
        platform = SmartAppBannerPlatform.ios;
    } else if (osName === 'Android') {
        platform = SmartAppBannerPlatform.android;
    }

    if (platform) {
        appId = mixins[platform].getAppId(bannerConfig);
    }

    return {
        platform,
        appId
    }
}

export const isMobileSafariPlatform = function (computedTheme, browserName: string, osVersion: string) {
    return (computedTheme === 'ios' && browserName === 'Mobile Safari' && parseInt(osVersion, 10) >= 6);
}

export const getStoreLink = function (platform: SmartAppBannerPlatform, appId, lang) {
    return mixins[platform].getStoreLink(appId, lang);
}

export const getIconReals = function (platform: SmartAppBannerPlatform) {
    return mixins[platform].iconRels;
}

