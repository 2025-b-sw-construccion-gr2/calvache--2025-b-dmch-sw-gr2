#!/usr/bin/env node

const { parseNumbers, sum, average, stats } = require('./calculator');

function printHeader() {
    console.log('=== Calculadora CLI (Examen 02) ===');
}

function printHelp() {
    printHeader();
    console.log('Uso: node src/index.js <comando> <numeros>');
    console.log('\nComandos disponibles:');
    console.log('  sum    Suma todos los numeros.');
    console.log('  avg    Calcula el promedio.');
    console.log('  stats  Muestra total, promedio, m�nimo y m�ximo.');
    console.log('\nEjemplos:');
    console.log('  node src/index.js sum 2 3 5');
    console.log('  node src/index.js avg 10,20,30');
    console.log('  node src/index.js stats 1 4 9');
}

function handleCommand(command, numbers) {
    switch (command) {
        case 'sum':
            console.log(`Total: ${sum(numbers)}`);
            break;
        case 'avg':
            console.log(`Promedio: ${average(numbers).toFixed(2)}`);
            break;
        case 'stats':
            {
                const resumen = stats(numbers);
                console.log(
                    `Cantidad: ${resumen.cantidad}\nTotal: ${resumen.total}\nPromedio: ${resumen.promedio.toFixed(
          2
        )}\nM�nimo: ${resumen.minimo}\nM�ximo: ${resumen.maximo}`
                );
                break;
            }
        default:
            printHelp();
            process.exitCode = 1;
    }
}

function main() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        printHelp();
        return;
    }

    const [command, ...rest] = args;

    try {
        const numbers = parseNumbers(rest);
        if (numbers.length === 0) {
            throw new Error('Agrega al menos un n�mero.');
        }
        handleCommand(command, numbers);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
    }
}

if (require.main === module) {
    main();
}

module.exports = { main, printHelp, handleCommand };