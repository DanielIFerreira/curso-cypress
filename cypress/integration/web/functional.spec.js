
import loc from '../../support/locators'

import '../../support/commandsContas'

describe('Deve testar a nivel funcional',() =>{
    
    before(() =>{
        cy.visit('https://barrigareact.wcaquino.me');
        cy.login('curso@teste.com','1234')
      
    })

    beforeEach(()=>{
        cy.get(loc.MENU.Home).click()
        cy.resetApp()
    })
   
    it('Deve inserir uma conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de Teste')
        cy.get(loc.CONTAS.BTN_Salvar).click()
        cy.get(loc.Message).should('contain','Conta inserida com sucesso!')
    });
    
    it('Deve alterar conta existente', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.Fn_XP_BTN_Alterar('Conta para alterar')).click()
        cy.get(loc.CONTAS.Nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_Salvar).click()
        cy.get(loc.Message).should('contain','Conta atualizada com sucesso!')
    });

    it('Não deve criar uma conta com o mesmo nome',() =>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_Salvar).click()
        cy.get(loc.Message).should('contain', 'status code 400')
    })

    it('Deve criar nova transição', () => {
        //cy.acessarMenuConta()
        cy.get(loc.MENU.Movimentacao).click()
        cy.get(loc.MOVIMENTACAO.Descriccao).type('Teste')
        cy.get(loc.MOVIMENTACAO.Valor).type('123')
        cy.get(loc.MOVIMENTACAO.Interessado).type('Inter')
        cy.get(loc.MOVIMENTACAO.DropDawn).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.StatusPago).click()
        cy.get(loc.MOVIMENTACAO.Btn_Salvar).click()
        cy.get(loc.Message).should('contain', 'sucesso!')
        cy.get(loc.MOVIMENTACAO.VerificaSeExiste).should('have.length', 7)
        
    });

    it('Deve pegar o saldo da conta', ()=>{
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

