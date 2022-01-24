import loc from '../support/locators'
describe('Deve testar a nivel funcional',() =>{
    
    before(() =>{
        cy.visit('https://barrigareact.wcaquino.me');
        
        cy.get(loc.LOGIN.User).type('curso@teste.com')
        cy.get(loc.LOGIN.Password).type(1234)
        cy.get(loc.LOGIN.BTN_Login).click()
        cy.get(loc.Message).should('contain', 'Bem vindo')
    })
   
    it('Deve inserir uma conta', () => {
        cy.get(loc.MENU.Settings).click()
        cy.get(loc.MENU.Contas).click()
        cy.get(loc.CONTAS.Nome).type('Conta de Teste')
        cy.get(loc.CONTAS.BTN_Salvar).click()
        cy.get(loc.Message).should('contain','Conta inserida com sucesso!')
    });
    
    it('Deve alterar conta existente', () => {
        cy.get(loc.MENU.Settings).click()
        cy.get(loc.MENU.Contas).click()
        cy.xpath(loc.CONTAS.XP_BTN_Alterar).click()
        cy.get(loc.CONTAS.Nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_Salvar).click()
        cy.get(loc.Message.Mensagem).should('contain','Conta atualizada com sucesso!')
    });
}) 

