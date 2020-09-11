let turnos = 0;
const $tablero = document.querySelector("#tablero");
const $cuadros = document.querySelectorAll(".cuadro");
const $covers = ["biggie","nas","fifty","snoop","wutang","drake","drdre","dirty","jayz","kanye"]
var $primerCuadro = null;

function configurarJuego(covers){
    var $coversDuplicados = covers.concat(covers);
    var $coversAleatorios = $coversDuplicados.sort(function(){
        return 0.5 - Math.random();
    })
    configurarCuadros($coversAleatorios);
    manejarEvento($tablero);
}

function configurarCuadros(coversAleatorios){
    coversAleatorios.forEach(function(cover,i){
        $cuadros[i].classList.add(cover);
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
        cuadroPorEliminar.parentElement.style.transform = "scale(1.0)";
        cuadroPorEliminar.parentElement.style.zIndex = "0";
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
        document.querySelector("#mensajeFinal").innerHTML = "PUNTUACION '<span id='turnos'>" + turnos + "</span>'";
        Swal.fire(
            'TERMINASTE!',
            `Tardaste ${turnos} turnos en completarlo`,
            'success'
        )          
    }
}

function mostrarCuadro($cuadro){
    $cuadro.style.transform = "rotateY(180deg)";
    $cuadro.style.opacity = 1;
}

function ocultarCuadro($cuadro){
    setTimeout(function(){
        $cuadro.style.transform = "rotateY(360deg)";
        $cuadro.style.opacity = 0;
    },700)
}

configurarJuego($covers);