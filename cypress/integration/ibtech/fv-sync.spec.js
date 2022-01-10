/// <reference types ="cypress"/>

describe('Login and sync', () => {
		it('Should login', () => {
            cy.visit('http://localhost:9000/#/pages/signin')
            cy.get('#cpLogin')
                .clear()
                .type('rep235')
            cy.get('#cpPassword').type('elian2020')
            cy.get('[ng-switch="codErro != null"] > .btn').click()

            cy.wait(600)
            cy.visit('http://localhost:9000/#/integracao')

            cy.get(':nth-child(9) > .col-xs-10 > .ui-checkbox > .list-group-item-text', {timeout: 3000})
            cy.get(':nth-child(9) > .col-xs-10 > .ui-checkbox > .list-group-item-text')
                .click()
                .should('not.be.checked')
            cy.get(':nth-child(1) > .col-md-12 > .btn').click()
            
            //cy.get('[uib-modal-transclude=""] > .modal-content', {timeout: 3000})
		})
})

//DEBUG:
//só colocar .debug() pós o () desejado