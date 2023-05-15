import { defineConfig, PlaywrightTestConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  use: {
    headless: !true,
    browserName: "chromium",
    /*launchOptions: {
      logger: {
        isEnabled: (name, severity) => name === 'browser',
        log: (name, severity, message, args) => console.log(`name => ${name} msg => ${message}`),
      },
    }*/
  }
}
export default config;
