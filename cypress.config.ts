import { defineConfig } from "cypress";
import webpack from "@cypress/webpack-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import path from "path";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
          alias: {
            pages: path.resolve(__dirname, "cypress/pages"),
          },
        },
        module: {
          rules: [
            {
              // Match js, jsx, ts & tsx files
              test: /\.[jt]sx?$/,
              loader: "esbuild-loader",
              options: {
                // JavaScript version to compile to
                target: "es2015",
              },
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    }),
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    pageLoadTimeout: 80000,
		defaultCommandTimeout: 10000,
		video: false,
		retries: 0,
		scrollBehavior: 'center',
		chromeWebSecurity: false,
		watchForFileChanges: true,
    setupNodeEvents,
    baseUrl: "https://qas-eastus-hrvyst-app.azurewebsites.net/login",
    viewportHeight: 1080,
		viewportWidth: 1920,
  },
  video: false,
  screenshotOnRunFailure: true,
  experimentalModifyObstructiveThirdPartyCode: true,  
});
