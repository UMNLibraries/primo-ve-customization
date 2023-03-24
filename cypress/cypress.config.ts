import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080/discovery",

    defaultCommandTimeout: 60_000,

    pageLoadTimeout: 120_000,

    chromeWebSecurity: false,

    retries: { runMode: 3 },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
