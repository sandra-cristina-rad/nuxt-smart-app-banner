import { ref, computed, ComputedRef, Ref } from 'vue';
import { SmartAppBannerNotShownReason, SmartAppBannerPlatform, SmartBannerOptions } from '../types';
import { identifyPlatform, isMobileSafariPlatform, platformsData } from '../platformHelper';
import Cookies from 'js-cookie'
import Bowser from "bowser";
import { useHead, useRuntimeConfig } from '#imports'

const useSmartAppBannerCallbacks = (appId: ComputedRef<string>, platform: Ref<SmartAppBannerPlatform>, setShowBanner: (value: boolean) => void, emit: any, bannerConfig: SmartBannerOptions) => {

    const installClick = () => {
        setShowBanner(false);
        Cookies.set(appId.value + '-smartbanner-installed', 'true', {
            path: '/',
            expires: new Date(Number(new Date()) + (bannerConfig.daysReminder * 1000 * 60 * 60 * 24))
        });
        emit('onInstall', platform.value, appId.value);
    };

    const dismissClick = () => {
        setShowBanner(false);
        Cookies.set(appId.value + '-smartbanner-closed', 'true', {
            path: '/',
            expires: new Date(Number(new Date()) + (bannerConfig.daysHidden * 1000 * 60 * 60 * 24))
        });
        emit('onDismiss', platform.value, appId.value);
    };

    return { dismissClick, installClick }
}

const useSmartAppBannerState = (bannerConfig: SmartBannerOptions) => {
    const showBanner = ref<boolean>(false);
    const setShowBanner = (value: boolean) => {
        showBanner.value = value;
    }
    const platform = ref<SmartAppBannerPlatform>(SmartAppBannerPlatform.android);
    const setPlatform = (value: SmartAppBannerPlatform) => {
        platform.value = value;
    }
    const appId = computed(() => platformsData[platform.value].getAppId(bannerConfig));
    const storeLink = computed(() => platformsData[platform.value].getStoreLink(bannerConfig));
    const theme = computed(() => bannerConfig.theme || platform.value);
    const inStoreText = computed(() => bannerConfig.price[platform.value] + ' - ' + bannerConfig.store[platform.value]);
    const icon = computed(() => {
        const iconFromOptions = platformsData[platform.value].getIcon(bannerConfig);
        if (iconFromOptions) {
            return iconFromOptions;
        } else {
            const iconRels = platformsData[platform.value].iconRels;
            for (let i = 0; i < iconRels.length; i++) {
                const rel = window?.document.querySelector('link[rel="' + iconRels[i] + '"]');

                if (rel) {
                    return rel.getAttribute('href');
                }
            }
            return "";
        }
    });

    const mainContainerClass = computed(() => `smartbanner smartbanner-${theme.value}`);
    const iconStyle = computed(() => `background-image: url(${icon.value})`);

    return { showBanner, platform, appId, storeLink, theme, inStoreText, icon, setPlatform, setShowBanner, mainContainerClass, iconStyle };
}

export const useSmartAppBanner = (emit: any) => {
    const bannerConfig = useRuntimeConfig().smartAppBanner as SmartBannerOptions;
    const {
        appId,
        inStoreText,
        platform,
        setPlatform,
        setShowBanner,
        showBanner,
        storeLink,
        iconStyle,
        mainContainerClass,
    } = useSmartAppBannerState(bannerConfig);

    const { dismissClick, installClick } = useSmartAppBannerCallbacks(appId, platform, setShowBanner, emit, bannerConfig);

    const state = {
        title: bannerConfig.title, author: bannerConfig.author, buttonText: bannerConfig.button,
        showBanner, storeLink, inStoreText, dismissClick, installClick, iconStyle, mainContainerClass
    };

    const bowser = Bowser.getParser(window?.navigator?.userAgent);
    const platformValue = identifyPlatform(bannerConfig, bowser.getOSName());
    if (!platformValue) {
        return state;
    }

    setPlatform(platformValue);

    if (bannerConfig.useNativeIosBannerForSafari) {
        useHead({
            meta: [
                { name: 'apple-itunes-app', content: `app-id=${bannerConfig.iosAppId}` },
            ]
        })
    }

    // Don't show banner on ANY of the following conditions:
    // - device os is not supported,
    // - user is on mobile safari for ios 6 or greater (iOS >= 6 has native support for SmartAppBanner)
    // - running on standalone mode
    // - user dismissed banner
    const unsupported = !bannerConfig.store[platform.value];
    if (unsupported) {
        return state;
    }

    const isMobileSafari = bannerConfig.useNativeIosBannerForSafari && isMobileSafariPlatform(platform.value, bowser);
    const runningStandAlone = (window?.navigator as any).standalone;

    if (isMobileSafari || runningStandAlone) {
        return state;
    }

    const userDismissed = Cookies.get(appId.value + '-smartbanner-closed');
    const userInstalled = Cookies.get(appId.value + '-smartbanner-installed');

    if (userDismissed) {
        emit('onNotShown', platform.value, appId.value, SmartAppBannerNotShownReason.dismissed);
        return state;
    }

    if (userInstalled) {
        emit('onNotShown', platform.value, appId.value, SmartAppBannerNotShownReason.installed);
        return state;
    }

    // - If we dont have app id, dont display the banner
    if (!appId.value) {
        return state;
    }

    setShowBanner(true);
    emit('onShown', platform.value, appId.value);

    return state;
}