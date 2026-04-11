const http = require("http");
const repo = require("./repository/studentsRepository");

const PORT = 4000;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const { method, url } = req;

    // RUTA 1: GET /students
    if (url === "/students" && method === "GET") {
        res.statusCode = 200;
        res.end(JSON.stringify(repo.getAll()));
    }
    // RUTA 2: GET /students/:id
    else if (url.startsWith("/students/") && method === "GET") {
        const id = parseInt(url.split("/")[2]);
        const student = repo.getById(id);

        if (student) {
            res.statusCode = 200;
            res.end(JSON.stringify(student));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
        }
    }
    // RUTA 3: POST /students
    else if (url === "/students" && method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () => {
            if (body) {
                const data = JSON.parse(body);
                
                // VALIDACIÓN OBLIGATORIA
                if (!data.name || !data.email || !data.course || !data.phone) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: "Faltan datos obligatorios para matricularte. Revisa name, email, course y phone." }));
                    return;
                }

                const newStudent = repo.create(data);
                res.statusCode = 201;
                res.end(JSON.stringify(newStudent));
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Faltan datos en la petición" }));
            }
        });
    }
    // RUTA 4: PUT /students/:id
    else if (url.startsWith("/students/") && method === "PUT") {
        const id = parseInt(url.split("/")[2]);
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () => {
            if (body) {
                const updated = repo.update(id, JSON.parse(body));
                if (updated) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(updated));
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
                }
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Faltan datos para actualizar" }));
            }
        });
    }
    // RUTA 5: DELETE /students/:id
    else if (url.startsWith("/students/") && method === "DELETE") {
        const id = parseInt(url.split("/")[2]);
        const deleted = repo.remove(id);

        if (deleted) {
            res.statusCode = 200;
            res.end(JSON.stringify(deleted));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
        }
    }
    // RUTA NUEVA: POST /ListByStatus
    else if (url === "/ListByStatus" && method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const data = JSON.parse(body || "{}");
            if (!data.status) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Por favor provee un 'status' en el JSON. Ej: { status: 'Activo' }" }));
                return;
            }
            res.statusCode = 200;
            res.end(JSON.stringify(repo.getByStatus(data.status)));
        });
    }
    // RUTA NUEVA: POST /ListByGrade
    else if (url === "/ListByGrade" && method === "POST") {
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            const data = JSON.parse(body || "{}");
            if (typeof data.grade !== 'number') {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Por favor provee un 'grade' numérico en el JSON. Ej: { grade: 15 }" }));
                return;
            }
            res.statusCode = 200;
            res.end(JSON.stringify(repo.getByGrade(data.grade)));
        });
    }
    // RUTA POR DEFECTO: 404
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Ruta no encontrada" }));
    }
});

server.listen(PORT, () => {
    console.log(`API REST iniciada y ejecutándose en http://localhost:${PORT}/`);
});
