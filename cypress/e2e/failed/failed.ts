import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
  cy.visit("/login");
});

When("I enter valid credentials", () => {
  cy.get("#username").type("myusername");
  cy.get("#password").type("mypassword");
});

When("click the login button", () => {
  cy.get("#login-btn").click();
});

Then("I should be redirected to the dashboard page", () => {
  cy.url().should("include", "/dashboard");
});

Then("see a welcome message", () => {
  cy.get(".welcome-message").should("contain", "Welcome back!");
});
