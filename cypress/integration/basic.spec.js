
/// <reference types="cypress"/>
describe('Cypress basics', () =>{
    it.only('Should visit a page and aserrt title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        cy.pause()

        cy.title().should('to.eq', 'Campo de Treinamento');
        cy.title().should('contain', 'Treinamento').debug();

        cy.title()
            .should('to.eq', 'Campo de Treinamento')
            .and('contain', 'Treinamento');

            //TODO imprimir o title no console

    });

    it('Should find and interact with an element', () => {
        cy.get('#buttonSimple')
        .click()
        .should('have.value', 'Obrigado!')
    });
})