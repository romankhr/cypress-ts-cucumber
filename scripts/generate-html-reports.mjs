import { generate } from "multiple-cucumber-html-reporter";
import { config as configEnv } from "dotenv";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

configEnv();

generate({
  jsonDir: "jsonlogs",
  reportPath: "./report/cucumber-html-report",
  metadata: {
    browser: {
      name: process.env.CYPRESS_BROWSER,
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
