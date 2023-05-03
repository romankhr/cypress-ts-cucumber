class CoursePage {
  readonly url: string = "/";

  elements = {
    title: () => cy.get("h1"),
    link: () => cy.get("a"),
  };

  visit() {
    cy.visit(this.url);
  }

  clickLink() {
    this.elements.link().click();
  }
}

export default new CoursePage();
