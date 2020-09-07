
const URL = "127.0.0.1:5500"

context ("Memotest", () =>{
    before(() => {
        cy.visit(URL);
    });

    describe("Juega al memotest", () =>{
        const NUMERO_CUADROS = 12;

        it("se asegura que haya un tablero con cuadros", () =>{
            cy.get("#tablero").find(".cuadro").should("have.length",NUMERO_CUADROS);
        })

        it("se asegura que los cuadros sean aleatorios", () =>{
            cy.get(".cuadro").then((cuadros) =>{
                let clasesOriginales = [];
                cuadros.each(function(i,cuadro){
                    clasesOriginales.push(cuadro.className)
                })

                cy.visit(URL);

                let clasesSecundarias = [];

                cy.get(".cuadro").then((nuevosCuadros) =>{
                    nuevosCuadros.each(function(i,cuadro){
                        clasesSecundarias.push(cuadro.className);
                    })
                })

                cy.wrap(clasesOriginales).should("not.deep.equal",clasesSecundarias);
                
            })
        })

        describe("resuelve el juego", () =>{
            let mapaDePares,listaDePares;
            it("elige una combinacion erronea", () =>{
                cy.get(".cuadro").then(cuadros =>{
                    mapaDePares = obtenerParesDeCuadros(cuadros);
                    listaDePares = Object.values(mapaDePares);

                    console.log(mapaDePares);
                    console.log(listaDePares);

                    cy.get(listaDePares[0][0]).click();
                    cy.get(listaDePares[1][0]).click();

                    cy.get(".cuadro").should("have.length",NUMERO_CUADROS);
                })
            })

            it ("resuelve el juego", () =>{
                cy.get(".cuadro").should("have.length", NUMERO_CUADROS);

                listaDePares.forEach(function(par){
                    cy.get(par[0]).click();
                    cy.get(par[1]).click();
                })

                cy.get(".cuadro").should("have.length",0);

                cy.get("#tablero").should("not.be.visible");
                const numeroTurnos = NUMERO_CUADROS / 2 + 1; // 1 PORQUE SE TESTEO UNO INCORRECTO

                cy.get(".mensaje").should("be.visible").contains("Tardaste ''7'' turnos en terminar")
            })

        })

    })

})

function obtenerParesDeCuadros(cuadros){
    let pares = {};

    cuadros.each(function(i,cuadro){
        const claseColor = cuadro.className.replace("cuadro ", "");
        console.log(claseColor.className)

        if (pares[claseColor]){
            pares[claseColor].push(cuadro);
        } else{
            pares[claseColor] = [cuadro];
        }
    })
    console.log(pares);
    return pares;
}