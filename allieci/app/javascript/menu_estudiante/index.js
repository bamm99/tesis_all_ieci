import { docs_asig } from './docs_asig';
import { ver_malla } from './ver_malla';
import { cursos_linux } from './cursos_linux';

export function mostrarMenuPrincipal(terminal) {
    terminal.clear();
    terminal.writeln('----------------------------------------');
    terminal.writeln('Bienvenido a ALL_IECI');
    terminal.writeln('Software creado por Benjamin Mosso');
    terminal.writeln('Estudiante de Ingenieria de Ejecucion en computacion e informatica');
    terminal.writeln('Universidad Del Bio-Bio');
    terminal.writeln('----------------------------------------');
    terminal.writeln('               Menu');
    terminal.writeln('1. Ver asignatura de un semestre');
    terminal.writeln('2. Ver todas las asignaturas');
    terminal.writeln('3. Ver curso de autoaprendizaje Linux');
    terminal.writeln('----------------------------------------');
    terminal.write('Ingrese una opcion: ');
}

export function procesarOpcion(opcion, terminal) {
    switch (opcion) {
        case '1':
            docs_asig(terminal);
            break;
        case '2':
            ver_malla(terminal);
            break;
        case '3':
            cursos_linux(terminal);
            break;
        default:
            terminal.writeln('Opción no válida');
            mostrarMenuPrincipal(terminal);
            break;
    }
}