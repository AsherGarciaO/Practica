function obtenerDatosInput(id) {
    return parseFloat(document.getElementById(id).value);
}

function deshabilitarInput(id){
    document.getElementById(id).disabled = true;
}

function habilitarInput(id){
    document.getElementById(id).disabled = false;
}

function deshabilitarInputs(){
    deshabilitarInput("tiempo");
    deshabilitarInput("anguloP");
    deshabilitarInput("alturaO");
    deshabilitarInput("alturaP");
    deshabilitarInput("calcular");
    deshabilitarInput("alturaP");
}

function habilitarInputs(){
    habilitarInput("tiempo");
    habilitarInput("anguloP");
    habilitarInput("alturaO");
    habilitarInput("alturaP");
    habilitarInput("calcular");
    habilitarInput("alturaP");
}

function agregarEventos(calcular, button, ...ids) {
    document.getElementById(button).addEventListener('click', () => {
        let tiempo = obtenerDatosInput("tiempo");
        let angulo = obtenerDatosInput("anguloP");
        let yObjeto = obtenerDatosInput("alturaO");
        let yProyectil = obtenerDatosInput("alturaP");
        let resultado = calcular(yObjeto, angulo, tiempo, yProyectil);
        mostrarResultado(resultado);
        deshabilitarInputs();
        simularMovimiento(resultado.v0p, angulo, yProyectil, yObjeto, resultado.xF);
    });

    ids.forEach(item => {
        document.getElementById(item).addEventListener('change', () => {
            let tiempo = obtenerDatosInput("tiempo");
            let angulo = obtenerDatosInput("anguloP");
            let yObjeto = obtenerDatosInput("alturaO");
            let yProyectil = obtenerDatosInput("alturaP");
            let resultado = calcular(yObjeto, angulo, tiempo, yProyectil);
            mostrarResultado(resultado);
            deshabilitarInputs();
            simularMovimiento(resultado.v0p, angulo, yProyectil, yObjeto, resultado.xF);
        });
    });
}

function mostrarResultado(resultado) {
    document.getElementById("velI").textContent = `Velocidad Inicial: ${resultado.v0p.toFixed(2)} m/s`;
    document.getElementById("dis").textContent = `Distancia Recorrida en X: ${resultado.xF.toFixed(2)} m`;
    document.getElementById("yF").textContent = `Posición del Impacto en Y: ${resultado.yF.toFixed(2)} m`;
}

function simularMovimiento(v0, angulo, alturaInicial, alturaObjeto, distancia) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let t = 0;
    let colisionado = false;
    let objetoEnElSuelo = false;

    let animar = () => {
        let y0Proyectil = canvas.height - alturaInicial;
        let y0Objeto = canvas.height  - alturaObjeto;
        let dt = parseFloat(document.getElementById("velocidad").value);
        let g = 9.81;
        let radio = 5;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t += dt;

        let xProyectil = 10 + v0 * t * cos(convertirGradosRadianes(angulo));
        let yProyectil = y0Proyectil - (v0 * t * sen(convertirGradosRadianes(angulo)) - (0.5 * g * t * t));

        let yCaidaObjeto = y0Objeto + (0.5 * g * t * t);

        ctx.beginPath();
        ctx.arc(xProyectil, yProyectil, radio, 0, Math.PI * 2);
        ctx.fillStyle = colisionado ? "green" : "blue";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(distancia + 10, yCaidaObjeto, radio, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        let distanciaEntreCentros = Math.sqrt(
            Math.pow(xProyectil - (distancia + 10), 2) + Math.pow(yProyectil - yCaidaObjeto, 2)
        );

        if (!objetoEnElSuelo && yCaidaObjeto >= canvas.height) {
            objetoEnElSuelo = true;
            ctx.fillText("¡El objeto ha tocado el suelo!", distancia, canvas.height - 10);
        }
        console.log(xProyectil + " - " + yProyectil);
        if (!colisionado && distanciaEntreCentros <= (5)) {
            colisionado = true;
            ctx.fillText("¡Colisión!", xProyectil, yProyectil - 10);
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