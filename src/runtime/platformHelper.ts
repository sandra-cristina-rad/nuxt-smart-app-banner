import type { Parser } from "bowser";
import { SmartAppBannerPlatform, type SmartBannerOptions } from "./types";

interface PlatformData {
  platform: SmartAppBannerPlatform;
  iconRels: string[];
  getStoreLink: (bannerConfig: SmartBannerOptions) => string;
  getAppId: (bannerConfig: SmartBannerOptions) => string;
  getIcon: (bannerConfig: SmartBannerOptions) => string;
}

enum PlatformOs {
  "Android" = "android",
  "iOS" = "ios",
}

type PlatformDataKey = SmartAppBannerPlatform | PlatformOs;

type PlatformsData = Record<PlatformDataKey, PlatformData>;

export const platformsData: PlatformsData = {
  ios: {
    platform: SmartAppBannerPlatform.ios,
    iconRels: ["apple-touch-icon-precomposed", "apple-touch-icon"],
    getStoreLink: (bannerConfig: SmartBannerOptions) =>
      "https://itunes.apple.com/" +
      bannerConfig.appStoreLanguage +
      "/app/id" +
      bannerConfig.iosAppId +
      "?mt=8",
    getAppId: (bannerConfig: SmartBannerOptions) => bannerConfig.iosAppId,
    getIcon: (bannerConfig: SmartBannerOptions) =>
      bannerConfig.icons?.ios || bannerConfig.icon,
  },
  android: {
    platform: SmartAppBannerPlatform.android,
    iconRels: [
      "android-touch-icon",
      "apple-touch-icon-precomposed",
      "apple-touch-icon",
    ],
    getStoreLink: (bannerConfig: SmartBannerOptions) =>
      "http://play.google.com/store/apps/details?id=" +
      bannerConfig.androidAppId,
    getAppId: (bannerConfig: SmartBannerOptions) => bannerConfig.androidAppId,
    getIcon: (bannerConfig: SmartBannerOptions) =>
      bannerConfig.icons?.android || bannerConfig.icon,
  },
};

export const identifyPlatform = function (
  bannerConfig: any,
  osName: string
): SmartAppBannerPlatform | null {
  if (bannerConfig.force) {
    return bannerConfig.force;
  }
  if (Object.keys(PlatformOs).every((key) => key !== osName)) {
    return null;
  }
  return platformsData[PlatformOs[osName]].platform;
};

export const isMobileSafariPlatform = function (
  computedTheme,
  bowser: Parser.Parser
) {
  return (
    computedTheme === "ios" &&
    (bowser.getBrowserName() === "Mobile Safari" ||
      (bowser.getBrowserName() === "Safari" &&
        bowser.getPlatformType() === "mobile")) &&
    parseInt(bowser.getOSVersion(), 10) >= 6
  );
};
