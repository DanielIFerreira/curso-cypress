describe('Deve testar a nivel api Rest',() =>{
    let token
    before(() =>{
        cy.getToken('curso@teste.com','1234')
            .then(tkn =>{
                token = tkn
            }) 
    })

    beforeEach(()=>{
        cy.resetRest()
    })
   
    it('Deve inserir uma conta', () => {
        cy.getToken('curso@teste.com','1234')  
        .then(token =>{
            cy.request({
                url: '/contas',
                method: 'POST',
                headers: {Authorization: `JWT ${token}`},
                body:{
                    nome: 'Conta api'
                }
            }).as('response')
        })

        cy.get('@response').then(res =>{
            expect(res.status).to.be.eq(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta api')
        })
    });
    
    it('Deve alterar conta existente', () => {
        cy.getAccountByName('Conta para alterar')
        .then(accountId => {
            cy.request({
                method: 'PUT',
                url: `/contas/${accountId}`,
                headers: {Authorization: `JWT ${token}`},
                body:{
                    nome: 'Conta alteradaa via rest'
                } 
            }).as('response')
        })
        cy.get('@response').its('status').should('be.eq', 200)
    });

    it('Não deve criar uma conta com o mesmo nome',() =>{
        cy.getToken('curso@teste.com','1234')  
        .then(token =>{
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: {Authorization: `JWT ${token}`},
            body:{
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')
        })
        cy.get('@response').then(res =>{
            expect(res.status).to.be.eq(400)
            expect(res.body.error).to.be.contain('Já existe uma conta')
        })
    })

    it('Deve criar nova transição', () => {
        cy.getAccountByName('Conta para movimentacoes')
        .then(accountId =>{
            cy.request({
                url: '/transacoes',
                method: 'POST',
                headers: {Authorization: `JWT ${token}`},
                body: {
                    conta_id: accountId,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: 'desc',
                    envolvido:'Inter',
                    status: true,
                    tipo: 'REC',
                    valor: '123'
                }
                
            }).as('response')
        })
        cy.get('@response').its('status').should('be.eq', 201)
    });

    it.only('Deve pegar o saldo da conta', ()=>{
        cy.request({
           url:'/saldo',
           method: 'GET',
           headers: {Authorization: `JWT ${token}`}
        }).then(res =>{
           let saldoConta = null
           res.body.forEach(c =>{
               if(c.conta == 'Conta para saldo') saldoConta = c.saldo
           })
           expect(saldoConta).to.be.eq('534.00')
        })
        cy.request({
           method: 'GET',
           url: '/transacoes',
           headers: {Authorization: `JWT ${token}`},
           qs: {descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res =>{
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                headers: {Authorization: `JWT ${token}`},
                body:{
                    status: true
                }
            }).its('status').should('to.eq', 200)
        })
       
    })

    it('Remover conta existente',()=>{
    
    })
}) 

