import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "pages";
import { HomePage } from "pages";

Given("I am open the login page", () => {
  LoginPage.visit();
});

When("Click login button on login page", () => {
  LoginPage.clickLoginButton();
});

When(
  "Insert username {string} and password {string} on login page",
  (email, password) => {
    LoginPage.login(email, password);
  },
);

When("User clicks {string} on home page", (tabName: string) => {
  HomePage.clickTab(tabName);
});

When("User clicks {string} on left menu on home page", (menuItem) => {
  HomePage.clickLeftMenuItem(menuItem);
});

When("User set {string} for Activate Bypass on home page", (activateBypass) => {
  HomePage.activateBypass(activateBypass);
});

When("User clicks {string} button on home page", (buttonName: string) => {
  HomePage.clickButton(buttonName);
});

When(
  "User clicks {string} button on Actions Hub dropdown on home page",
  (buttonName: string) => {
    HomePage.clickButtonFromActionsHubDropdown(buttonName);
  },
);

When(
  "User insert {string} text into {string} field on home page",
  (text: string, inputField: string) => {
    HomePage.fillInputField(inputField, text);
  },
);

When(
  "User create {string} with following data", (entry: string, datatable) => {
    HomePage.createContract(entry, datatable);
  },
);

Then(
  "Verify that contract was succesfully created", () => {
    HomePage.verifyContractCreated();
  },
);

When(
  "User clicks 'Three dots' menu of created contract and select {string} on home page", (menuItem: string) => {
    HomePage.chooseMenuItemfromTreeDots(menuItem);
  },
);

When(
  "User edits Contract with following data", (datatable) => {
    HomePage.editContract(datatable);
  },
);

When(
  "Retrive Hrvyst ID of created contract on home page", () => {
    HomePage.retriveHrvystID();
  },
);

When(
  "User edits Price Contract with following data", (datatable) => {
    HomePage.editPriceContract(datatable);
  },
);

When(
  "Skip Alert if it is appear", () => {
    HomePage.skipAlert();
  },
);

When(
  "Verify that a Contract can be Priced", () => {
    HomePage.verifyContractPriced();
  },
);

When(
  "User edits Roll Contract with following data", (datatable) => {
    HomePage.editRollContract(datatable);
  },
);

When(
  "Verify that contract was succesfully rolled", () => {
    HomePage.verifyContractRolled();
  },
);

When(
  "Click three dots menu of random HTA contract on home page", () => {
    HomePage.clickTreeDotsMenuHtaConrtact();
  },
);

When(
  "The three dots menu does not have the option to {string} on home page", (menuItem: string) => {
    HomePage.verifyTreeDotsMenuIten(menuItem);
  },
);

When(
  "User incerts Max amount to Cancel Contract on home page", () => {
    HomePage.incertMaxAmmountToCancelContract();
  },
);

When(
  "Verify that contract was succesfully cancelled", () => {
    HomePage.verifyContractCancelled();
  },
);

When(
  "User clicks {string} button on Cancel Contract on home page", (buttonName: string) => {
    HomePage.clickButtonOnCancellContract(buttonName);
  },
);