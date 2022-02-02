describe('Work with alerts' , () => {
    beforeEach(() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    it('Alert', () => {
        cy.get('#alert').click()
        //Para capturar a mensagem do alert usar o metodo a baixo
        cy.on('window:alert', msg =>{
            console.log(msg)
            //Usando expect para validar se a mensagem do alert esta correta
            expect(msg).to.be.eq('Alert Simples')
        })
    });

    it.only('Alert with mock', () => {
        //Esse metodo faz a mesma coisa do que o metodo anterior porem estamos usando mock e stub o "AS é usado para da nome "
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        //Fazendo o Assert pasra verificar se o texto do alert esta correto
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it.only('ALert with confirm', () => {

        
        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Confirm Simples')
        })

        cy.on('window:alert', msg1 =>{
            expect(msg1).to.be.eq('Confirmado')
        })

        cy.get('#confirm').click()
    });
    
    it.only('ALert with deny', () => {

        //Para testar o alert no cancelado basta apenas colocar o return False no metodo
        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Confirm Simples')
            return false
        })

        cy.on('window:alert', msg1 =>{
            expect(msg1).to.be.eq('Negado')
        })

        cy.get('#confirm').click()
    });

    it.only('Alert with pronpt', () => {
        //Capturando o vento do Prompt
        
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })
        //Os proximos metodos são para fazer a validação do alert
        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Era 42?')
        } )

        cy.on("window:alert", msg => {
            expect(msg).to.be.eq(':D')
        })    
        cy.get('#prompt').click()

    });

    //Validando varios alertas seguidos em um preenchimento de cadastro
    it.only('Validando Mensagens', () => {
        //Dando nome ao alerta
        const stub = cy.stub().as('alerta')
        //Nome
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
        })
        cy.get('#formNome').type('Daniel').should('have.value', 'Daniel')
        
        //Sobrenome
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
        })
        cy.get('[data-cy=dataSobrenome]').type('Ferreira').should('have.value', 'Ferreira')
        
        //Sexo
        cy.get('#formCadastrar').click()
            .then(() => {
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
        })
        cy.get('#formSexoMasc').click().should('have.value', 'M')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    });
})