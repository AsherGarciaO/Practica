function calcularAlturaImpacto(yIObjeto, grados, tiempo, yIProyectil = 0) {
    let vIProyectil = (yIObjeto)/(sen(grados)*tiempo);
    let distanciaX = vIProyectil * tiempo * cos(grados);
    let posicionImpactoY = yIObjeto -((0.5)*(9.81)*tiempo*tiempo);
    console.log(vIProyectil);
    return {v0p: vIProyectil, xF: distanciaX, yF: posicionImpactoY};
}

// Funciones Trigonométricas Necesarias
function sen(grados) {
    return Math.sin(convertirGradosRadianes(grados));
}

function cos(grados) {
    return Math.cos(convertirGradosRadianes(grados));
}

// Convertir Grados a Radianes para poder usar sen y cos
function convertirGradosRadianes(grados) {
    return (grados * (Math.PI / 180));
}
