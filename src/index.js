let turnos = 0;
const $tablero = document.querySelector("#tablero");
const $cuadros = document.querySelectorAll(".cuadro");
const $colores = ["amarillo","rojo","azul","verde","rosa","naranja"]
var $primerCuadro = null;

function configurarJuego(colores){
    var $coloresDuplicados = colores.concat(colores);
    var $coloresAleatorios = $coloresDuplicados.sort(function(){
        return 0.5 - Math.random();
    })
    configurarCuadros($coloresAleatorios);
    manejarEvento($tablero);
}

function configurarCuadros(coloresAleatorios){
    coloresAleatorios.forEach(function(color,i){
        $cuadros[i].classList.add(color);
    })
}

function manejarEvento($tablero){
    $tablero.onclick = function(e){
        const $elemento = e.target
        if($elemento.classList.contains("cuadro")){
            manejarClickCuadro($elemento);
        }
    }
}

function manejarClickCuadro($cuadroActual){
    mostrarCuadro($cuadroActual);
    if ($primerCuadro === null){
        $primerCuadro = $cuadroActual
    } else{

        if ($primerCuadro === $cuadroActual){
            console.log("Seleccionaste el mismo cuadro")
        } else{
    
            if(cuadrosSonIguales($primerCuadro,$cuadroActual)){
                eliminarCuadro($primerCuadro);
                eliminarCuadro($cuadroActual);
            } else{
                ocultarCuadro($primerCuadro);
                ocultarCuadro($cuadroActual);
            }

            turnos++

            $primerCuadro = null;
    
        }

    }

}

function cuadrosSonIguales($primerCuadro,$segundoCuadro){

    return $primerCuadro.className === $segundoCuadro.className;

    /* if ($primerCuadro.className === $segundoCuadro.className){
        console.log($primerCuadro.classList)
        return true
    } else{
        return false
    } */

}

function eliminarCuadro(cuadroPorEliminar){
    setTimeout(function(){
        cuadroPorEliminar.parentElement.classList.add("completo")
        cuadroPorEliminar.remove();
        evaluarFinDeJuego();
    },500)
}

function evaluarFinDeJuego(){
    const cuadros = document.querySelectorAll(".cuadro");
    if (cuadros.length === 0){
        $tablero.style.display = "none"
        $mensaje = document.querySelector(".mensaje");
        $mensaje.style.display = "block";
        $mensaje.innerHTML = "Tardaste '<strong>'" + turnos + "'</strong>' turnos en terminar"
    }
}

function mostrarCuadro($cuadro){
    $cuadro.style.opacity = 1;
}

function ocultarCuadro($cuadro){
    setTimeout(function(){
        $cuadro.style.opacity = 0;
    },500)
}


configurarJuego($colores);