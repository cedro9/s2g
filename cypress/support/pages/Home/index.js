const el = require('./elements').ELEMENTS;
const msg = require('./messages').MESSAGES;

import { validateMessagesToast } from '../commons';

export function removeDocument(documentName, status) {
    searchDocumentHome(documentName);
    if (status == 'Em andamento') {
        cy.get('tbody')
            .contains(documentName)
            .parent()
            .parent()
            .find('button')
            .click();
        cy.get(el.buttonCancel).click();
        cy.get(el.deleteDoc)
            .click()
            .wait(1500)
        validateMessagesToast(msg.confirmCancelDoc);
    } else if (status == 'Rascunho') {
        cy.get('tbody')
            .contains(documentName)
            .parent()
            .parent()
            .find('button')
            .click();
        cy.get(el.buttonCancel).click();
        cy.get(el.deleteDoc)
            .click()
            .wait(1500)
        validateMessagesToast(msg.confirmCancelDoc);
    };
};

function searchDocumentHome(documentName) {
    cy.get(el.search)
        .type(documentName)
        .wait(1000);
};