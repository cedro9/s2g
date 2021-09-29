/// <reference types="cypress" />

import { checkPassDifferent, checkPasswordInvalid, checkDocInvalid, checkFieldsInvalid, validateFieldsRequired, createUser, validateUserCreation } from '../support/pages/CreateAccount/index';

describe('Criação de conta', () => {

  it('deve criar conta pessoal com sucesso', () => {
    createUser('person', 'User Test Automation', '01011957');
    validateUserCreation();
  });

  it('deve validar campos obrigatórios no cadastro pessoal', () => {
    validateFieldsRequired('person');
  });

  it('deve verificar campos inválidos no cadastro pessoal', () => {
    checkFieldsInvalid('person');
  });

  it('deve verificar CPF inválido no cadastro pessoal', () => {
    checkDocInvalid('person');
  });

  it('deve verificar senha inválida no cadastro pessoal', () => {
    checkPasswordInvalid('person');
  });

  it('deve verificar senhas divergentes no cadastro pessoal', () => {
    checkPassDifferent();
  });

  it('deve criar conta corporativa com sucesso', () => {
    createUser('company', 'User Test Automation', '01011957');
    validateUserCreation();
  });

  it('deve validar campos obrigatórios no cadastro corporativo', () => {
    validateFieldsRequired('company');
  });

  it('deve verificar CNPJ inválido no cadastro corporativo', () => {
    checkDocInvalid('company');
  });

});