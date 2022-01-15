describe('Helpers...', () => {
    before(() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })
    
    it('Wrap', () => {
        //cy.get('#formNome').type('funciona???')
        //Usando Promisses
        cy.get('#formNome').then($el =>{
            cy.wrap($el).type('funciona via cypress usando promisses')
            .should('have.value', 'funciona via cypress usando pr')
        })

        //Criando Promisses
        const promise = new Promise((resolve, reject) => {
            setTimeout(() =>{
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() =>{
            console.log('Encontrei o primero botão')
        })
        //Usar o WRAP para conseguir sincronizar o log no lugar que desejar
        cy.wrap(promise).then(num => console.log(num)).should('eq', 10)
        cy.get('#buttonSimple').then(() => {
            console.log('Encontrei o segundo botão')
        })

    });

    //usando Its 
    it.only('Its...', () => {
        cy.title().its('length').should('to.eq', 20)
    });

    it.only('Invoke...', () => {
        cy.get('#formNome').invoke('val', 'Texto via Invoke')
        cy.window().invoke('alert', "Da pra ver?")
        cy.get('#resultado')
            .invoke('html', '<input type="button" value="confirmar"/> ')
    });
})