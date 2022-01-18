describe('Work with locators',() => {
    before(() =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    //Para verificar a ordem de priorização de locators olhar a documentção do cypress na parte Selectors
    //Criando o nosso proprio Locators
    it('using jquery selector', () => {
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get("[onclick*='Francisco']")
        cy.get("table#tabelaUsuarios tbody tr td:eq(8)")
        cy.get("#tabelaUsuarios td:contains('Doutorado'):eq(0) ~ td:eq(3) input").type('deu certo')
    });

    it.only('using xpath', () => {
        cy.xpath('/html/body/center/form/table/tbody/tr[8]/td[2]/table/tbody/tr[2]/td[6]/input').type('teste')
        cy.xpath("(//input[@type='button'][@value='Clique aqui'])[3]")
        cy.xpath("(//input[contains(@onclick, 'Francisco')])")
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Superior')]")
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('Será?')
    });
})