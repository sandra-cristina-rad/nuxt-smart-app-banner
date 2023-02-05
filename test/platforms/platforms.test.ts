import { describe, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup } from '@nuxt/test-utils'
import { buildPlatformTest } from './platformTestBuilder';
import { platformTestsProps } from './platformsTestProps';

describe('Smart App Banner elements rendered correctly', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/basic', import.meta.url)),
    browser: true,
    configFile: fileURLToPath(new URL('./nuxt.config.ts', import.meta.url)),
  })

  it('Android banner renders correctly', async () => {
    await buildPlatformTest(platformTestsProps[0]);
  })

  it('Ios banner renders correctly', async () => {
    await buildPlatformTest(platformTestsProps[1]);
  })

})