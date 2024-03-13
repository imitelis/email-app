import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    LOCALHOST_URL: 'http://localhost:9000',
  },
  e2e: {
    setupNodeEvents(/* on, config */) {
      // implement node event listeners here
    },
  },
});
