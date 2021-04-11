//ELEMENTOS BASICOS

describe('Work with basic elements', () => {
	before(() => {
		//executa e depois iniciam os testes
		cy.visit('https://wcaquino.me/cypress/componentes.html')
	})

	beforeEach(() => {
		//executa antes do inicio de cada teste
		cy.reload()
			//refresh na página, pra limpar os campos
	})

	//TEXTO
	it('Text', () => {
		cy.get('body').should('contain', 'Cuidado')
		//é um JQuery Selector que vai no get
		//pode usar o name da <tag> (generalizada)
		cy.get('span').should('contain', 'Cuidado')
		
		//ideal é colocar a classe do CSS, usando o selector do cypress
		cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
			//have.text é o texto exato
	})

	//LINKS
	it('Links', () => {
		cy.get('a').click()
			//busca por id, quando vai uma #
		cy.get('#resultado').should('have.text','Voltou!')

		//OU
		cy.reload()
		cy.get('#resultado').should('have.not.text','Voltou!')
		cy.contains('Voltar').click()
			//nao é o ideal, e com as alterações do multi idioma, nao vai ser aplicavel
		cy.get('#resultado').should('have.text','Voltou!')

	})

	//CAMPOS DE TEXTO
	it('TextField', () => {
		cy.get('#formNome').type('Cypress Test')
		cy.get('#formNome').should('have.value', 'Cypress Test')
			//confirma que o que foi digitado foi no campo
			//fica gravado no atributo value	
		
		//TEXT AREA
		cy.get('#elementosForm\\:sugestoes')
					//quando ID for com \:, fazer dessa maneira
			.type('textArea')
			.should('have.value', 'textArea')

		cy.get('[data-cy=dataSobrenome]')
			.type('Teste12345{backspace}{backspace}')
				//vai apagar 2 digitos depois com o backspace
			.should('have.value', 'Teste123')

		cy.get('#elementosForm\\:sugestoes')
			.clear()
			//limpa o que estiver nele
			.type('Erro{selectall}acerto', {delay: 100})
				//campos de texto com evento JS, FILTROS DE BUSCA
			.should('have.value', 'acerto')
	})

	//RADIO BUTTON
	it('RadioButton', () => {
		cy.get('#formSexoFem')
			.click()
			.should('be.checked')	//está selecionada
		cy.get('#formSexoMasc')
			.should('not.be.checked')
			//por ser radio button, ou um ou outro

		cy.get("[name='formSexo']").should('have.length', 2)
			//quando usa o [], busca pela propriedade
			//aqui valida se tem dois radioButtons (fem e masc)
			//se nao tiver espaço, não precisa das ''
	})	

	//CHECKBOX
	it('Checkbox', () => {
		cy.get('#formComidaPizza')
			.click()
			.should('be.checked')

		//clicar em todos os checkbox, vai pelo NAME
		cy.get('[name=formComidaFavorita]')
			.click({multiple: true})
		cy.get('#formComidaPizza').shoukd('not.be.checked')
		cy.get('#formComidaVegetariana').should('be.checked')
	})

	//COMBOBOX
	it('Combobox', () => {
		cy.get('[data-test=dataEscolaridade]')
			.select('2o grau completo')
				//pra selecionar pode ser o "nome" ou o value
			.should('have.value', '2graucomp')
				//olhar o value pelo F12, nem sempre é igual ao texto mostrado
			
			.select('1graucomp')
			.should('have.value', '1graucomp')

		//validar as opções que aparecem
		cy.get('[data-test-dataEscolaridade] option').should('have.length', 8)
			//o option é a label dentro do html	

		cy.get('[data-test-dataEscolaridade] option').then($arr =>{
			//tratar como um array porque desejamos analisar a lista de opções
			//os values de cada opcao
			const values = []
			$arr.each(function() {
				//pegar o inner html, que é o texto que aparece
				//via function() porque precisava do .this
				values.push(this.innterHTML)
			})

			expect(values).to.include.members(["Superior", "Mestrado"])
		})
	})
	
	//COMBO MULTIPLO (seleciona mais de uma opção)
	it('Combobox Multiplo', () => {
		cy.get('[data-testid=dataEsportes]')
			.select(['natacao','Corrida'])
			//via Array, precisa ser o VALUE

		//validar as opções selecionadas
		cy.get('[data-testid=dataEsportes]').then($el => {
			expect($el.val()).to.be.deep.equal(['natacao','Corrida'])
			expect($el.val()).to.have.length(3)
		})

		cy.get('[data-testid=dataEsportes]')
			.invoke('val')
			.should('eql', ['natacao','Corrida'])
			//eql equivale ao .deep.equal
	}) 
})