import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { createPage, setup } from '@nuxt/test-utils'

const smartAppBannerElementsSelector = {
  viewButtonText: ".smartbanner-button-text",
  title: ".smartbanner-title",
  author: ".smartbanner-author",
  instore:".smartbanner-instore",
  viewButton: ".smartbanner-button",
  icon: ".smartbanner-icon",
  rootElement: {
      "android": ".smartbanner-android",
      "ios": ".smartbanner-ios"
  }
}

describe('Smart App Banner behaves correctly', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/basic', import.meta.url)),
    browser: true,
    configFile: fileURLToPath(new URL('./nuxt.config.ts', import.meta.url)),
  })

  it('Banner install click behaves correct', async () => {
    const page = await createPage('/', {
      userAgent: "Mozilla/5.0 (Linux; Android 12; Infinix X6819 Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/105.0.5195.79 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/396.1.0.28.104;]",
    });
    const installButton = await page.$(smartAppBannerElementsSelector.viewButton);
    await installButton?.click();
    await page.waitForTimeout(100);
    expect(page.url()).equal("https://play.google.com/store/apps/details?id=com.redlinegames.attackhole");
    await page.goBack();
    let banner = await page.$(smartAppBannerElementsSelector.rootElement["android"]);
    
    // banner should not be shown, cookies should be set
    expect(banner, "Banner shown after install click").equal(null);
    let cookies = await page.context().cookies();
    expect(cookies.some(cookie => {
      return cookie.name === "com.redlinegames.attackhole-smartbanner-installed" && cookie.value === "true"
    })).to.be.true;
    
    // should appear after reload when cookies cleared
    await page.context().clearCookies();
    await page.reload();
    await page.waitForTimeout(100);
    banner = await page.$(smartAppBannerElementsSelector.rootElement["android"]);
    expect(banner, "Banner not shown after cookies cleared").not.equal(null);
    const closeButton = await page.$(".smartbanner-close");
    await closeButton?.click();
    banner = await page.$(smartAppBannerElementsSelector.rootElement["android"]);
    
    expect(banner, "Banner not closed").equal(null);
    cookies = await page.context().cookies();
    expect(cookies.some(cookie => {
      return cookie.name === "com.redlinegames.attackhole-smartbanner-closed" && cookie.value === "true"
    })).to.be.true;
    //page.context().
    await page.reload();
    await page.waitForTimeout(100);
    // banner should not be shown after reload
    banner = await page.$(smartAppBannerElementsSelector.rootElement["android"]);
    expect(banner, "Banner shown after close click").equal(null);
  })

})