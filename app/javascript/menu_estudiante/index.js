import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { activarEntrada, desactivarEntrada } from '../control_entrada';
import { docs_asig } from './docs_asig';
import { ver_malla } from './ver_malla';
import { gestorCursos } from './gestor_cursos';


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
    activarEntrada(terminal);
    viendoMalla = false;
}

export function procesarOpcion(opcion, terminal) {
    if(viendoMalla){
        mostrarMenuPrincipal(terminal);
        viendoMalla = false;
        return
    }
    switch (opcion) {
        case '1':
            terminal.writeln('Funcionalidad en desarrollo');
            break;
        case '2':
            ver_malla(terminal);
            viendoMalla = true;
            break;
        case '3':
            gestorCursos(terminal, setCommandHandler);

            break;
        default:
            terminal.writeln('Opción no válida');
            mostrarMenuPrincipal(terminal);
            break;
    }
}