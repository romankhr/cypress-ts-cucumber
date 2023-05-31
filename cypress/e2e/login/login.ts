import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "pages";

Given("I am open the login page", () => {
  cy.visit("https://qas-eastus-hrvyst-app.azurewebsites.net/login");
});

When("Click login button on login page", () => {
  LoginPage.clickLoginButton();
});

When("Insert username {string} and password {string} on on login page", (email, password) => {
  LoginPage.login(email, password);
});

Then("I should be redirected to the dashboard page", () => {
  cy.url().should("include", "/dashboard");
});

Then("see a welcome message", () => {
  cy.get(".welcome-message").should("contain", "Welcome back!");
});
