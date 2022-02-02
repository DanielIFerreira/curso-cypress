describe('Esperas... ', () => {
    before(() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })
    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento ficar disponivel', () => {

        cy.get('#novoCampo').should('not.to.be.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.to.be.exist')
        cy.get('#novoCampo').should('exist')   
        cy.get('#novoCampo').type('Abriu..')
    });

    it.only('Deve fazer retrys', () => {

        cy.get('#buttonDelay').click()
        //Quando Tiver algum campo com um dalay acima de 4 segundo não encadiar os should
        cy.get('#novoCampo')
            .should('exist')   
            //.should('not.exist')
        cy.get('#novoCampo').type('Abriu..')
    });


    it.only('Uso do find', () => {
        cy.get('#buttonList').click()
        //cy.get('#lista > :nth-child(1) > span').should('exist')
        //cy.get('#lista > :nth-child(2)').should('exist')
        //Procurar não usar dois FIND seguidos pois cypress pegara apenas o primeiro
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    });

    it.only('Uso do timeout', () => {
        // cy.get('#buttonDelay')
        //     .click()
        //     .should('exist')
        // cy.get('#novoCampo', {timeout: 1000})
        //     .should('exist')
        //Evitar usar o WAIT se precisar usar o TimeOut
        cy.get('#buttonList').click()
        cy.get('#lista li span', {timeout: 10000})
            .should('contain', 'Item 2')
    });

    it.only('Click Ritry', () => {
        cy.get('#buttonCount')
            .click()
            .should('have.value', '11')
            .click()
            .should('have.value', '111')
            .click()
            .should('have.value', '1111')
    });

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span').then($el =>{
            console.log($el)
            expect($el).to.have.length(1)
        })
    });
})