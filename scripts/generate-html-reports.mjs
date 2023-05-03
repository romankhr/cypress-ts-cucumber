import { generate } from "multiple-cucumber-html-reporter";
import { config as configEnv } from "dotenv";
import { promisify } from "util";
import getOs from "getos";
const getOsPromisified = promisify(getOs);

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

configEnv();

async function getOsInfo() {
  try {
    const os = await getOsPromisified();
    return os;
  } catch (error) {
    console.log(error);
  }
}

getOsInfo().then((info) => {
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
        name: info.dist,
        version: info.release,
      },
    },
  });
});
