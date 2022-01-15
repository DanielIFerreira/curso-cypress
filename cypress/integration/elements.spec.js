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

    it.skip('TextFields', () => {
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

    it.skip('RadioButton', () => {
        cy.get('#formSexoMasc')
            .click()
            .should('to.checked')

        cy.get('#formSexoFem').should('to.be.not.checked')

        cy.get('[name=formSexo]').should('to.have.length', 2)
        
    });

    it.only('CheckBox', () => {
        cy.get('[id=formComidaFrango]')
            .click()
            .should('be.checked')
            .reload()
         
        //Usar o objeto multiple para conseguir clicar em varios CheckBox ao mesmo tempo    
        cy.get('[name=formComidaFavorita]').click({multiple:true})  
        
        cy.get('[id=formComidaPizza]').should('to.be.checked')
    });

    it.only('ComboBox', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('especializacao')
            .should('to.have.value','especializacao')
        
        cy.get('[data-test=dataEscolaridade]')
            .should('not.be.have.value','doutorado')  
        
        //Para verificar os elementos de uma lista
        cy.get('[data-test=dataEscolaridade] option')
        .should('have.length', 8)
        cy.get('[data-test=dataEscolaridade] option').then($arr =>{
            const values = []
            $arr.each(function () {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
        
        
         
    });

    it.only('Combo multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['futebol', 'Karate'])

        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.eq(['futebol', 'Karate'])
        })

        cy.get('[data-testid=dataEsportes]')
            .invoke('val')
            .should('deep.eq',['futebol', 'Karate'])
    });

})