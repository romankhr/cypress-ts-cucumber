import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { HomePage } from "pages";

When("I visit example.com", () => {
  HomePage.visit();
});

Then("I should see some text", () => {
  HomePage.elements.title();
  HomePage.elements.link().contains("More information...");
});
