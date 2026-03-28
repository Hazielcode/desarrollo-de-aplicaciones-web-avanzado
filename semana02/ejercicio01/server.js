const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('bienvenido al servidor node.js 🚀\n');
  } else if (req.url === '/about') {
    res.statusCode = 200;
    res.end('Acerca de\n');
  } else if (req.url === '/contact') {
    res.statusCode = 200;
    res.end('Página de contacto\n');
  } else if (req.url === '/services') {
    res.statusCode = 200;
    res.end('Lista de servicios:\n- Desarrollo Web\n- Consultoría\n- Seguridad Informática\n');
  } else if (req.url === '/error') {
    res.statusCode = 500;
    res.end('Error 500: Error interno del servidor\n');
  } else {
    res.statusCode = 404;
    res.end('Error 404: Página no encontrada\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Servidor en ejecución en http://${hostname}:${port}/`);
});
