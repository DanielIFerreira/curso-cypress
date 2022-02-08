
import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Deve testar a nivel funcional com mock',() =>{
    beforeEach(()=>{
        buildEnv()
        cy.login('curso@teste.com','teste')
        cy.clearLocalStorage()
        cy.get(loc.MENU.Home).click()
    })
    
    it('Deve inserir uma conta', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id:3, nome:"Conta de teste", visivel:true, usuario_id:1},
        }).as('ContaSalva')

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response:[
                {id:1, nome:"Carteira", visivel:true, usuario_id:1},
                {id:2, nome:"Banco", visivel:true, usuario_id:2},
                {id:3, nome:"Conta de teste", visivel:true, usuario_id:1}
            ]
        }).as('ContaAt')
        cy.inserirConta('Conta de Teste')
        cy.get(loc.CONTAS.BTN_Salvar).click()
        cy.get(loc.Message).should('contain','Conta inserida com sucesso!')
    });
    
    it('Deve alterar conta existente', () => {
        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: {id:1, nome:"Conta alterada", visivel:true, usuario_id:1},
        })

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.Fn_XP_BTN_Alterar('Carteira')).click()
        cy.get(loc.CONTAS.Nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_Salvar).click()
        cy.get(loc.Message).should('contain','Conta atualizada com sucesso!')
    });

    it.only('Não deve criar uma conta com o mesmo nome',() =>{
        cy.route({
            method:'POST',
            url: '/contas',
            response: {"error": "Já existe uma conta com esse nome!"},
            status: 400
        }).as('Contas Mesmo Nome')
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_Salvar).click()
        cy.get(loc.Message).should('contain', 'status code 400')
    })

    it('Deve criar nova transição', () => {

        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {"id":1001638,"descricao":"eq","envolvido":"asd","observacao":null,"tipo":"REC","data_transacao":"2022-02-08T03:00:00.000Z","data_pagamento":"2022-02-08T03:00:00.000Z","valor":"23123.00","status":true,"conta_id":1074425,"usuario_id":27523,"transferencia_id":null,"parcelamento_id":null}
        })

        cy.route({
            method:'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSavar'
        })
        //cy.acessarMenuConta()
        cy.get(loc.MENU.Movimentacao).click()
        cy.get(loc.MOVIMENTACAO.Descriccao).type('Teste')
        cy.get(loc.MOVIMENTACAO.Valor).type('123')
        cy.get(loc.MOVIMENTACAO.Interessado).type('Inter')
        cy.get(loc.MOVIMENTACAO.DropDawn).select('Banco')
        cy.get(loc.MOVIMENTACAO.StatusPago).click()
        cy.get(loc.MOVIMENTACAO.Btn_Salvar).click()
        cy.get(loc.Message).should('contain', 'sucesso!')
        cy.get(loc.MOVIMENTACAO.VerificaSeExiste).should('have.length', 7)
        
    });

    it.only('Deve pegar o saldo da conta', ()=>{
        cy.get(loc.MENU.Home).click()
        cy.xpath(loc.SALDO.FnXpSaldoConta('Conta para saldo')).should('contain', '534,00')
        cy.get(loc.MENU.EXTRATO).click()
        cy.wait(1000)
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.MOVIMENTACAO.Descriccao).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.StatusPago).click()
        cy.get(loc.MOVIMENTACAO.Btn_Salvar).click()
        cy.get(loc.Message).should('contain', 'Movimentação inserida com sucesso!')
        cy.get(loc.MENU.Home).click()
        cy.xpath(loc.SALDO.FnXpSaldoConta('Conta para saldo')).should('contain', '534,00')
    
    })

    it('Remover conta existente',()=>{
        cy.get(loc.MENU.Remover).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.Message).should('contain', 'sucesso')
    })
}) 

