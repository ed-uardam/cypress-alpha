//- alerts, pop-ups, frame

/*MOCKS:
assemelha a teste unitário
método A que chama internamente um B e uma API
em vez de fazer todo o caminho dos demais métodos,
faz um mock do retorno esperado, então o teste vai
analisar apenas o método A*/

/*ALERT:
	como a mensagem de sistema atualizado (do próprio Chrome)
	não dá pra clicar e nem fazer a assertiva em cima do alert
*/
it('Alert', () => {
    cy.get('#alert').click()
    cy.on('window: alert', msg => {
    console.log(msg)
    expect(msg).to.be.equal('Alert Simples')
    })
})

it('Alert com mock', () => {
    const stub = cy.stub()
        //substitui uma function
        //pode declarar o retorno
        //pode manejar

    cy.on('window: alert', stub)
    
})
