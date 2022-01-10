/// <reference types ="cypress"/>

describe('Basic new customer', () => {
    before(() => {
        cy.visit('http://localhost:9000/#/pages/signin')
        cy.get('#cpLogin')
            .clear()
            .type('rep235')
        cy.get('#cpPassword').type('elian2020')
        cy.get('[ng-switch="codErro != null"] > .btn').click()

        cy.get(':nth-child(11) > a',{timeout: 30000}).should('exist')
        cy.visit('http://localhost:9000/#/integracao')
        cy.get('.panel-heading > .ng-binding').should('exist')
        cy.scrollTo('top')

        cy.get('[ng-click="selectAll()"] > .ui-checkbox > .list-group-item-text', {timeout: 3000}).should('exist')
        cy.get(':nth-child(4) > .col-md-12 > .btn').should('exist')
        cy.scrollTo('top')
        cy.get('[ng-click="selectAll()"] > .ui-checkbox > .list-group-item-text')
            .click()
            .should('not.be.checked')
        cy.get(':nth-child(2) > .col-xs-10 > .ui-checkbox > .list-group-item-text')
            .click()
        cy.get(':nth-child(3) > .col-xs-10 > .ui-checkbox > .list-group-item-text')
            .click()
        cy.get(':nth-child(4) > .col-xs-10 > .ui-checkbox > .list-group-item-text')
            .click()
        cy.get(':nth-child(1) > .col-md-12 > .btn').click()
        
        //cy.get('[uib-modal-transclude=""] > .modal-content', {timeout: 3000})
    })

    it.only('Should create new customer', () => {
        cy.get('[uib-modal-transclude=""]', {timeout: 90000}).should('not.exist')
        cy.visit('http://localhost:9000/#/cliente/cadCliente')
        cy.get('.panel-heading > .ng-binding', {timeout: 90000}).should('exist')

        cy.get('#cpCNPJ').type('00.322.574/0001-86')
        cy.get('#cpRazaoSocial').type('CLIENTE TESTE')
        cy.get('#cpFantasia').type('CLIENTE TESTE')
        cy.get('#cpInscrEstadual').type('ISENTO')
        cy.get('#cpTelefone').type('4739786499')
        cy.get('#cpCelular').type('47999992259')
        cy.get('#cpEmail').type('eduarda@geovendas.com')
        cy.get('#cpEmailNFE').type('eduarda@geovendas.com')
        cy.get('#cpCEP').type('89259380')
        cy.get(':nth-child(1) > .row > .col-sm-3 > .btn').click()
        cy.get('#cpNumero').type('999')
        cy.get('[data-ng-click="salvar()"]').click()

        cy.get('.toast-message', {timeout: 3000})
            .should('exist')
            .and('contain','Cliente deve possuir no mínimo "3" referências comerciais')
        //cy.get('[uib-modal-transclude=""] > .modal-content', {timeout: 3000})
    })
})