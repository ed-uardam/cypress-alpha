//DESCRIBE/IT

/// <reference types ="cypress"/>

	//it = caso de teste

    it('nome teste', () => {
	
    })
    
        //describe = agrupa testes
    
    describe('grupo de testes', () => {
        it('teste01', () => {
        
        })
    })
    
        //- pode ter um describe dentro de describe
        //- pode ter mais de um teste por describe
    
    //SKIP/ONLY
    
        it.skip('Teste nao executado', () => {
            //pra "pular" o texto
            //pode ser colocado em mais de um teste
        })
    
        describe.it('Grupo de testes pulado', () =>{
    
        })
    
        it.only('Apenas este teste', () => {
            //executa apenas este, os demais não
            //nao pode ter dois com .only
            //se tiver mais de um, apenas o ultimo vai ser executado
        })