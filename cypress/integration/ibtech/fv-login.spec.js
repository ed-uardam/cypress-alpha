/// <reference types ="cypress"/>

describe('Try sucessfull and failed login', () => {
	it('Should visit and try not to login', () => {
		cy.visit('http://localhost:9000/#/pages/signin')

		cy.title()
			.should('be.equal', 'Força de Vendas - GEOvendas')
			.and('contain', 'GEO')

        cy.get('#cpLogin').type('teste')
		cy.get('#cpPassword').type('123')
		cy.get('[ng-switch="codErro != null"] > .btn').click()
		cy.get('.alert-danger > div > .ng-binding').should('contain','Tipo de usuário inválido para acesso ao sistema de pedidos.')
		})

	it('Should visit and try to successfully login', () => {
		cy.visit('http://localhost:9000/#/pages/signin')
		cy.get('#cpLogin').type('rep235')
		cy.get('#cpPassword').type('elian2020')
		cy.get('[ng-switch="codErro != null"] > .btn').click()

		cy.wait(600)
		cy.url().should('eq', 'http://localhost:9000/#/integracao')
	})
})

//DEBUG:
//só colocar .debug() pós o () desejado