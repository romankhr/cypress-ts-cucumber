import open from "open";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const reportLocation = path.resolve(
  __dirname,
  "../report/cucumber-html-report",
  "index.html",
);

if (fs.existsSync(reportLocation)) {
  open(reportLocation).catch((err) => console.error(err));
} else {
  console.log("File not found");
}
