const { Transform } = require('stream');
const fs = require('fs');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        // Convertimos el chunk (pedazo de datos) a string y luego a MAYÚSCULAS
        callback(null, chunk.toString().toUpperCase());
    }
});

const readStream = fs.createReadStream('texto.txt');
const writeStream = fs.createWriteStream('texto_mayusculas.txt');

console.log('--- Iniciando transformación a MAYÚSCULAS ---');

readStream.pipe(transformStream).pipe(writeStream);

writeStream.on('finish', () => {
    console.log('--- Proceso completado: texto_mayusculas.txt creado ---');
});

writeStream.on('error', (err) => {
    console.error('Error durante la escritura:', err);
});
