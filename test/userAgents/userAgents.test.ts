import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'
import { androidUserAgents, desktopUserAgents, iosUserAgentsForNative, iosUserAgentsNativeNotSupported } from './userAgents'
import { buildUserAgentTests } from "./userAgentTestBuilder";
import { SmartAppBannerPlatform } from '../../src/runtime/types';

describe('Banner appearing depending on userAgent default config', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/basic', import.meta.url)),
    browser: true,
    configFile: fileURLToPath(new URL('./nuxt.config.ts', import.meta.url)),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it('not renders the SmartBanner component if default user-agent', async () => {
    await buildUserAgentTests({
      agents: ["default"],
      platform: SmartAppBannerPlatform.android,
      shouldShow: false
    });
  })

  it('not renders the SmartBanner component if desktop user-agent', async () => {
    await buildUserAgentTests({
      agents: desktopUserAgents,
      platform: SmartAppBannerPlatform.android,
      shouldShow: false
    });
  }, { timeout: 30000 })

  it('renders the android SmartBanner component if android user-agent', async () => {
    await buildUserAgentTests({
      agents: androidUserAgents,
      platform: SmartAppBannerPlatform.android,
      shouldShow: true
    });
  }, { timeout: 30000 })

  it('renders the ios SmartBanner component if ios user-agent which not support native', async () => {
    await buildUserAgentTests({
      agents: iosUserAgentsNativeNotSupported,
      platform: SmartAppBannerPlatform.ios,
      shouldShow: true
    });
  }, { timeout: 30000 })

  it('not renders the ios SmartBanner component if ios user-agent which support native', async () => {
    await buildUserAgentTests({
      agents: iosUserAgentsForNative,
      platform: SmartAppBannerPlatform.ios,
      shouldShow: false
    });
  }, { timeout: 30000 })
})


