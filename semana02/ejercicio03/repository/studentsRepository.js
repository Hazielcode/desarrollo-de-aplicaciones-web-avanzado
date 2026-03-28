let students = [
    { 
        id: 1, 
        name: "Ana", 
        grade: 18, 
        age: 21, 
        email: "ana@ejemplo.com", 
        phone: "+51 911111111", 
        enrollmentNumber: "2025002", 
        course: "Ingeniería de Software", 
        year: 2, 
        subjects: ["Matemáticas", "Programación"], 
        gpa: 3.5, 
        status: "Inactivo", 
        admissionDate: "2023-03-01" 
    },
    { 
        id: 2, 
        name: "Juan Pérez", 
        grade: 20, 
        age: 23, 
        email: "juan.perez@ejemplo.com", 
        phone: "+51 987654321", 
        enrollmentNumber: "2025001", 
        course: "Diseño y Desarrollo de Software C24", 
        year: 3, 
        subjects: ["Algoritmos", "Bases de Datos", "Redes"], 
        gpa: 3.8, 
        status: "Activo", 
        admissionDate: "2022-03-01" 
    }
];

function getAll() {
    return students;
}

function getById(id) {
    return students.find(s => s.id === id);
}

function getByStatus(status) {
    return students.filter(s => s.status === status);
}

function getByGrade(grade) {
    // Filtrar a los que tienen un promedio mayor o igual al proporcionado
    return students.filter(s => s.grade >= grade);
}

function create(student) {
    student.id = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
    students.push(student);
    return student;
}

function update(id, updateData) {
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { ...students[index], ...updateData };
        return students[index];
    }
    return null;
}

function remove(id) {
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        return students.splice(index, 1)[0];
    }
    return null;
}

module.exports = { getAll, getById, getByStatus, getByGrade, create, update, remove };
