//APRESENTAÇÃO TESTES

/// <reference types ="cypress"/>

describe('Cypress basics', () => {
	//ACESSAR UMA PAGINA
	it('Should visit a page and assert title', () => {
		cy.visit('https://wcaquino.me/cypress/componentes.html')
		
		//fornece o titulo: cy.title(), retorna Promise
		
		//.should pra fazer assertivas em cima de Promises
		/*TRANSFORMAÇÃO DE .equals para o .should:
			expect(a).to.be.equal(1)
			a.should('to.be.equal', 1)
		*/
		cy.title().should('be.equal', 'Campo de Treinamento')
		cy.title().should('contain', 'Campo')

		//OU
		cy.title()
			.should('be.equal', 'Campo de Treinamento')
			.should('contain', 'Campo')

		//OU
		cy.title()
			.should('be.equal', 'Campo de Treinamento')
			.and('contain', 'Campo')

		let syncTitle	//para usar o title em outro momento

		//imprimir o titulo no console
		//como é promise, tratar com função
		cy.title().then(title => {
			//poderia ser .then ou .should
			//agora com o .get, precisa ser o .then
			console.log(title)
			//jogar o titulo em algum campo:
			cy.get('#formNome').type(title)

			syncTitle = title
		})

		//este momento pode ser depois de abrir outra tela, outra pagina
		cy.get('[data-cy=dataSobrenome]').then($el => {
			//precisa ser via promise para ele encontrar o elemento
			//e aguardar a promise do .title()
			cy.wrap($el).type(syncTitle)
		})

	})

	//INTERAGIR COM ELEMENTOS DA PAGINA
	it('Should find and interact with an element', () => {
		cy.visit('https://wcaquino.me/cypress/componentes.html')

		cy.get('#buttonSimple')
			.click()
			.should('have.value', 'Obrigado!')
			//inspecionar com o do CHROME qual o value
	})
})

//DEBUG:
//só colocar .debug() pós o () desejado

//PAUSE
	cy.visit()
	cy.pause()
	//manda continuar no cypress
	//ou entao a passo a passo

