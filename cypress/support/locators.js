const locators = {
 LOGIN:{
     User: '[placeholder="seu@email.com"]',
     Password: '[data-test=passwd]',
     BTN_Login: '.btn'
 },
 MENU:{
    Home: '[data-test=menu-home] > .fas',
    Settings:'[data-test=menu-settings]',
    Contas:'[href="/contas"]',
    Reset: '[href="/reset"]',
    Movimentacao: '[href="/movimentacao"]',
    Remover: '[data-test=menu-extrato] > .fas',
    EXTRATO: '[data-test=menu-extrato] > .fas'
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
 }, 
 EXTRATO: {
    Linhas: '.list-group > li',
    FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(., '${desc}')]//following::small[contains(., '${value}')]`,
    FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt']`,
    FN_XP_ALTERAR_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='fas fa-edit']`,
    FN_XP_LINHA: desc => `//span[contains(., '${desc}')]/../../../..`
 }
 
 
}
export default locators;