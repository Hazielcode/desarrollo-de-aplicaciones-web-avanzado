const express = require("express");
const app = express();
const path = require("path");

// Configurar el motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, "public")));

// Middleware para procesar datos de formularios
app.use(express.urlencoded({ extended: false }));


// Importar rutas
const mainRoutes = require("./routes/mainRoutes");
const gravastarRoutes = require("./routes/gravastarRoutes");
app.use("/", mainRoutes);
app.use("/gravastar", gravastarRoutes);

// Iniciar el servidor
const PORT = 3000;
const http = require('http');
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

// Middleware 404 - cuando no se encuentra la ruta
app.use((req, res, next) => {
  res.status(404).render('notFound', { url: req.originalUrl });
});
