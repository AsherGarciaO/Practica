function calcularAlturaImpacto(yIObjeto, grados, yIProyectil = 0) {
    let distanciaX = (yIObjeto-yIProyectil)/(sen(grados))*cos(grados);
    let vIProyectil = potencia((2*9.81*distanciaX), 0.5)/sen(grados);
    let tiempo = distanciaX/(vIProyectil*cos(grados));
    let posicionImpactoY = yIObjeto -((0.5)*(9.81)*tiempo*tiempo);

    return {v0p: vIProyectil, xF: distanciaX, yF: posicionImpactoY, t: tiempo};
}

// Funciones Extra
function potencia(base, exponente){
    return Math.pow(base, exponente);
}

// Funciones Trigonométricas Necesarias
function sen(grados) {
    return Math.sin(convertirGradosRadianes(grados));
}

function cos(grados) {
    return Math.cos(convertirGradosRadianes(grados));
}

function tan(grados){
    return Math.tan(convertirGradosRadianes(grados));
}

// Convertir Grados a Radianes para poder usar sen y cos
function convertirGradosRadianes(grados) {
    return (grados * (Math.PI / 180));
}

//Funciones MRUA y MRU
function movimientoYParabólico(y0, v0, grados, t){
    let yf = y0 + v0*sen(grados)*t - (0.5*9.81*potencia(t, 2));

    return yf;
}

function movimientoXParabolico(x0, v0, grados, t){
    let xf = x0 + v0*cos(grados)*t;

    return xf;
}