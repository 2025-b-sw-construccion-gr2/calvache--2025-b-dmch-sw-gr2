# Flujo de CI

El workflow `CI Pipeline` corre en cada `push` y `pull_request`.

1. **lint**: instala dependencias y ejecuta `npm run lint`.
2. **format**: valida estilo con `npm run format:check`.
3. **test**: ejecuta `npm test` y genera carpeta `coverage`.
4. **build**: depende de los tres anteriores, compila con `npm run build` y ejecuta un smoke test con `node dist/app.js stats 1 2 3`.

Se usa Node 20.x y caché de `npm` para acelerar. El directorio de trabajo del pipeline es `EXAMEN 02/`.
