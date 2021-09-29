export function accessPage(page) {
    cy.visit(page);
    cy.get('[type="button"]')
        .contains('Aceito')
        .click();
};

export function validateMessagesToast(messages) {
    cy.wait(1000);
    cy.get('[data-test=toast-content]').should('have.text', messages);
    cy.get('.sc-cmTdod').click({ force: true });
};

export function validateMessages(messages) {
    cy.contains(messages).should('be.visible');
};