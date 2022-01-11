describe('Work with basic elements', () => {
    before(() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })
    beforeEach(() => {
        cy.reload()
    })

    it.skip('Text', () => {
       

        cy.get('body').should('contain', 'Cuidado');

        cy.get('span').should('contain', 'Cuidado');

        cy.get('.facilAchar').should('contain', 'Cuidado');

        cy.get('.facilAchar').should('to.have.text', 'Cuidado onde clica, muitas armadilhas...');
    });


    it.skip('Links', () => {
        cy.get('[href="#"]').click();

        cy.get('#resultado').should('to.have.text', 'Voltou!');
        
        cy.reload()
        cy.get('#resultado').should('not.have.text', 'Voltou!');

        cy.contains('Voltar').click();

        cy.get('#resultado').should('have.text', 'Voltou!');
    });

    it.only('TextFields', () => {
        cy.get('#formNome').type('Curso Cypress')
        cy.get('#formNome').should('have.value', 'Curso Cypress')
        cy.get('#elementosForm\\:sugestoes')
            .type('Pensando mais a longo prazo, a hegemonia do ambiente político pode nos levar a considerar a reestruturação das direções preferenciais no sentido do progresso.')
            .should('have.value', 'Pensando mais a longo prazo, a hegemonia do ambiente político pode nos levar a considerar a reestruturação das direções preferenciais no sentido do progresso.')

            cy.get(':nth-child(3) > :nth-child(6) > input')
                .type('Aprendendo Cypress')
                .should('have.value', 'Aprendendo Cypress')
            //Usar "backSpace" para apagar numeros ou letras de tras para frente
            cy.get('[data-cy=dataSobrenome]') 
                .type('teste12345{backspace}{backspace}{backspace}')
                .should('have.value', 'teste12')

                cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
                //Usar o dalay para deixar a escrita mais devagar
                // o parametreo {Selectall} serve para apagar algo e reescrver novamente
                .type('Erro{selectall}Escrever', {delay: 300})
                .should('have.value', 'Escrever')
    });
})