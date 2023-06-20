/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { todaySDate } from "../../cypress/fixtures/date";

class HomePage {
  hrvystId = "";
  txt = "";

  retriveHrvystID() {
    this.elements.hrvystIdLocator().then(($el) => {
      this.hrvystId = $el.text();
      this.txt = $el.text();
      cy.log(`${this.hrvystId}`);
    });
  }

  elements = {
    title: () => cy.get("title"),
    actionsHubButton: () =>
      cy.xpath("//span[contains(text(), 'Actions Hub')]/.."),
    treeDotsMenuButton: () =>
      cy.xpath("(//tbody[@class='ant-table-tbody']//tr[2]//button)[2]"),
    hrvystIdLocator: () =>
      cy.xpath("//tbody[@class='ant-table-tbody']//tr[2]/td[5]"),
    hrvystIdLocatorSecondPart: () =>
      cy.xpath("//tbody[@class='ant-table-tbody']//tr[2]/td[5]//span[2]"),
    quantityToPriceLocator: () => cy.xpath("//input[@name='qtyPriceAmount']"),
    balanceUPLocator: () => cy.xpath("//tbody[@class='ant-table-tbody']//tr[2]/td[16]//span"),
    quantityToRollLocator: () => cy.xpath("(//label[contains(text(), 'Quantity')]/../..//input)[2]"),
    spreadLocator: () => cy.xpath("(//label[contains(text(), 'Spread')]/../..//input)[1]"),
    treeDotsHtaContractMenuButton: () => cy.xpath("(//tbody[@class='ant-table-tbody']//tr[2]/td[4]//span[text()='HTA']/../../../../../..//button)[2]"),
    eventCancelledLocator: () => cy.xpath("//tbody[@class='ant-table-tbody']//tr[2]/td[6]//span"),
    maxAmountToCancelInputFieldLocator: () => cy.xpath("//p[contains(text(), 'Max amount to Cancel')]/../..//input"),
  };

  verifyTitle() {
    this.elements.title().should("have.text", "Transactions - HRVYSTHEDGE");
  }

  clickTab(tabName: string) {
    cy.log(`Click ${tabName} button`);
    cy.get("[class$=sidebar__tooltip]").contains(tabName).click();
  }

  clickLeftMenuItem(menuItem: any) {
    cy.get("span").contains(menuItem).click();
  }

  activateBypass(activateBypass: any) {
    cy.get('[data-testid="bypass-form-switch"]').then(($btn) => {
      if (!$btn[0].ariaChecked === activateBypass) {
        cy.get('[data-testid="bypass-form-switch"]').click();
        cy.get('[data-testid="form-button-submit"]').click();
        cy.wait("@bypassToggleChanged");
      }
    });
  }

  clickButton(buttonName: string) {
    cy.log(`Click ${buttonName} button`);
    try {
      cy.xpath("//body").then(($element) => {
        if ($element.find("[data-testid='confirm-button']").length > 0) {
          cy.xpath("//button[@data-testid='confirm-button']").click();
        }
      });
    } catch (error) {
      cy.log("error.message");
    }
    cy.wait(2000);
    cy.xpath(`//span[contains(text(), '${buttonName}')]/..`).click();
  }

  clickButtonFromActionsHubDropdown(buttonName: string) {
    cy.log(`Click ${buttonName} button`);
    cy.xpath(
      `//ul[contains(@class, 'ant-dropdown-menu')]//span[contains(text(), '${buttonName}')]/..`,
    ).click();
  }

  fillInputField(inputField: string, inputText: string) {
    cy.log(`fill ${inputText} into ${inputField} input field`);
    cy.xpath(
      `(//label[contains(text(), '${inputField}')]/../..//input)[1]`,
    ).type(`${inputText}`);
  }

