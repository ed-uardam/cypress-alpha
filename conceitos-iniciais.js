/*Testes ficam na pasta INTEGRATION*/

nomeDoTeste.spec.js
it('nome do teste', function(){})
it ('nome do teste', () => {})

//variaveis - const (nao alterar)
//		    - let (vai ser alterada)

//ARROW FUNCTIONS
	const nomeFuncao = (a,b) => {
		return a+b
	}

	const nomeFuncao = (a,b) => a+b

	const nomeFuncao = (a) => a+a

	const nomeFuncao = a => a+a

	const NomeFuncao = () => 5+5

//	- function: .this referencia quem invocou
//	- arrow: .this 

//PROMISES
	//resto da aplicação continua funcionando enquanto aguarda a resposta do método
	//- resolve: quando a promise for finalizada
	//- reject: algum problema aconteceu

	const nomeFuncao = () => {
		return new Promise((resolve, reject) => {
			resolve(a);
		})
	}

	const prom = nomeFuncao();
	prom.then(retornoPromise => {
		//o que quer que faça depois que terminar
	});

	//pode ser nomeFuncao().then(...)

	//ASYNC E AWAIT NÃO É INDICADO