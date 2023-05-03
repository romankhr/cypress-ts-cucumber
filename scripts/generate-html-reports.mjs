import { generate } from "multiple-cucumber-html-reporter";

generate({
  jsonDir: "jsonlogs",
  reportPath: "./report/cucumber-html-report",
});