  createContract(entry: string, datatable: any) {
    cy.log(`Create contract ${entry}`);
    datatable.hashes().forEach((element: any) => {
      if (element.TheirContract != "empty") {
        cy.xpath(
          `(//label[contains(text(), 'Their Contract')]/../..//input)[1]`,
        ).type(element.TheirContract);
      }
      const transaction: string = element.Transaction;
      cy.xpath(
        `//label[contains(text(), 'Transaction')]/../..//div[@class='ant-select-selector']`,
      ).click();
      cy.xpath(
        `//div[@class='ant-select-item-option-content' and contains(text(), '${transaction}')]`,
      ).click();
      const contract: string = element.Contract;
      cy.xpath(
        `//label[contains(text(), 'Contract')]/../..//div[@class='ant-select-selector']`,
      ).click();
      cy.xpath(
        `//div[@class='ant-select-item-option-content' and contains(text(), '${contract}')]`,
      ).click();
      const baySell: string = element.Bay_Sell;
      baySell === "sell"
        ? cy.get('input[type="radio"]').eq(1).click({ force: true })
        : cy.get('input[type="radio"]').eq(0).click({ force: true });
      const commodity: string = element.Commodity;
      cy.xpath(
        `//label[contains(text(), 'Commodity')]/../..//div[@class='ant-select-selector']`,
      ).click();
      cy.xpath(
        `//div[@class='ant-select-item-option-content' and text()='${commodity}']`,
      ).click();
      const deliveryLocation: string = element.DeliveryLocation;
      cy.xpath(
        `//label[contains(text(), 'Delivery Location')]/../..//div[@class='ant-select-selector']`,
      )
        .wait(1000)
        .click();
      cy.xpath(
        `//div[@class='ant-select-item-option-content' and contains(text(), '${deliveryLocation}')]`,
      )
        .wait(1000)
        .click({ force: true });
      cy.xpath(
        `//label[contains(text(), 'Crop Year')]/../..//span[contains(text(), '2023')]`,
      ).click();
      cy.log(`Insert Quantity `);
      cy.xpath(`(//label[contains(text(), 'Quantity')]/../..//input)[1]`).type(
        element.Quantity,
      );
      const futurePrice: string = element.FuturesPrice;
      const futureMonth: string = element.FuturesMonth;
      cy.log(`Future Price ${futurePrice} `);
      cy.dataTestId("customer-form-item")
        .children()
        .eq(1)
        .type("0000")
        .wait(9000);
      cy.selectOptionFromDropdown();
      if (contract === "HTA") {
        cy.enterTwoDates(todaySDate, todaySDate);
        cy.log(`Insert Future Month ${futureMonth}`);
        cy.dataTestId("futures-month-input").click();
        cy.get(".ant-select-item-option-content").contains(futureMonth).click();
      }
      if (contract === "Basis") {
        const deliveryWindow: string = element.DeliveryWindow;
        cy.xpath(
          `//label[contains(text(), 'Delivery Window')]/../..//div[@class='ant-select-selector']`,
        ).click();
        cy.xpath(
          `//div[@class='ant-select-item-option-content' and contains(text(), '${deliveryWindow}')]`,
        ).click({ force: true });
        cy.dataTestId("futures-month-input").click();
        cy.get(".ant-select-item-option-content").contains(futureMonth).click();
        if (element.DeliveryWindow === "Custom") {
          cy.enterTwoDates(todaySDate, todaySDate);
          cy.dataTestId("push-basis-input-item").type("0.1");
          cy.dataTestId("posted-basis-input-item").type("0.1");
        }
      }
      if (
        entry === "Contract" &&
        (contract === "Flat Price" || contract === "HTA")
      ) {
        cy.log(`Insert Future Price ${futurePrice}`);
        cy.dataTestId("futures-price-icon").click({ force: true });
        cy.dataTestId("futures-price-input").clear().type(futurePrice);
      }
      if (contract === "Flat Price") {
        cy.dataTestId("push-basis-input-item").type("0.1");
        cy.dataTestId("posted-basis-input-item").type("0.1");
        cy.xpath("//div[@name='deliveryDateWindow']")
          .children()
          .first()
          .children()
          .first()
          .click();
        cy.selectOptionFromDropdown();
      }
      // // submit entry
      entry === "Offer"
        ? cy.get('button[type="submit"]').contains("Submit Offer").click()
        : cy.dataTestId("create-new-modal-btn").click();
    });
  }

  verifyContractCreated() {
    cy.xpath(`//div[contains(text(), 'Success')]`)
      .wait(2000)
      .should("be.visible");
  }

  chooseMenuItemfromTreeDots(menuItem: string) {
    try {
      cy.xpath("//body").then(($element) => {
        if ($element.find("[data-testid='confirm-button']").length > 0) {
          cy.xpath("//button[@data-testid='confirm-button']").click();
        }
      });
    } catch (error) {
      cy.log("error.message");
    }
    cy.wait(2000);
    this.elements.treeDotsMenuButton().click();
    cy.xpath(`//span[text()='${menuItem}']`).wait(3000).click();
  }

