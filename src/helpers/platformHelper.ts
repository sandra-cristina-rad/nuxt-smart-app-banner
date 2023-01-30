
import { SmartAppBannerTheme, SmartAppBannerPlatform } from "../types";

const mixins = {
    ios: {
        appMeta: 'apple-itunes-app',
        iconRels: ['apple-touch-icon-precomposed', 'apple-touch-icon'],
        getStoreLink: function (appId, lang) {
            return 'https://itunes.apple.com/' + lang + '/app/id' + appId + "?mt=8";
        }
    },
    android: {
        appMeta: 'google-play-app',
        iconRels: ['android-touch-icon', 'apple-touch-icon-precomposed', 'apple-touch-icon'],
        getStoreLink: function (appId, lang) {
            return 'http://play.google.com/store/apps/details?id=' + appId;
        },
        getAppId: (bannerConfig: ) => {

        }
    },
    windows: {
        appMeta: 'msApplication-ID',
        iconRels: ['windows-touch-icon', 'apple-touch-icon-precomposed', 'apple-touch-icon'],
        getStoreLink: function (appId, lang) {
            return 'http://www.windowsphone.com/s?appid=' + appId;
        }
    }
};

export const identifyPlatform = function (bannerConfig: any, agent: any) {
    let appId, platform;
    console.log(`Debug : Useragent: ${JSON.stringify(agent)}`);

    if (bannerConfig.force) {
        platform = bannerConfig.force;
    } else if (agent.os.name === 'Windows Phone' || agent.os.name === 'Windows Mobile') {
        platform = SmartAppBannerPlatform.windows;
    } else if (agent.os.name === 'iOS') {
        platform = SmartAppBannerPlatform.ios;
    } else if (agent.os.name === 'Android') {
        platform = SmartAppBannerPlatform.android;
    }


    if (platform === SmartAppBannerPlatform.android) {
        appId = bannerConfig.androidAppId;
    } else if (platform === SmartAppBannerPlatform.ios) {
        appId = bannerConfig.iosAppId
    } else if (platform === SmartAppBannerPlatform.windows) {
        appId = bannerConfig.windowsAppId;
    }
    return {
        platform,
        appId
    }
}

export const isMobileSafariPlatform = function (computedTheme, agent) {
    return (computedTheme === 'ios' && agent.browser.name === 'Mobile Safari' && parseInt(agent.os.version, 10) >= 6);
}

export const getStoreLink = function (platform: SmartAppBannerPlatform, appId, lang) {
    return mixins[platform].getStoreLink(appId, lang);
}

export const getIconReals = function (platform: SmartAppBannerPlatform) {
    return mixins[platform].iconRels;
}

