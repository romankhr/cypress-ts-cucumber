/// <reference types="cypress" />

Cypress.Commands.add("getByDataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getByDataCy(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-module
export {};
