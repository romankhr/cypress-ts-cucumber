/// <reference types="cypress" />

Cypress.Commands.add("getByDataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('dataTestId', (value) => {
	return cy.get(`[data-testid=${value}]`);
});


Cypress.Commands.add('enterTwoDates', (dateOne: string, dateTwo: string) => {
	cy.get('.ant-picker-input').first().type(dateOne);
	cy.get('body').click(0, 0);
	cy.get('.ant-picker-input').eq(1).type(dateTwo);
	cy.get('body').click(0, 0);
});

Cypress.Commands.add('selectOptionFromDropdown', () => {
	cy.get('[class^="ant-select-dropdown"]').last().invoke('show').find('div').first().click();
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getByDataCy(value: string): Chainable<JQuery<HTMLElement>>;
      dataTestId(value: string): Chainable<JQuery<HTMLElement>>;
      enterTwoDates(value1: string, value2: string): Chainable<JQuery<HTMLElement>>;
      selectOptionFromDropdown(): Chainable<JQuery<HTMLElement>>;
    }
  }
}



// https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-module
export {};
