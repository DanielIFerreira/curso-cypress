import loc from './locators'

Cypress.Commands.add('acessarMenuConta', () =>{
    cy.get(loc.MENU.Settings).click()
    cy.get(loc.MENU.Contas).click()
})

 Cypress.Commands.add('inserirConta',conta =>{
     cy.get(loc.CONTAS.Nome).type(conta)
})