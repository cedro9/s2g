/// <reference types="cypress" />

import { login, validateLogin } from '../support/pages/Login/index';
import { validateMessages, validateMessagesToast } from '../support/pages/commons';

describe('Login', () => {

  it('deve logar na aplicação com sucesso', () => {
    login('person', 'HML');
    validateLogin();    
  });

  it('deve validar senha incorreta', () => {
    login('invalid', 'password');
    validateMessagesToast('Usuário ou senha inválida');
  });

  it('deve validar e-mail incorreto', () => {
    login('invalid', 'email');
    validateMessages('E-mail inválido')
  });

  it('deve validar e-mail obrigatório', () => {
    login('blank', 'email');
    validateMessages('E-mail obrigatório')
  });

});