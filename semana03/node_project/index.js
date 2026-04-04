const fs = require('fs');
const zlib = require('zlib');

const readable = fs.createReadStream('datos.txt', { encoding: 'utf8' });

readable.on('data', chunk => console.log('Fragmento recibido:\n', chunk));

readable.on('end', () => console.log('Lectura completa'));

readable.on('error', err => console.error('Error:', err));

// Actividad 2: Escritura en un Archivo usando Streams
const writableFile = fs.createWriteStream('salida.txt');

writableFile.write('Este es un mensaje de prueba.\n');

writableFile.end('Fin del mensaje.');

writableFile.on('finish', () => console.log('Escritura completada.'));

// Actividad 3: Compresión con Pipes
const readStreamComp = fs.createReadStream('entrada.txt');
const writeStreamComp = fs.createWriteStream('entrada.txt.gz');

const gzip = zlib.createGzip();

readStreamComp.pipe(gzip).pipe(writeStreamComp);

writeStreamComp.on('finish', () => console.log('Archivo comprimido exitosamente (entrada.txt.gz).'));

// Actividad 4: Manejo de Errores y Backpressure (Manual)
const readableBP = fs.createReadStream('entrada.txt');
const writableBP = fs.createWriteStream('salida_backpressure.txt');

readableBP.on('data', chunk => {
    // Si el buffer de escritura está lleno, pausamos la lectura
    if (!writableBP.write(chunk)) {
        console.log('--- Backpressure detectado: Pausando lectura ---');
        readableBP.pause();
    }
});

// Cuando el buffer de escritura se vacía, reanudamos la lectura
writableBP.on('drain', () => {
    console.log('--- Buffer liberado: Reanudando lectura ---');
    readableBP.resume();
});

writableBP.on('finish', () => console.log('Escritura con Backpressure completada.'));
