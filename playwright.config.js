// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 20 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    }
  }
});

module.exports = config;
