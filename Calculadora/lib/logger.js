const chalk = require('chalk');

function logOperacion(tipo, a, b, resultado) {
    const tipoColor = {
        suma: chalk.green,
        resta: chalk.yellow,

    };

    const color = tipoColor[tipo] || chalk.white;
    console.log(color(`[${tipo.toUpperCase()}] ${a} y ${b} → Resultado: ${resultado}`));
}

function logError(mensaje) {
    console.error(chalk.red.bold(`[ERROR] ${mensaje}`));
}

function logInfo(mensaje) {
    console.log(chalk.cyan(`[INFO] ${mensaje}`));
}

module.exports = {
    logOperacion,
    logError,
    logInfo
};