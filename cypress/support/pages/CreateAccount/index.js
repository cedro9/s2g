const el = require('./elements').ELEMENTS;
const msg = require('./messages').MESSAGES;

import { generateCPF, generateCNPJ, generatePassword, generateEmail } from '../scripts/generates'
import { accessPage, validateMessages, validateMessagesToast } from '../commons'

export function createUser(type, name, birthday) {
    if (type == 'person') {
        accessPage(Cypress.env('pgSignupPerson'));
        fillPersonalData(name, birthday);
    } else {
        accessPage(Cypress.env('pgSignupCompany'));
        fillCompanyData('Company Test Automation');
        fillPersonalData(name, birthday);
    };
};

export function fillPersonalData(name, birthday) {
    var cpf = generateCPF();
    var email = generateEmail();
    var password = generatePassword();
    cy.get(el.name).type(name);
    cy.get(el.email).type(email);
    cy.get(el.cpf).type(cpf);
    cy.get(el.birthday).type(birthday);
    cy.get(el.password).type(password);
    cy.get(el.passwordConfirmation).type(password);
    cy.get(el.checkboxTerms).check({force: true});
    cy.get(el.submitFormPerson).click();
};

export function fillCompanyData(fantasyName) {
    var cnpj = generateCNPJ();
    cy.get(el.fantasyName).type(fantasyName);
    cy.get(el.cnpj).type(cnpj);
    cy.get(el.submitFormCompany).click();
};

export function validateUserCreation() {
    cy.url().should('eq', Cypress.config('baseUrl') + Cypress.env('pgSignupSuccess'));
    cy.contains(`Bem-vindo!`, { timeout: 1000 }).should('be.visible');
};

export function validateFieldsRequired(type) {
    if (type == 'person') {
        accessPage(Cypress.env('pgSignupPerson'));
        fieldsRequiredPerson();
    } else {
        accessPage(Cypress.env('pgSignupCompany'));
        fieldsRequiredCompany();
    };
};

export function checkFieldsInvalid(type) {
    if (type == 'person') {
        accessPage(Cypress.env('pgSignupPerson'));
        fieldsInvalidPerson();
    }
};

export function checkDocInvalid(type) {
    if (type == 'person') {
        accessPage(Cypress.env('pgSignupPerson'));
        docInvalidPerson();
    } else {
        accessPage(Cypress.env('pgSignupCompany'));
        docInvalidCompany();
    }
};

export function checkPasswordInvalid(type) {
    if (type == 'person') {
        accessPage(Cypress.env('pgSignupPerson'));
        passWordInvalidPerson();
    }
};

export function checkPassDifferent() {
    accessPage(Cypress.env('pgSignupPerson'));
    cy.get(el.password).type('Valid');
    cy.get(el.passwordConfirmation).type('Valid123');
    cy.get(el.checkboxTerms).check({force: true});
    validateMessages(msg.differentPassword);
};

function fieldsRequiredPerson() {
    cy.get(el.name).click();
    cy.get(el.email).click();
    cy.get(el.cpf).click();
    cy.get(el.birthday).click();
    cy.get(el.password).click();
    cy.get(el.passwordConfirmation).click();
    cy.get(el.checkboxTerms).check({force: true});
    validateMessages(msg.requiredName);
    validateMessages(msg.requiredEmail);
    validateMessages(msg.requiredCPF);
    validateMessages(msg.requiredBirthday);
    validateMessages(msg.requiredPassword);
    validateMessages(msg.requiredConfirmPassword);
};

function fieldsInvalidPerson() {
    cy.get(el.email).type('email@mail');
    cy.get(el.phone).type('11');
    cy.get(el.checkboxTerms).check({force: true});
    validateMessages(msg.fillEmailValid);
    validateMessages(msg.fillPhoneValid);
};

function docInvalidPerson() {
    var email = generateEmail();
    var password = generatePassword();
    cy.get(el.name).type('User Test Automation');
    cy.get(el.email).type(email);
    cy.get(el.cpf).type('123456');
    cy.get(el.birthday).type('01011957');
    cy.get(el.password).type(password);
    cy.get(el.passwordConfirmation).type(password);
    cy.get(el.checkboxTerms).check({force: true});
    cy.get(el.submitFormPerson).click();
    validateMessagesToast(msg.invalidCPF);
};

function passWordInvalidPerson() {
    var cpf = generateCPF();
    var email = generateEmail();
    cy.get(el.name).type('User Test Automation');
    cy.get(el.email).type(email);
    cy.get(el.cpf).type(cpf);
    cy.get(el.birthday).type('01011957');
    cy.get(el.password).type('Valid');
    cy.get(el.passwordConfirmation).type('Valid');
    cy.get(el.checkboxTerms).check({force: true});
    cy.get(el.submitFormPerson).click();
    validateMessagesToast(msg.invalidPassword);
};

function fieldsRequiredCompany() {
    cy.get(el.submitFormCompany).click();
    validateMessages(msg.requiredFantasyName);
    validateMessages(msg.requiredCNPJ);
};

function docInvalidCompany() {
    cy.get(el.fantasyName).type('Company Test Automation');
    cy.get(el.cnpj).type('11111111111111');
    cy.get(el.submitFormCompany).click();
    fillPersonalData('User Test Automation', '01011957')
    validateMessagesToast(msg.invalidCNPJ);
};