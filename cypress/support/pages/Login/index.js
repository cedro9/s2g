const el = require('./elements').ELEMENTS;
const msg = require('./messages').MESSAGES;

import { accessPage } from '../commons'

export function login(type, environment) {
    accessPage(Cypress.env('pgSignin'));
    if (type == 'person' && environment == 'DEV') {
        cy.get(el.username).type(Cypress.env('userPersonDEV'));
        cy.get(el.password).type(Cypress.env('passPersonDEV'));
        cy.get(el.submitLogin).click();
        closeIntroduction();
    } else if (type == 'person' && environment == 'HML') {
        cy.get(el.username).type(Cypress.env('userPersonHML'));
        cy.get(el.password).type(Cypress.env('passPersonHML'));
        cy.get(el.submitLogin).click();
        closeIntroduction();
    } else if (type == 'person' && environment == 'PRD') {
        cy.get(el.username).type(Cypress.env('userPersonPRD'));
        cy.get(el.password).type(Cypress.env('passPersonPRD'));
        cy.get(el.submitLogin).click();
        closeIntroduction();
    } else if (type == 'company' && environment == 'DEV') {
        cy.get(el.username).type(Cypress.env('userCompanyDEV'));
        cy.get(el.password).type(Cypress.env('passCompanyDEV'));
        cy.get(el.submitLogin).click();
        closeIntroduction();
    } else if (type == 'company' && environment == 'HML') {
        cy.get(el.username).type(Cypress.env('userCompanyHML'));
        cy.get(el.password).type(Cypress.env('passCompanyHML'));
        cy.get(el.submitLogin).click();
        closeIntroduction();
    } else if (type == 'company' && environment == 'PRD') {
        cy.get(el.username).type(Cypress.env('userCompanyPRD'));
        cy.get(el.password).type(Cypress.env('passCompanyPRD'));
        cy.get(el.submitLogin).click();
        closeIntroduction();
    } else if (type == 'invalid' && environment == 'password') {
        cy.get(el.username).type('email@mail.com');
        cy.get(el.password).type('1234');
        cy.get(el.submitLogin).click();
    } else if (type == 'invalid' && environment == 'email') {
        cy.get(el.username).type('email@mail.');
        cy.get(el.password).type(Cypress.env('passPersonHML'));
    } else if (type == 'blank' && environment == 'email') {
        cy.get(el.username).click()
        cy.get(el.password).type(Cypress.env('passPersonHML'));
    };
};

export function validateLogin() {
    cy.url().should('eq', Cypress.config('baseUrl') + Cypress.env('pgApp'));
    cy.get(el.profileIcon).should('be.visible');
};

function closeIntroduction() {
    cy.get(el.closeIntroduction)
        .contains('Pular introdução')
        .click()
};