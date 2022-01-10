/// <reference types ="cypress"/>

describe('Teste Login inicial', () => {
	it('Should visit a page and type', () => {
		cy.visit('https://elian.geovendas.com/PedidosConfeccaoHomolog/')
		//fornece o titulo: cy.title(), retorna Promise
		
		//.should pra fazer assertivas em cima de Promises
		/*TRANSFORMAÇÃO DE .equals para o .should:
			expect(a).to.be.equal(1)
			a.should('to.be.equal', 1)
		*/
		cy.title()
			.should('be.equal', 'Força de Vendas - GEOvendas')
			.and('contain', 'GEO')

        cy.get('#cpLogin').type('teste')
		})
})

//DEBUG:
//só colocar .debug() pós o () desejado

//PAUSE
//	cy.visit()
//	cy.pause()
	//manda continuar no cypress
	//ou entao a passo a passo

