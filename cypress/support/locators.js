const locators = {
 LOGIN:{
     User: '[data-test=email]',
     Password: '[data-test=passwd]',
     BTN_Login: '.btn'
 },
 MENU:{
    Home: '[data-test=menu-home] > .fas',
    Settings:'[data-test=menu-settings]',
    Contas:'[href="/contas"]',
    Reset: '[href="/reset"]',
    Movimentacao: '[href="/movimentacao"]',
    Remover: '[data-test=menu-extrato] > .fas'
 },
 CONTAS:{
        Nome: '[data-test=nome]',
        BTN_Salvar: '.btn',
        Fn_XP_BTN_Alterar: nome =>`//table//td[contains(.,'${nome}')]/..//i[@class='far fa-edit']`,
    },
 Message:'.toast-message',

 MOVIMENTACAO:{
    Descriccao: '[data-test=descricao]',
    Valor: '[data-test=valor]',
    Interessado: '[data-test=envolvido]',
    DropDawn: '[data-test=conta]',
    Btn_Salvar: '.btn-primary',
    VerificaSeExiste: '.list-group >li',
    StatusPago: '[data-test=status]',
    FnXpAlterar: nome => `//span[contains(., '${nome}')]/../../..//i[@class='fas fa-edit']`
 },

 SALDO:{
    FnXpSaldoConta: nome => `//td[contains(., '${nome}')]//../td[2]`,
 },
 REMOVER:{
    FnXpRenomer: nome => `//span[contains(., '${nome}')]/../../..//i[@class='far fa-trash-alt']`
 }
 
 
}
export default locators;