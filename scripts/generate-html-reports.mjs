import { generate } from "multiple-cucumber-html-reporter";
import { config as configEnv } from "dotenv";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

configEnv();

console.log("Browser version:", process.env.CYPRESS_BROWSER_VERSION);

generate({
  jsonDir: "jsonlogs",
  reportPath: "./report/cucumber-html-report",
  metadata: {
    browser: {
      name: process.env.CYPRESS_BROWSER,
      version: process.env.CYPRESS_BROWSER_VERSION || "XX.xx",
    },
    device: isGithubActions ? "Github Actions" : "Local Machine",
    platform: {
      name: "Ubuntu",
      version: process.env.GITHUB_ACTIONS
        ? process.env.CYPRESS_UBUNTU__VERSION
        : "20.04",
    },
  },
});
