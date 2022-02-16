
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

    it('Não deve criar uma conta com o mesmo nome',() =>{
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
            response: 'fixture:movimentacaoSalva'
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
        cy.xpath(loc.SALDO.FnXpSaldoConta('Carteira')).should('contain', '100,00')
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        //cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.Descriccao).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.StatusPago).click()
        cy.get(loc.MOVIMENTACAO.Btn_Salvar).click()
        cy.get(loc.Message).should('contain', 'Movimentação inserida com sucesso!')
        

        cy.get(loc.MENU.Home).click()
        cy.xpath(loc.SALDO.FnXpSaldoConta('Carteira')).should('contain', '534,00')
    
    })

    it('Remover conta existente',()=>{
        cy.route({
            method:'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204,
        })

        cy.get(loc.MENU.Remover).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.Message).should('contain', 'sucesso')
    })

    it.only('Deve testar as cores da interface', () => {
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                {"conta":"Conta para movimentacoes","id":1001671,"descricao":"Receita paga","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2022-02-08T03:00:00.000Z","data_pagamento":"2022-02-08T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":1074638,"usuario_id":27523,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":1001672,"descricao":"Receita pendente","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2022-02-08T03:00:00.000Z","data_pagamento":"2022-02-08T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":1074639,"usuario_id":27523,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":1001673,"descricao":"Despesa paga","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2022-02-08T03:00:00.000Z","data_pagamento":"2022-02-08T03:00:00.000Z","valor":"3500.00","status":true,"conta_id":1074640,"usuario_id":27523,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":1001674,"descricao":"Despesa pendente","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2022-02-08T03:00:00.000Z","data_pagamento":"2022-02-08T03:00:00.000Z","valor":"-1000.00","status":false,"conta_id":1074640,"usuario_id":27523,"transferencia_id":null,"parcelamento_id":null},
        ]
        })
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')
    })  

    it.only('Testando a responsividade', () => {
        cy.get('[data-test=menu-home]').should('exist')
            .and('be.visible')

        cy.viewport(500, 700)
        cy.viewport('iphone-5')
        cy.get('[data-test=menu-home]').should('exist')
            .and('not.visible')
        cy.viewport('ipad-2')
        
    });
}) 

