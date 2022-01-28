// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

 import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => [
        expect(msg).to.be.eq(message)
    ])
})


Cypress.Commands.add('login', (user, password) =>{
    cy.visit('https://barrigareact.wcaquino.me');
        
    cy.get(loc.LOGIN.User).type('curso@teste.com')
    cy.get(loc.LOGIN.Password).type(1234)
    cy.get(loc.LOGIN.BTN_Login).click()
    cy.get(loc.Message).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () =>{
    cy.get(loc.MENU.Settings).click()
    cy.get(loc.MENU.Reset).click()
})