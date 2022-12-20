import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080/discovery",

    defaultCommandTimeout: 12000,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
