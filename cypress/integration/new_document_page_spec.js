/// <reference types="cypress" />

import {
  validateFieldsRequiredParticipants,
  invalidFieldsNewDocument,
  createNewDocument,
  validateNewDocumentCreation,
  validateFieldsRequiredNewDocument
} from '../support/pages/NewDocument/index';

import { login } from '../support/pages/Login/index';
import { removeDocument } from '../support/pages/Home/index';

describe('Configuração de documento', () => {

  beforeEach(() => {
    login('person', 'HML');
  });

  it('deve configurar documento com um participante', () => {
    createNewDocument('pdf', 'Document 01 Test Automation', 1);
    // validateNewDocumentCreation();
    // removeDocument('Document 01 Test Automation', 'Em andamento');
  });

  it('deve configurar documento com dois participantes', () => {
    createNewDocument('pdf', 'Document 02 Test Automation', 2);
    // validateNewDocumentCreation();
    // removeDocument('Document 02 Test Automation', 'Em andamento');
  });

  it('deve configurar documento com um signatário', () => {
    createNewDocument('pdf', 'Document 03 Test Automation', 0);
    // validateNewDocumentCreation();
    // removeDocument('Document 03 Test Automation', 'Em andamento');
  });

  it('deve configurar documento com formato docx', () => {
    createNewDocument('docx', 'Document 04 Test Automation', 1);
    // validateNewDocumentCreation();
    // removeDocument('Document 04 Test Automation', 'Em andamento');
  });

  // it('deve validar campos obrigatórios na configuração de documento', () => {
  //   validateFieldsRequiredNewDocument();
  // });

  // it('deve validar campos incorretos na configuração de documento', () => {
  //   invalidFieldsNewDocument();
  // });

  // it('deve validar campos obrigatórios no participante', () => {
  //   validateFieldsRequiredParticipants('Document 05 Test Automation');
  //   removeDocument('Document 05 Test Automation', 'Rascunho');
  // });

});