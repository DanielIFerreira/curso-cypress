
/// <reference types="cypress"/>
describe('Cypress basics', () =>{
    it.only('Should visit a page and aserrt title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        //cy.pause()

        cy.title().should('to.eq', 'Campo de Treinamento');
        cy.title().should('contain', 'Treinamento').debug();

        cy.title()
            .should('to.eq', 'Campo de Treinamento')
            .and('contain', 'Treinamento');
        let pegandoAVariavel
        cy.title().then(title =>{
            //console.log(title)
            cy.get('#formNome').type(title)
                .should('have.value', 'Campo de Treinamento')
            pegandoAVariavel = title
        })

        cy.get('#elementosForm\\:sugestoes').then(($el) =>{
            cy.wrap($el).type(pegandoAVariavel)
        })

    });

    it('Should find and interact with an element', () => {
        cy.get('#buttonSimple')
        .click()
        .should('have.value', 'Obrigado!')
    });
})