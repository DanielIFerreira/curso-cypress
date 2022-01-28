const locators = {
 LOGIN:{
     User: '[data-test=email]',
     Password: '[data-test=passwd]',
     BTN_Login: '.btn'
 },
 MENU:{
    Settings:'[data-test=menu-settings]',
    Contas:'[href="/contas"]',
    Reset: '[href="/reset"]'
 },
 CONTAS:{
        Nome: '[data-test=nome]',
        BTN_Salvar: '.btn',
        XP_BTN_Alterar: "//table//td[contains(.,'Conta de Teste')]/..//i[@class='far fa-edit']"
    },
 Message:'.toast-message'
 
 
 
}
export default locators;