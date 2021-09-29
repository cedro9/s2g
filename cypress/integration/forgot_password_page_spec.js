/// <reference types="cypress" />

import { emailBlank, recoverPassword, resendEmailRecoverPassword, validateRecoverPassword } from '../support/pages/ForgotPassword/index';
import { validateMessages, validateMessagesToast } from '../support/pages/commons';

describe('Esqueceu a senha', () => {

  it('deve recuperar senha com sucesso', () => {
    recoverPassword(Cypress.env('userPersonHML'));
    validateRecoverPassword();    
  });

  it('deve reenviar e-mail de recuperação de senha', () => {
    resendEmailRecoverPassword(Cypress.env('userPersonHML'));
    validateMessagesToast('Email de redefinição de senha enviado');
  });

  it('deve validar e-mail incorreto', () => {
    recoverPassword('email@');
    validateMessages('E-mail inválido')
  });

  it('deve validar e-mail obrigatório', () => {
    emailBlank();
    validateMessages('E-mail obrigatório')
  });

  it('deve validar e-mail inexistente', () => {
    recoverPassword('email@mail.com.br');
    validateMessagesToast('Usuário informado não foi encontrado');
  });

});