  editContract(datatable: any) {
    cy.log(`Edit contract`);
    datatable.hashes().forEach((element: any) => {
      const deliveryLocation: string = element.DeliveryLocation;
      cy.xpath(
        `//label[contains(text(), 'Delivery Location')]/../..//div[@class='ant-select-selector']`,
      )
        .wait(1000)
        .click();
      cy.xpath(
        `//div[@class='ant-select-item-option-content' and contains(text(), '${deliveryLocation}')]`,
      )
        .wait(1000)
        .click({ force: true });
      cy.log(`Insert Quantity `);
      cy.xpath(`(//label[contains(text(), 'Quantity')]/../..//input)[1]`)
        .clear()
        .type(element.Quantity);
      const futureMonth: string = element.FuturesMonth;
      cy.enterTwoDates(todaySDate, todaySDate);
      cy.log(`Insert Future Month ${futureMonth}`);
      cy.dataTestId("futures-month-input").click();
      cy.get(".ant-select-item-option-content").contains(futureMonth).click();
      cy.get('button[type="submit"]')
        .contains("Submit Contract Changes")
        .click({ force: true });
    });
  }

  editPriceContract(datatable: any) {
    cy.log(`Edit price contract`);
    datatable.hashes().forEach((element: any) => {
      this.elements.quantityToPriceLocator().type(element.QuantityToPrice);
      cy.dataTestId("posted-basis-input-item").type("0.5");
      cy.get('button[type="submit"]').contains("Price").click({ force: true });
    });
  }

  skipAlert() {
    cy.log(`Skip Alert`);
    try {
      cy.xpath("//body").then(($element) => {
        if ($element.find("[data-testid='confirm-button']").length > 0) {
          cy.xpath("//button[@data-testid='confirm-button']").click();
        }
      });
    } catch (error) {
      cy.log("error.message");
    }
    cy.wait(2000);
  }

  verifyContractPriced() {
    cy.log(`Verify Contract Priced`);
    cy.log(`${this.hrvystId}`);
    this.elements.hrvystIdLocatorSecondPart().should('have.text',`${this.hrvystId}`);  
    this.elements.balanceUPLocator().should('have.text',`UP ---`);  
  }

  editRollContract(datatable: any) {
    cy.log(`Edit roll contract`);
    datatable.hashes().forEach((element: any) => {
      this.elements.quantityToRollLocator().type(element.QuantityToRoll);
      const futureMonth: string = element.FuturesMonth;
      cy.log(`Insert Future Month ${futureMonth}`);
      cy.dataTestId("futures-month-input").click();
      cy.get(".ant-select-item-option-content").contains(futureMonth).click();
      this.elements.spreadLocator().type(element.Spread);
      cy.get('button[type="submit"]').contains("Roll").click({ force: true });
    });
  }
  
  verifyContractRolled() {
    cy.log(`Verify Contract Rolled`);
    cy.log(`${this.hrvystId}`);
    this.elements.hrvystIdLocatorSecondPart().should('have.text',`${this.hrvystId}`);  
    this.elements.balanceUPLocator().should('have.text',`UP 2,000.00`);  
  }

  clickTreeDotsMenuHtaConrtact() {
    cy.log(`Click three dots menu of HTA Contract`);
    try {
      cy.xpath("//body").then(($element) => {
        if ($element.find("[data-testid='confirm-button']").length > 0) {
          cy.xpath("//button[@data-testid='confirm-button']").click();
        }
      });
    } catch (error) {
      cy.log("error.message");
    }
    cy.wait(1000);
    this.elements.treeDotsHtaContractMenuButton().click();  
  }

  verifyTreeDotsMenuIten(menuItem: string) {
    cy.log(`Verify three dots menu ${menuItem}`);
    cy.xpath(`(//div[@class='actions'])[1]//span`).should('not.contain', menuItem);
  }
   
  verifyContractCancelled() {
    cy.log(`Verify Contract Cancelled`);
    this.elements.eventCancelledLocator().should('have.attr', 'aria-label',`stop`); 
  }
     
  incertMaxAmmountToCancelContract() {
    cy.log(`Incert Max Ammount To Cancel Contract`);
    this.elements.maxAmountToCancelInputFieldLocator().invoke('attr', 'placeholder').then((placeholder) =>{
      cy.log(placeholder as string);
      this.elements.maxAmountToCancelInputFieldLocator().type(placeholder as string);
    })      
  }

  clickButtonOnCancellContract(buttonName: string) {
    cy.log(`Click ${buttonName} button on Cancel Contract`);
    cy.xpath(`//div[@class='ant-modal-content']//span[contains(text(), '${buttonName}')]/..`).click();
  }


}

export default new HomePage();
