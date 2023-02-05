import { createPage } from "@nuxt/test-utils";
import { expect } from "vitest";
import { SmartAppBannerPlatform } from "../../src/runtime/types";
import { smartAppBannerElementsSelector } from "../shared/selectors";
import { Page } from 'playwright';

const checkElementExists = async (page: Page, selector: string) => {
    const error = `${selector} not found`;
    const actual = await page.$(selector);
    expect(actual, error).to.not.be.null;
}

const checkElementAttributeMatch = async (page: Page, selector: string, attribute: string,value: string) => {
    const error = `${selector} attribute: ${attribute} not match, expected: ${value}`;
    const actual = await (await page.$(selector))?.getAttribute(attribute);
    expect(actual, error).equal(value);
}

const checkElementTextMatch = async (page: Page, selector: string, value: string) => {
    const error = `${selector} text not match, expected: ${value}`;
    const actual = await (await page.$(selector))?.innerText();
    expect(actual, error).equal(value);
}

export interface PlatformTestProps{
    viewButtonText: string;
    title: string;
    author: string;
    instore: string;
    viewButtonHref: string;
    platform: SmartAppBannerPlatform;
    useAgent: string;
    iconStyle: string;
}

export const buildPlatformTest = async (props: PlatformTestProps) => {
    const page = await createPage('/', {
        userAgent: props.useAgent
    });
    
    await checkElementExists(page, smartAppBannerElementsSelector.rootElement[props.platform]);
    await checkElementTextMatch(page, smartAppBannerElementsSelector.author, props.author);
    await checkElementTextMatch(page, smartAppBannerElementsSelector.instore, props.instore);
    await checkElementTextMatch(page, smartAppBannerElementsSelector.title, props.title);
    await checkElementTextMatch(page, smartAppBannerElementsSelector.viewButtonText, props.viewButtonText);
    await checkElementAttributeMatch(page, smartAppBannerElementsSelector.viewButton, "href", props.viewButtonHref);
    await checkElementAttributeMatch(page, smartAppBannerElementsSelector.icon, "style", props.iconStyle);
    page.close();
}