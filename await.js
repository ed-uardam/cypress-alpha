//ESPERA DO CYPRESS

describe('Esperas', () => {
	before(() => {
		//executa e depois iniciam os testes
		cy.visit('https://wcaquino.me/cypress/componentes.html')
	})

	beforeEach(() => {
		//executa antes do inicio de cada teste
		cy.reload()
			//refresh na página, pra limpar os campos
	})

	it('Aguardar elemento estar disponível', () => {
		cy.get('#novoCampo').should('not.exist')
		cy.get('#buttonDelay').click()
		cy.get('#novoCampo').should('not.exist')	//leva um tempo
		cy.get('#novoCampo').should('exist')
		cy.get('#novoCampo').type('funciona')
	})

	//RETRIES
	it('Fazer retries', () => {
		cy.get('#buttonDelay').click()
		cy.get('#novoCampo')
			.should('exist')
			.should('not.exist')
			//tenta novamente o get até todas as acertivas sejam satisfeitas
			
			/*
			--YIELDS
				nem sempre dois should sequenciados dessa forma
				vao ter o mesmo retorno do objeto
			.should('not.exist')
				retorna null
			.should('exist')
				precisaria do cy.get(), pois pega o null
			*/
	})

	it('Uso do find', () => {
		cy.get('#buttonList').click()
		cy.get('#lista li')
			.find('span')
			.should('contain', 'Item 1')
		
		cy.get('#lista li')
			.find('span')
			.should('contain', 'Item 2')
			//as retries são em cima do comando imediato anterior
			//à assertiva (should). neste caso, volta a tentar
			//o find, e nao o get
			//os elementos vao aparecendo aos poucos, entao nao é o ideal o find

		cy.get('#lista li span')
			.should('contain', 'Item 2')
				//usar da mesma maneira para o DOM
	})

	it('Timeout', () => {
		//timeout padrão: 4s
		cy.get('#buttonDelay').click()
		cy.get('#novoCampo').should('exist')

		//alteração do timeout é no get
		//tempo é em milis
		cy.get('#novoCampo', {timeout: 1000}).should('exist')

		/*alterar o timeout PADRÃO para vários asserts
			no arquivo cypress.json
			{
				"defaultCommandTimeout": 1000
			}
		*/

		cy.('#buttonListDOM').click()
		cy.wait(5000)
			//vai pausar o script por 5s
			//a aplicação continua
			//procurar usar apenas quando a demora é FIXA
			//não serve para analisar instabilidade
		cy.get('#lista li span', {timeout: 30000}).should('contain', 'Item 2')
			//se necessario ele aguarda os 30s, mas caso satisfaça antes, nao
			//espera todos os 30s, termina o teste

		cy.get('#lista li span', {timeout: 30000}).should('contain', 'Item 2')
			.should('have.length', 1)
			.should('have.length', 2)
			//nesse caso, só vai liberar o timeout quando
			//satisfazer as DUAS assertivas, ou chegar no timeout
			//lembrando que: faz o retry em cima do get
	})

	it('Click retry', () => {
		//o click nao volta a retry
		//apenas a assertiva após o click vai ser alvo do retry
		//COMANDOS QUE ALTERAM O HTML NAO SOFREM RETRY
	})

	it('Should vs. Then', () => {
		cy.('#buttonListDOM').click()
		//cy.get('#lista li span').debug()
		cy.get('#lista li span').then($el => {
			//$el pega os elementos HTML, é o JQuery
			//.then aguarda o .get finalizar, receber o retorno da promise
			expect($el).to.have.length(1)		//equivalente ao should.('have.length')
		})

		cy.get('#lista li span').should($el => {
			//não aguarda a promise finalizar para fazer a verificação
			//fica fazendo os retries até o .get finalizar
		expect($el).to.have.length(1)
			//equivalente ao should.('have.length')
		
		})

		cy.('#buttonListDOM').click().then($el => {
			expect($el).to.have.length(1)
			return 2
				//vai ter diferença com should e then
				//SHOULD: ignora oq ta dentro do return,
				//sempre retorna o que ele recebeu ($el)
				
				//THEN: altera o retorno da function
				//não é mais o que foi passado no parametro, e sim o que foi colocado no return
				//aqui no caso, da erro na linha abaixo \/ com o .then
				//usar ele para usar um .get aqui dentro

				//SHOULD: retorna o buttonListDOM pro .and
				//THEN: retorna o 2	pro .and
		}).and('have.id', 'buttonListDOM')

	})
})
