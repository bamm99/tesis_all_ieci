

export function ver_malla(terminal) {
    // Lógica para la opción 2
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
    
    function verTodasAsignaturas() {
        terminal.writeln("Asignaturas por semestre:");
        semestres.forEach((asignaturas, indiceSemestre) => {
            terminal.writeln(`Semestre ${indiceSemestre + 1}:`);
            asignaturas.forEach((asignatura, indice) => {
                terminal.writeln(`${indice + 1}. ${asignatura}`);
            });
            terminal.writeln("");
        });
    }

    verTodasAsignaturas(); // Llamada a la función para mostrar las asignaturas
    terminal.writeln('----------------------------------------');
    terminal.writeln("Presione Enter para regresar al menú principal.");
    terminal.writeln('----------------------------------------');

}