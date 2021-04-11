//MÉTODOS HELPERS

describe('Helpers', () => {
    it('Wrap', () => {
        //tornar objetos passíveis de serem comparados
        //usando funções do proprio cypress, sem ser via expect
        //como o .should()

        const obj = {nome: 'User', idade: '20'}
        expect(obj).to.have.property('nome')
        
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').type('funciona')
        //fazendo via promise:
        cy.get('#formNome').then($el => {
            //$el.type não funcionaria!
            //$el.val('funciona via JQuery')
            cy.wrap($el).type('funciona')
        })

        const promise = new Promise(resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        }

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
            //executar a promise acima NESSA ORDEM
        cy.wrap(promise).then(ret = console.log(ret))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))
    
        //mesmo com o wrap, comportamento do should e then é o mesmo
        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', '2')

        cy.wrap(1).should(num => {
            return 2
        }).should('be.equal', '1')	
    })

    it('Its', () => {
        //trabalha com a PROPRIEDADE de um elemento dentro do cypress
        const obj = {nome: 'User', idade: '20'}
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')
            //qual a propriedade do 'nome'?

        const obj2 = {
            nome: 'User',
            idade: 20.
            endereco: {rua: 'dos bobos'}
        }

        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
            //pode encadear its para chegar até no value da propriedade
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
            //como o should fica fazendo os retries, o ideal para encadear é:
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        //pode ser usado pra usar propriedades de Strings, como o length
        //fazendo um .its('length'), como pegar e mostrar o TITLE da pagina			
    })

    it('Invoke', () => {
        //trabalha com as FUNÇÕES
        const getValue = () => 1;
        const soma = (a,b) => a+b;

        cy.wrap({fn: getValue}).invoke('fn').should('be.equal', 1)
        cy.wrap({fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via Invoke')
            //val é uma function do JQuery
            //isso funciona como o type

        //CONTROLE EM CIMA DA WINDOW INTEIRA
        cy.window().invoke('alert', 'Dá pra ver?')
            //irá jogar um alerta (pop-up mensagem) na janela da aplicação
            //como é durante o teste, o cypress já mata
            //mais pra frente vai explicar como faz pra mostrar
            
        cy.get('#resultado')
            .invoke('html', '<input type ="button"> <value = "hacked!"/>')
                //permite imbutir um elemento html
    })

})