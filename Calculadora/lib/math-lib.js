/**
 * BibliotecaMatematica: funciones básicas para la calculadora
 * - sumar(a, b): suma a + b
 * - restar(a, b): resta a - b
 *
 * Ambas funciones aceptan números o cadenas numéricas y validan la entrada.
 */

const BibliotecaMatematica = (function() {
    // Convierte a número y valida (mejorada: trim y acepta coma decimal)
    function convertirNumero(valor) {
        if (typeof valor === 'number') {
            if (Number.isNaN(valor)) {
                throw new TypeError(`Valor no numérico: ${valor}`);
            }
            return valor;
        }
        if (typeof valor === 'string') {
            const s = valor.trim().replace(',', '.');
            const n = Number(s);
            if (Number.isNaN(n)) {
                throw new TypeError(`Valor no numérico: "${valor}"`);
            }
            return n;
        }
        // otros tipos no permitidos
        throw new TypeError(`Tipo no válido para conversión a número: ${typeof valor}`);
    }

    // Suma
    function sumar(a, b) {
        const x = convertirNumero(a);
        const y = convertirNumero(b);
        return x + y;
    }

    // Resta
    function restar(a, b) {
        const x = convertirNumero(a);
        const y = convertirNumero(b);
        return x - y;
    }

    return {
        sumar,
        restar
    };
})();

// Exportar BibliotecaMatematica para Node y navegador
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BibliotecaMatematica };
} else if (typeof window !== 'undefined') {
    window.BibliotecaMatematica = BibliotecaMatematica;
}