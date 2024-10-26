function obtenerDatosInput(id) {
    console.log(id);
    return parseFloat(document.getElementById(id).value);
}

function deshabilitarInput(id){
    document.getElementById(id).disabled = true;
}

function habilitarInput(id){
    document.getElementById(id).disabled = false;
}

function deshabilitarInputs(){
    deshabilitarInput("anguloP");
    deshabilitarInput("alturaO");
    deshabilitarInput("alturaP");
    deshabilitarInput("calcular");
}

function habilitarInputs(){
    habilitarInput("anguloP");
    habilitarInput("alturaO");
    habilitarInput("alturaP");
    habilitarInput("calcular");
}

function agregarEventos(calcular, button, ...ids) {
    document.getElementById(button).addEventListener('click', () => {
        let angulo = obtenerDatosInput("anguloP");
        let yObjeto = obtenerDatosInput("alturaO");
        let yProyectil = obtenerDatosInput("alturaP");
        let resultado = calcular(yObjeto, angulo, yProyectil);
        mostrarResultado(resultado);
        deshabilitarInputs();
        simularMovimiento(resultado.v0p, angulo, yProyectil, yObjeto, resultado.xF);
    });

    ids.forEach(item => {
        document.getElementById(item).addEventListener('change', () => {
            let angulo = obtenerDatosInput("anguloP");
            let yObjeto = obtenerDatosInput("alturaO");
            let yProyectil = obtenerDatosInput("alturaP");
            let resultado = calcular(yObjeto, angulo, yProyectil);
            mostrarResultado(resultado);
            deshabilitarInputs();
            simularMovimiento(resultado.v0p, angulo, yProyectil, yObjeto, resultado.xF);
        });
    });
}

function mostrarResultado(resultado) {
    document.getElementById("velI").textContent = `Velocidad Inicial: ${resultado.v0p.toFixed(2)} m/s`;
    document.getElementById("yF").textContent = `Posición del Impacto en Y: ${resultado.yF.toFixed(2)} m`;
    document.getElementById("xF").textContent = `Posición del Impacto en Y: ${resultado.xF.toFixed(2)} m`;
    document.getElementById("t").textContent = `Tiempo de Vuelo: ${resultado.t.toFixed(2)} s`;
}

function simularMovimiento(v0, angulo, alturaInicial, alturaObjeto, distancia) {
    console.log();
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let t = 0;
    let colisionado = false;
    let objetoEnElSuelo = false;

    let animar = () => {
        let y0Objeto = canvas.height  - alturaObjeto;
        let dt = parseFloat(document.getElementById("velocidad").value);
        let g = 9.81;
        let radio = 5;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t += dt;

        let xProyectil = movimientoXParabolico(0, v0, angulo, t);
        let yProyectil = canvas.height-movimientoYParabólico(alturaInicial, v0, angulo, t);
        let yCaidaObjeto = y0Objeto + (0.5 * g * t * t);

        let distanciaEntreCentros = Math.sqrt(
            Math.pow(xProyectil - (distancia + 10), 2) + Math.pow(yProyectil - yCaidaObjeto, 2)
        );

        if (!colisionado && distanciaEntreCentros <= (5)) {
            colisionado = true;
            ctx.fillText("¡Colisión!", xProyectil, yProyectil - 10);
        }

        ctx.beginPath();
        ctx.arc(xProyectil, yProyectil, radio, 0, Math.PI * 2);
        ctx.fillStyle = colisionado ? "green" : "blue";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(distancia, yCaidaObjeto, radio, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        if (!objetoEnElSuelo && yCaidaObjeto >= canvas.height) {
            objetoEnElSuelo = true;
            ctx.fillText("¡El objeto ha tocado el suelo!", distancia, canvas.height - 10);
        }
        
        
        if (!colisionado && !objetoEnElSuelo) {
            requestAnimationFrame(animar);
        } 
        else{
            habilitarInputs();
        }
    };

    animar();
}