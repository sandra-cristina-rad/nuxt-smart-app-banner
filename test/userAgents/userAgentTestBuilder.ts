import { createPage } from "@nuxt/test-utils";
import { expect } from "vitest";
import { SmartAppBannerPlatform } from "../../src/runtime/types";
import { smartAppBannerElementsSelector } from "../shared/selectors";

interface UserAgentTestOptionsBase {
    platform: SmartAppBannerPlatform;
    shouldShow: boolean
}

export type UserAgentTestsOptions = UserAgentTestOptionsBase & {
    agents: string[];
}

export type UserAgentTestOptions = UserAgentTestOptionsBase & {
    agent: string;
}

const getBannerPlatformSelector = (platform: SmartAppBannerPlatform) => {
    return smartAppBannerElementsSelector.rootElement[platform];
}

const buildMessage = (options: UserAgentTestOptions) =>
    (agent: string) => `${options.platform} banner ${options.shouldShow ? 'not shown' : 'shown'} for user-agent: ${agent}`

const buildUserAgentTest = async (options: UserAgentTestOptions) => {
    const page = await createPage('/', {
        userAgent: options.agent
    });
    const smartBannerRoot = await page.$(getBannerPlatformSelector(options.platform));
        const message = (buildMessage(options))(options.agent);
    const expectFuct = (smartBannerRoot, message) => options.shouldShow ? expect(smartBannerRoot, message).not.equal(null) : expect(smartBannerRoot, message).equal(null);
    expectFuct(smartBannerRoot, message);
    page.close();
}

export const buildUserAgentTests = async (options: UserAgentTestsOptions) => {
    if (!options || !options.agents || options.agents.length < 1) {
        return null;
    }
    for (let i = 0; i < options.agents.length; i++) {
        await buildUserAgentTest({
            platform: options.platform,
            shouldShow: options.shouldShow,
            agent: options.agents[i]
        });
    }
}