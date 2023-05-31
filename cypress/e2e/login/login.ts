import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "pages";
import { HomePage } from "pages";

Given("I am open the login page", () => {
  LoginPage.visit();
});

When("Click login button on login page", () => {
  LoginPage.clickLoginButton();
});

When("Insert username {string} and password {string} on login page", (email, password) => {
  LoginPage.login(email, password);
});

When("Insert username {string} on login page", (email) => {
  LoginPage.loginEmail(email);
});

Then("Verify I successfully Logined to HRVYSTHEDGE", () => {
  HomePage.verifyTitle();
});

Then("Verify login error message while user enteres invalid email {string} on login page", (email) => {
  LoginPage.verifyLoginEmailErrorMessage(email);
});

Then("Verify password error message while user enteres valid email {string} and invalid password {string} on login page", (email, password) => {
  LoginPage.verifyLoginPasswordErrorMessage(email, password);
});

Then("see a welcome message", () => {
  cy.get(".welcome-message").should("contain", "Welcome back!");
});
