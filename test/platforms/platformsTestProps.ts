import { SmartAppBannerPlatform } from "../../src/runtime/types";
import { PlatformTestProps } from "./platformTestBuilder";

export const platformTestsProps: PlatformTestProps[] = [
    {
        author: "Company LLC",
        instore: "FREE anroid - In Google Play",
        platform: SmartAppBannerPlatform.android,
        title: "Title",
        viewButtonHref: "http://play.google.com/store/apps/details?id=com.redlinegames.attackhole",
        viewButtonText: "View",
        useAgent: "Mozilla/5.0 (Linux; Android 12; Infinix X6819 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/105.0.5195.79 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/396.1.0.28.104;]",
        iconStyle: 'background-image: url("https://icon-library.com/images/play-store-icon/play-store-icon-9.jpg");'
    },
    {
        author: "Company LLC",
        instore: "FREE - On the App Store",
        platform: SmartAppBannerPlatform.ios,
        title: "Title",
        viewButtonHref: "https://itunes.apple.com/by/app/id426415753?mt=8",
        viewButtonText: "VIEW",
        useAgent:  "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; fr-fr) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile/8J2 [FBAN/FBIOS;FBAV/5.2.2;FBBV/82131;FBDV/iPhone3,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/4.3.3;FBSS/2; FBCR/SFR;FBID/phone;FBLC/fr_FR]",
        iconStyle: 'background-image: url("https://icon-library.com/images/play-store-icon/play-store-icon-9.jpg");'
    }
];