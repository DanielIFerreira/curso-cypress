import loc from '../support/locators'

import '../support/commandsContas'
describe('Deve testar a nivel funcional',() =>{
    
    before(() =>{
        cy.visit('https://barrigareact.wcaquino.me');
        cy.login('curso@teste.com','1234')
        cy.resetApp()
      
    })
   
    it('Deve inserir uma conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de Teste')
        cy.get(loc.CONTAS.BTN_Salvar).click()
        cy.get(loc.Message).should('contain','Conta inserida com sucesso!')
    });
    
    it('Deve alterar conta existente', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.XP_BTN_Alterar).click()
        cy.get(loc.CONTAS.Nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_Salvar).click()
        cy.get('.toast-message').should('contain','Conta atualizada com sucesso!')
    });
}) 

