export function docs_asig(terminal, setCommandHandler) {
    terminal.writeln("Semestre de la asignatura que buscas (1-8)?:");
    setCommandHandler(input => handleSemestreInput(input, terminal, setCommandHandler));
}

function handleSemestreInput(input, terminal, setCommandHandler) {
    const semestre = parseInt(input);
    if (isNaN(semestre) || semestre < 1 || semestre > 8) {
        terminal.writeln("Por favor, ingresa un número de semestre válido (1-8).");
        return;
    }

    mostrarAsignaturasPorSemestre(semestre, terminal);
    setCommandHandler(input => handleAsignaturaInput(input, semestre, terminal, setCommandHandler));
}

function mostrarAsignaturasPorSemestre(semestre, terminal) {
    const semestres = [
        ["Algebra 1", "Nociones de Computacion e Informatica", "Algoritmos y Bases de la Programacion", "Introduccion a la Ingenieria", "Comunicacion y Argumentacion"],
        ["Algebra 2", "Calculo 1", "Algoritmos y Programacion", "Estructuras Discretas para Ciencias de la Programacion"],
        ["Estadisticas y Probabilidades", "Calculo 2", "Estructura de Datos", "Administracion General", "Economia"],
        ["Arquitectura de Computadores", "Paradigmas de la Programacion", "Analisis de Algoritmos y Teoria de Automatas", "Ingles 1", "Practica Profesional 1"],
        ["Metodologia de Desarrollo", "Base de Datos", "Sistemas de Informacion", "Sistemas Financieros y Contables", "Ingles 2"],
        ["Inteligencia Artificial", "Sistemas Operativos", "Ingenieria de Software", "Formulacion y Evaluacion de Proyectos", "Ingles 3", "Electivos de Especialidad"],
        ["Electivos de Especialidad", "Comunicacion de Datos y Redes", "Taller de Desarrollo", "Gestion Empresarial", "Ingles 4"],
        ["Electivos de Especialidad", "Proyecto Final de Carrera"]
    ];

    terminal.writeln(`Asignaturas del semestre ${semestre}:`);
    semestres[semestre - 1].forEach((asignatura, index) => {
        terminal.writeln(`${index + 1}. ${asignatura}`);
    });
}

function handleAsignaturaInput(input, semestre, terminal, setCommandHandler) {
    const asignaturaIndex = parseInt(input) - 1;
    if (isNaN(asignaturaIndex) || asignaturaIndex < 0 || asignaturaIndex >= semestres[semestre - 1].length) {
        terminal.writeln("Por favor, ingresa un número de asignatura válido.");
        return;
    }

    mostrarDocumentos(asignaturaIndex, terminal);
}

function mostrarDocumentos(asignaturaIndex, terminal) {
    // Aquí puedes listar los documentos estáticos
    terminal.writeln("Documentos disponibles:");
    terminal.writeln("1. documento1.pdf");
    terminal.writeln("2. documento2.pdf");
    terminal.writeln("3. documento3.pdf");
    // ... y así sucesivamente
}