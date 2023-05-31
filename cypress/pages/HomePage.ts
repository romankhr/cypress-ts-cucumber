class HomePage {

  elements = {
    title: () => cy.get("title"),
  };

  verifyTitle() {
    this.elements.title().should("have.text", "Transactions - HRVYSTHEDGE");
  }
}

export default new HomePage();
