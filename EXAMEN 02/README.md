# Calculadora CLI (Examen 02)

![Node.js](https://img.shields.io/badge/Node.js-20.x-green) ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue)

Una robusta aplicación de línea de comandos (CLI) construida en Node.js, diseñada para realizar operaciones matemáticas y estadísticas de manera eficiente y modular. Este proyecto sirve como demostración práctica de un ciclo de vida de desarrollo de software moderno, integrando:
- **Análisis de código estático (Linting)** para mantener la calidad.
- **Verificación de formato** para asegurar consistencia.
- **Pruebas unitarias automatizadas** con cobertura de código.
- **Empaquetado optimizado** con `esbuild` para distribución.
- **Pipeline de Integración Continua (CI)** completo utilizando GitHub Actions.

## 📋 Tabla de Contenidos

1. [Arquitectura del Proyecto](#1-arquitectura-ascii)
2. [Guía de Pantalla y Comandos](#2-que-deberias-ver-en-pantalla)
3. [Requisitos Previos](#3-requisitos)
4. [Instalación y Configuración](#4-instalacion-rapida)
5. [Manual de Uso](#5-uso-basico)
6. [Scripts de NPM](#6-scripts-npm)
7. [Integración Continua (CI)](#7-pipeline-ci-github-actions)
8. [Flujo de Trabajo (Git)](#8-flujo-de-ramas-y-pr)
9. [Stack Tecnológico](#9-tecnologias-y-conceptos)
10. [Verificación Completa](#10-pasos-para-ver-funcionar-todo)
11. [Lógica Interna](#11-estructura-de-datos-y-flujo-interno-resumen)
12. [Solución de Problemas](#12-problemas-comunes)

---

## 1. Arquitectura (ASCII)

La estructura del proyecto sigue una separación clara de responsabilidades, facilitando el mantenimiento y la escalabilidad.

```
EXAMEN 02/
├─ src/
│  ├─ calculator.js    # Lógica de negocio pura (Core): funciones matemáticas sin dependencias de I/O.
│  └─ index.js         # Capa de presentación (CLI Controller): maneja argumentos, llamadas a la lógica y salida a consola.
├─ tests/
│  ├─ calculator.test.js # Pruebas unitarias aisladas para calculator.js.
│  └─ cli.test.js        # Pruebas de integración o sistema para la interfaz CLI.
├─ dist/               # Directorio de salida para artefactos compilados/minificados.
│  └─ app.js           # Bundle único generado por esbuild (listo para producción).
├─ docs/
│  └─ pipeline.md      # Documentación específica explicativa del pipeline CI.
├─ .github/
│  └─ workflows/
│     └─ ci.yml        # Definición declarativa del flujo de trabajo de GitHub Actions.
├─ coverage/           # Reportes detallados de cobertura de código generados por Jest (HTML/LCOV).
├─ package.json        # Manifiesto del proyecto: define scripts, dependencias y metadatos.
└─ jest.config.cjs     # Configuración para el framework de pruebas Jest.
```

## 2. Que deberias ver en pantalla

La aplicación proporciona retroalimentación clara y estructurada para cada operación.

### Ayuda General

Si ejecutas sin argumentos o con `--help`:

```
=== Calculadora CLI (Examen 02) ===
Uso: node src/index.js <comando> <numeros>

Comandos disponibles:
  sum    Suma todos los numeros.
  avg    Calcula el promedio.
  stats  Muestra total, promedio, minimo y maximo.
```

### Comando `sum` (Suma)

Suma una lista arbitraria de números proporcionados como argumentos.

```bash
node src/index.js sum 2 3 5
# Salida esperada:
Total: 10
```

### Comando `avg` (Promedio)

Calcula la media aritmética de los valores ingresados.

```bash
node src/index.js avg 10,20,30
# Salida esperada:
Promedio: 20.00
```

### Comando `stats` (Estadísticas)

Genera un reporte estadístico completo (n, suma, media, min, max).

```bash
node src/index.js stats 1 4 9
# Salida esperada:
Cantidad: 3
Total: 14
Promedio: 4.67
Minimo: 1
Maximo: 9
```

## 3. Requisitos

Para ejecutar y desarrollar en este proyecto necesitas tener instalado en tu sistema:

- **Node.js**: Versión 20 o superior (Se recomienda la versión LTS actual).
- **npm**: Versión 10 o superior (gestor de paquetes incluido con Node.js).

## 4. Instalacion rapida

Para preparar el entorno de desarrollo localmente:

1.  Navega al directorio del proyecto:
    ```bash
    cd "EXAMEN 02"
    ```
2.  Instala las dependencias definidas en `package.json`:
    ```bash
    npm install
    ```
    > **Tip Pro:** Usa `npm ci` para una instalación limpia e idéntica a la que ocurre en el servidor de CI (basada estrictamente en `package-lock.json`).

## 5. Uso basico

La CLI es flexible en la entrada de datos: acepta números separados por **espacios**, **comas** o una **mezcla de ambos**.

```bash
# Ver ayuda y comandos disponibles
node src/index.js --help

# Sumar (separado por espacios)
node src/index.js sum 2 3 5

# Sumar (separado por comas)
node src/index.js sum 2,3,5

# Promedio (mezcla de separadores)
node src/index.js avg 10 20,30

# Estadisticas (manejo de negativos)
node src/index.js stats 1 4 9 50 -10
```

## 6. Scripts npm

El archivo `package.json` incluye scripts automatizados para facilitar el ciclo de vida del desarrollo:

| Script | Comando Real | Descripción |
| :--- | :--- | :--- |
| `npm run lint` | `eslint .` | Analiza el código con **ESLint** buscando errores de sintaxis, bugs potenciales y violaciones de estilo. |
| `npm run format:check` | `prettier --check .` | Verifica si el código cumple con las reglas de formato de **Prettier** sin modificarlo (ideal para CI). |
| `npm run format` | `prettier --write .` | **Re-formatea automáticamente** todo el código del proyecto para cumplir con los estándares definidos. |
| `npm test` | `jest --coverage` | Ejecuta las pruebas unitarias con **Jest** y genera un reporte de cobertura de código en la carpeta `coverage/`. |
| `npm run clean` | (custom script) | Elimina el directorio `dist/` para asegurar que la siguiente compilación sea limpia y desde cero. |
| `npm run build` | `npm run clean && esbuild ...` | Ejecuta `clean`, y luego compila y empaqueta el código fuente usando **esbuild** en un archivo optimizado `dist/app.js`. |
| `npm start` | `node dist/app.js` | Ejecuta la versión **compilada y optimizada** de la aplicación (simula el entorno de producción). |
| `npm run dev` | `node src/index.js ...` | Helper para ejecutar la ayuda rápidamente desde el código fuente sin compilar. |
| `npm run demo` | (secuencia) | Ejecuta una demostración completa: muestra ayuda, calcula una suma, un promedio y estadísticas en secuencia. |

## 7. Pipeline CI (GitHub Actions)

El proyecto cuenta con integración continua robusta configurada en `.github/workflows/ci.yml`.

### Disparadores (Triggers)
- **Push**: Se ejecuta en cada subida de código a cualquier rama.
- **Pull Request**: Se ejecuta al abrir o actualizar Pull Requests.

### Trabajos (Jobs)

El pipeline está diseñado para ser rápido y confiable, ejecutando tareas en paralelo donde es posible:

1.  **Job `lint`**:
    -   Entorno: `ubuntu-latest`
    -   Acción: Instala dependencias y ejecuta `npm run lint`. Falla si hay errores de linter.
2.  **Job `format`**:
    -   Entorno: `ubuntu-latest`
    -   Acción: Verifica el estilo de código con `npm run format:check`. Falla si el código no está formateado correctamente.
3.  **Job `test`**:
    -   Entorno: `ubuntu-latest`
    -   Acción: Ejecuta las pruebas unitarias (`npm test`). Asegura que la lógica de negocio funcione como se espera.
4.  **Job `build`**:
    -   **Dependencia**: Este job espera a que `lint`, `format`, y `test` terminen exitosamente (`needs: [lint, format, test]`).
    -   Acción: Genera el artefacto de producción (`npm run build`).
    -   **Smoke Test**: Ejecuta inmediatamente el artefacto generado (`node dist/app.js stats 1 2 3`) para verificar que el build arranca y funciona.

## 8. Flujo de ramas y PR

Para mantener la calidad y estabilidad del código, seguimos el siguiente flujo de trabajo:

1.  **Crear Rama**: Para cada nueva característica o corrección, crea una rama desde `develop` (o `main` según tu estrategia).
    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```
2.  **Desarrollo Local**: Realiza tus cambios. Antes de subir, asegura la calidad:
    ```bash
    npm run format  # Aplica formato
    npm test        # Verifica que no rompiste nada
    ```
3.  **Pull Request (PR)**: Sube tus cambios y abre un PR en GitHub.
4.  **Validación Automática**: GitHub Actions ejecutará el CI Pipeline.
    -   Debes obtener ✅ en todos los checks (Lint, Format, Test, Build).
5.  **Aprobación**: Se requiere al menos una aprobación de revisión de código (Code Review) antes de fusionar.

## 9. Tecnologias y conceptos

-   **Node.js**: Entorno de ejecución de JavaScript fuera del navegador.
-   **CommonJS**: Sistema de módulos utilizado en este proyecto (`require`, `module.exports`).
-   **ESLint**: Herramienta de análisis estático ("Linter") para identificar y reportar patrones en JavaScript. Ayuda a evitar errores y mantener consistencia.
-   **Prettier**: Formateador de código opinionado. Se encarga del "estilo" (espacios, comas, paréntesis) para que te enfoques en la lógica.
-   **Jest**: Framework de pruebas completo. Aquí se usa para definir casos de prueba (`describe`, `test`, `expect`) y medir la cobertura de código.
-   **esbuild**: Empaquetador (bundler) de próxima generación extremadamente rápido. Transforma y minifica el código de `src/` en un archivo distribuible en `dist/`.
-   **GitHub Actions**: Plataforma de CI/CD integrada en GitHub que automatiza el flujo de construcción, prueba y despliegue.

## 10. Pasos para ver funcionar todo

Sigue esta "receta" para validar el estado completo del proyecto en tu máquina:

```bash
cd "EXAMEN 02"
npm install          # 1. Instalar todas las dependencias
npm run lint         # 2. Verificar que el código cumple las reglas de calidad
npm run format:check # 3. Verificar que el estilo es correcto
npm test             # 4. Correr las pruebas y generar reporte de cobertura
npm run build        # 5. Limpiar y generar el ejecutable final en dist/
npm start -- stats 1 2 3  # 6. Ejecutar el artefacto de producción manual
# O para una demostración rápida de todo:
npm run demo
```

## 11. Estructura de datos y flujo interno (resumen)

### `src/index.js` (Controlador)
Es el punto de entrada de la CLI.
1.  **Lectura de Argumentos**: Recolecta `process.argv`, ignorando los dos primeros elementos (ruta de node y ruta del script).
2.  **Validación Básica**: Verifica si hay comandos.
3.  **Despacho**: Identifica el comando (`sum`, `avg`, `stats`) o muestra ayuda.
4.  **Procesamiento**: Llama a `calculator.parseNumbers` para convertir los argumentos de entrada (strings) en un array de números.
5.  **Ejecución**: Invoca la función correspondiente de `calculator.js` e imprime el resultado.
6.  **Manejo de Errores**: Todo está envuelto en un bloque `try-catch` para capturar errores (como inputs inválidos) y mostrarlos amigablemente al usuario.

### `src/calculator.js` (Lógica de Negocio)
Módulo que contiene funciones puras, ideales para testear:
-   **`toNumber(value)`**: Intenta convertir un string a número. Lanza un error explícito si el resultado es `NaN`.
-   **`parseNumbers(args)`**:
    -   Toma un array de strings (ej: `['1,2', ' 3 ']`).
    -   Usa `flatMap` para separar por comas.
    -   `trim()` para limpiar espacios.
    -   Filtra vacíos y convierte todo a números usando `toNumber`.
-   **`sum(numbers)`**: Usa `Array.reduce` para acumular la suma total.
-   **`average(numbers)`**: Valida que el array no esté vacío (evita división por cero) y retorna la media (`suma / cantidad`).
-   **`stats(numbers)`**: Retorna un objeto estructurado con `{ total, promedio, minimo, maximo, cantidad }`. Utiliza `Math.min` y `Math.max` con el operador spread (`...`) para encontrar extremos.

## 12. Problemas comunes

-   **"node no se reconoce / npm no se reconoce"**:
    -   Agrega el directorio de instalación de Node.js a tu variable de entorno `PATH`.
    -   Reinstala Node.js (versión 20+ recomendada).
-   **Permisos de ejecución en PowerShell**:
    -   Si recibes errores de seguridad al ejecutar npm, abre PowerShell como administrador y ejecuta: `Set-ExecutionPolicy RemoteSigned`. O usa `cmd` clásico.
-   **El formato falla en CI (`npm run format:check` fails)**:
    -   Esto sucede si modificaste archivos sin formatearlos.
    -   **Solución**: Ejecuta `npm run format` localmente para que Prettier arregle los archivos, y luego haz commit de esos cambios.
-   **Errores de lógica "NaN"**:
    -   Asegúrate de no estar enviando letras o caracteres especiales en los argumentos numéricos.

Listo: con estos pasos deberias poder instalar, correr, testear y ver la salida esperada tanto localmente como en CI.
