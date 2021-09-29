const el = require('./elements').ELEMENTS;
const msg = require('./messages').MESSAGES;

import { accessPage } from '../commons'
import { validateMessagesToast } from '../commons';

export function recoverPassword(email) {
    accessPage(Cypress.env('pgForgotPassword'));
    cy.get(el.username).type(email);
    cy.get(el.submit).click();
};

export function resendEmailRecoverPassword(email) {
    recoverPassword(email);
    validateRecoverPassword();
    cy.get(el.submitResendEmail).click();
};

export function emailBlank() {
    accessPage(Cypress.env('pgForgotPassword'));
    cy.get(el.submit).click();
};

export function validateRecoverPassword() {
    validateMessagesToast(msg.resendEmail);
    cy.contains(msg.sendEmail).should('be.visible')
};