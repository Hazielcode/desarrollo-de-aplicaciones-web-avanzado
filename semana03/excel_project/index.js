const http = require('http');
const ExcelJS = require('exceljs');

const server = http.createServer(async (req, res) => {
    // 1. Ruta Principal (Raíz /)
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Bienvenido a la página principal');
    }
    // 2. Ruta del Reporte (/reporte)
    else if (req.url === '/reporte') {
        try {
            console.log('--- Iniciando generación de reporte Excel ---');
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Ventas');

            sheet.columns = [
                { header: 'Producto', key: 'producto', width: 25 },
                { header: 'Cantidad', key: 'cantidad', width: 15 },
                { header: 'Precio', key: 'precio', width: 15 },
            ];

            const productos = ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Audífonos', 'Cámara', 'Microfono', 'Silla Gamer', 'Escritorio', 'Cable HDMI'];
            for (let i = 1; i <= 20; i++) {
                sheet.addRow({
                    producto: productos[i % productos.length] + ' v' + i,
                    cantidad: Math.floor(Math.random() * 10) + 1,
                    precio: (Math.random() * 1000).toFixed(2)
                });
            }

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename="reporte_ventas.xlsx"');

            await workbook.xlsx.write(res);
            
            console.log('--- Reporte enviado exitosamente ---');
            res.end();

        } catch (error) {
            console.error('Error al generar el Excel:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error interno al generar el reporte.');
        }
    } 
    // 3. Cualquier otra ruta (Mensaje de advertencia)
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Visita /reporte para descargar el Excel');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor HTTP listo en http://localhost:${PORT}`);
    console.log('Rutas:');
    console.log(' - /         -> Bienvenido');
    console.log(' - /reporte  -> Descarga Excel');
    console.log(' - /cualquier-cosa -> Advertencia');
});
