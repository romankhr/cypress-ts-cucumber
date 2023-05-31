class LoginPage {
    readonly baseURL: string = "https://qas-eastus-hrvyst-app.azurewebsites.net/login";
    elements = {
        loginButton: () => cy.get("[data-testid='login-button']"),
        loginEmailErrorMessage: () => cy.get("#usernameError"),
        loginPasswordErrorMessage: () => cy.get("#passwordError")

    };
    visit() {
        cy.visit(this.baseURL);
    }

    clickLoginButton() {
        this.elements.loginButton().click();
    }

    login(email: any, password: any) {
        const args = { email, password };
        cy.origin('https://login.microsoftonline.com/', { args }, ({ email, password }) => {
            cy.get('input[type="email"]').should('be.visible').type(email);
            cy.get('#idSIButton9').click();
            cy.get('input[type="password"]').should('be.visible').type(password);
            cy.get('#idSIButton9').click();
            cy.get('#idSIButton9').click();
        });
    }

    loginEmail(email: any) {
        const args = { email };
        cy.origin('https://login.microsoftonline.com/', { args }, ({ email }) => {
            cy.get('input[type="email"]').should('be.visible').type(email);
            cy.get('#idSIButton9').click();
        });
    }

    verifyLoginEmailErrorMessage(email: any) {
        const args = { email };
        cy.origin('https://login.microsoftonline.com/', { args }, ({ email }) => {
            cy.get('input[type="email"]').should('be.visible').type(email);
            cy.get('#idSIButton9').click();
            cy.get('#usernameError').then($emailError => {
                expect($emailError.text()).to.equal('This username may be incorrect. Make sure that you typed it correctly. Otherwise, contact your admin.');
              });
        });
    }

    verifyLoginPasswordErrorMessage(email: any, password: any) {
        const args = { email, password };
        cy.origin('https://login.microsoftonline.com/', { args }, ({ email, password }) => {
            cy.get('input[type="email"]').should('be.visible').type(email);
            cy.get('#idSIButton9').click();
            cy.get('input[type="password"]').should('be.visible').type(password);
            cy.get('#idSIButton9').click();
            cy.get("#passwordError").should('have.text', 'Your account or password is incorrect. If you can\'t remember your password, reset it now.')
        });
    }
}

export default new LoginPage();