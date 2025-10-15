const { BibliotecaMatematica } = require('./lib/math-lib');

class Calculadora {
    constructor(biblioteca = BibliotecaMatematica) {
        this.biblioteca = biblioteca;
    }

    async iniciarConsola() {
        if (typeof require === 'undefined') {
            console.error('Interfaz de consola solo disponible en Node.js');
            return;
        }
        const readline = require('readline');
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        const preguntar = (pregunta) => new Promise((resolver) => rl.question(pregunta, (respuesta) => resolver(respuesta)));

        try {
            console.log('Hola ! bienvenido a la calculadora.');
            const operacion = (await preguntar('¿Qué operación deseas realizar? (sumar/restar): ')).trim().toLowerCase();
            if (operacion !== 'sumar' && operacion !== 'restar') {
                throw new Error('Operación no válida. Use "sumar" o "restar".');
            }

            const a = await preguntar('Ingrese primer valor: ');
            const b = await preguntar('Ingrese segundo valor: ');

            const resultado = operacion === 'sumar' ?
                this.biblioteca.sumar(a, b) :
                this.biblioteca.restar(a, b);

            console.log(`Resultado: ${resultado}`);
        } catch (err) {
            console.error('Error:', err.message || err);
        } finally {
            rl.close();
        }
    }
}

const calculadora = new Calculadora(BibliotecaMatematica);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = calculadora;
}

if (typeof require !== 'undefined' && require.main === module) {
    calculadora.iniciarConsola();
}