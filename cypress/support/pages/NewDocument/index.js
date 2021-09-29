/// <reference types="cypress" />

const el = require('./elements').ELEMENTS;
const msg = require('./messages').MESSAGES;

import 'cypress-file-upload';
import { generateEmail, generateFutureDate } from '../scripts/generates'
import { validateMessages, validateMessagesToast } from '../commons';

export function validateFieldsRequiredParticipants(documentName) {
    uploadDocument('pdf');
    cy.get(el.initConfigNewDocument)
        .contains('Iniciar configuração')
        .click()
        .wait(1500);
    fillGeneralSettings(1, documentName);
    cy.get(el.addParticipants)
        .click({ force: true })
        .wait(3500);
    cy.get(el.addFields).click({ force: true });
    validateMessages(msg.requiredName);
    validateMessages(msg.requiredEmail);
    validateMessages(msg.requiredRole);
    cy.get(el.elButton)
        .contains('Cancelar configuração')
        .click()
        .wait(500);
};

export function invalidFieldsNewDocument() {
    var duedate = generateFutureDate(5);
    uploadDocument('pdf');
    cy.get(el.initConfigNewDocument)
        .contains('Iniciar configuração')
        .click()
        .wait(1500);
    cy.get(el.nameDocument).type('/');
    cy.get(el.dueDate).type(duedate);
    cy.get(el.acessCode).type('1');
    cy.get(el.addParticipants).click({ force: true });
    validateMessages(msg.invalidDocName);
    validateMessages(msg.invalidCode);
};

export function validateFieldsRequiredNewDocument() {
    uploadDocument('pdf');
    cy.get(el.initConfigNewDocument)
        .contains('Iniciar configuração')
        .click()
        .wait(1500);
    cy.get(el.addParticipants).click({ force: true });
    validateMessages(msg.requiredDoc);
    validateMessages(msg.requiredDue);
};

// participants = 0 configura documento com único signatário

export function createNewDocument(type, documentName, participants) {
    uploadDocument(type);
    cy
    // .get(el.initConfigNewDocument)
        .contains('Iniciar configuração')
        .click()
        .wait(1500);
    fillGeneralSettings(participants, documentName);
    cy.get(el.addParticipants)
        .click({ force: true })
        .wait(3500);
    addParticipants(participants);
    addFields('Assinatura', participants);
    cy.get(el.elButton)
        .contains('Enviar para assinatura')
        .click()
        .wait(1500);
};

export function validateNewDocumentCreation() {
    validateMessagesToast(msg.confirmConfigDoc);
    cy.url().should('eq', Cypress.config('baseUrl') + Cypress.env('pgApp'));
};

export function addParticipants(quantity) {
    if (quantity == 0) {
        cy.log('Sou o único signatário');
    } else {
        for (var i = 0; i < quantity; i++) {
            var email = generateEmail();
            cy.get('[id="signers[' + i + '].name"]').type('Participant ' + i + ' Test Automation');
            cy.get('[id="signers[' + i + '].email"]').type(email);
            cy.get('[id="signers[' + i + '].role"]').type('Role ' + i + ' Test Automation');
            cy.contains('Adicionar outro participante').click();
        };
        if (i++ == quantity) {
            cy.get(':nth-child(' + i + ') > .sc-bdVaJa > div > svg').click();
            cy.get(el.addFields)
                .click({ force: true })
                .wait(5000);
        };
    };
};

function uploadDocument(type) {
    const fileDocx = 'docx/document.docx'
    const filePdf = 'pdf/document.pdf'
    const fileImg = 'image/image.jpg'
    if (type == 'docx') {
        cy.get(el.uploadDocument).attachFile(fileDocx);
    } else if (type == 'pdf') {
        cy.get(el.uploadDocument).attachFile(filePdf);
    } else if (type == 'img') {
        cy.get(el.uploadDocument).attachFile(fileImg);
    } else {
        cy.get(el.uploadDocument).attachFile(fileDocx);
    };
};

function fillGeneralSettings(participants, documentName) {
    var duedate = generateFutureDate(5);
    if (participants == 0) {
        cy.contains('Sou o único signatário').click()
    };
    cy.get(el.nameDocument).type(documentName);
    cy.get(el.dueDate).type(duedate);
};

function addFields(type, participants) {
    const dataTransfer = new DataTransfer;
    if (participants == 0) {
        // Único signatário
        cy.contains('Sign2go Automation Testing')
            .should('be.visible').click()
            .wait(1000);
        cy.contains(type)
            .should('be.visible')
            .wait(1000)
            .trigger('dragstart', { dataTransfer })
            .wait(1000);
        cy.iframe(el.iframePlugin)
            .trigger('drop', { dataTransfer, force: true })
            .wait(1000);
    } else if (participants == 1) {
        // Participant 0
        cy.contains('Participant 0 Test Automation')
            .should('be.visible').click()
            .wait(1000);
        cy.contains(type)
            .should('be.visible')
            .wait(1000)
            .trigger('dragstart', { dataTransfer })
            .wait(1000);
        cy.iframe(el.iframePlugin).trigger('drop', { dataTransfer, force: true })
            .wait(1000);
    } else if (participants >= 2) {
        // Participant 0
        cy.contains('Participant 0 Test Automation')
            .should('be.visible').click()
            .wait(1000);
        cy.contains(type)
            .should('be.visible')
            .wait(1000)
            .trigger('dragstart', { dataTransfer })
            .wait(1000)
        cy.iframe(el.iframePlugin).trigger('drop', { dataTransfer, force: true })
            .wait(1000);
        // Participant 1
        cy.contains('Participant 1 Test Automation')
            .should('be.visible').click()
            .wait(1000);
        cy.contains('Participant 1 Test Automation')
            .siblings()
            .children()
            .find('p')
            .contains(type)
            .trigger('dragstart', { dataTransfer })
            .wait(1000);
        cy.iframe(el.iframePlugin).trigger('drop', { dataTransfer, force: true })
            .wait(1000);
    };
};