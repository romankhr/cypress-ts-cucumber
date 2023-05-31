class LoginPage{

    elements={
    loginButton: () => cy.get("[data-testid='login-button']")
};

clickLoginButton(){
      this.elements.loginButton().click();
}

login (email: any, password: any){
     const args = { email, password };
     cy.origin('https://login.microsoftonline.com/', { args }, ({ email, password }) => {
        cy.get('input[type="email"]').should('be.visible').type(email);
        cy.get('#idSIButton9').click();
        cy.get('input[type="password"]').should('be.visible').type(password);
        cy.get('#idSIButton9').click();

    // cy.get('input[type="email"]').should('be.visible').type(email);
    // cy.get('#idSIButton9').click();
    // cy.get('input[type="password"]').should('be.visible').type(password);
    // cy.get('#idSIButton9').click();

        });
    }
}

export default new LoginPage();