import { mostrarMenuCursos } from './CursosMenu.js';
import { mostrarMenuAsignaturas } from './AsignaturasMenu.js';
import { Terminal } from 'xterm';

export function mostrarMenuPrincipal(terminal) {
    terminal.clear();
    terminal.writeln('Bienvenido a ALL_IECI');
    terminal.writeln('1. Ver todas las asignaturas');
    terminal.writeln('2. Ver asignaturas de un semestre');
    terminal.writeln('3. Ver cursos de autoaprendizaje');
    terminal.writeln('0. Salir');
    terminal.write('Ingrese una opción: ');
}

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

function listarTodasAsignaturas(terminal) {
    terminal.clear();
    semestres.forEach((asignaturas, indiceSemestre) => {
        terminal.writeln(`Semestre ${indiceSemestre + 1}:`);
        asignaturas.forEach(asignatura => {
            terminal.writeln(` - ${asignatura}`);
        });
    });
    terminal.writeln('');
    terminal.writeln('Presione Enter para volver al menú principal...');
}

export function procesarOpcionPrincipal(opcion, terminal) {
    switch (opcion) {
        case '1':
            listarTodasAsignaturas(terminal);
            break;
        case '2':
            mostrarMenuAsignaturas(terminal);
            break;
        case '3':
            mostrarMenuCursos(terminal);
            break;
        default:
            terminal.writeln('Opción no válida. Intente de nuevo.');
            mostrarMenuPrincipal(terminal);
            break;
    }
}
