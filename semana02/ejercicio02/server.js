const http = require('http');
const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

const port = 3002;

function renderView(viewName, data, res) {
    const viewPath = path.join(__dirname, 'views', viewName + '.hbs');
    fs.readFile(viewPath, 'utf-8', (err, source) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Error al cargar la vista');
            return;
        }
        const template = Handlebars.compile(source);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(template(data));
    });
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        renderView('home', {
            titulo: 'servidor con handlebars',
            mensaje: 'bienvenido al servidor node..js'
        }, res);
    } else if (req.url === '/about') {
        renderView('about', {
            curso: 'Desarrollo de Aplicaciones Web Avanzado',
            profesor: 'Arévalo Sermeño Edwin William',
            fecha: '28/03/2026'
        }, res);
    } else if (req.url === '/students') {
        // Datos de cursos de programación
        const data = [
            { nombre: 'Ana García', curso: 'React Frontend', nota: 18 },
            { nombre: 'Carlos Ruiz', curso: 'Node.js Backend', nota: 14 },
            { nombre: 'Lucía Méndez', curso: 'Python para Datos', nota: 16 },
            { nombre: 'Jorge Silva', curso: 'Java Spring Boot', nota: 13 },
            { nombre: 'Sofía Castro', curso: 'Desarrollo Web Avanzado', nota: 19 }
        ];

        // Procesamos los datos para generar la bandera booleana para Handlebars
        const estudiantes = data.map(est => ({
            ...est,
            destacado: est.nota > 15
        }));

        renderView('students', { estudiantes }, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Error 404: Página no encontrada');
    }
});

server.listen(port, () => {
    console.log(`Servidor Handlebars en ejecución en http://localhost:${port}/`);
});
