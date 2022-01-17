 describe('Work with Popup', () => {

    beforeEach(() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })


    it('Deve testar popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html');
        cy.get('#otherButton').click()
        cy.on('window:alert', msg =>{
            expect(msg).eq('Click OK!')
        })
    });
     //Testando a abertura de um popup
    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.window().then(win => {
            cy.stub(win, 'open').as('testando popup')
        })
        cy.get('#buttonPopUp').click()
        //Uso o @ para ele não se perder na hora de verificar se existe
        cy.get('@testando popup').should('be.called')
        
    });

    it('Check popupURL', () => {
        cy.contains('Popup2')
            .should('have.prop', 'href')
            .and('eq', 'https://wcaquino.me/cypress/frame.html')
    });

    //Usar essa estrategia para usar quando o link paagina não for fixo
    it('Acessando o link dinamicamente', () => {
        cy.contains('Popup2').then($el => {
            const hrefe = $el.prop('href')
            cy.visit(hrefe)
            cy.get('#tfield').type('funciona')
        })
    });

    //Usando para deixa o link externo na mesma pagina
    it('Abrindo o link na mesma pagina', () => {
        cy.contains('Popup2')
            .invoke('removeAttr', 'target')
            .click()  
            cy.get('#tfield').type('funciona')   
    });
 })
 
 
 
