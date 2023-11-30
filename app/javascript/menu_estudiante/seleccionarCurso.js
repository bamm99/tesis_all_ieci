import { activarEntrada } from '../control_entrada';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { listarCursos } from './listarCursos';

    export function seleccionarCurso(input, cursos, terminal, setCommandHandler) {
        const cursoIndex = parseInt(input) - 1;
        if (isNaN(cursoIndex) || cursoIndex < 0 || cursoIndex >= cursos.length) {
        terminal.writeln("Por favor, ingresa un número de curso válido.");
        activarEntrada(terminal);
        return;
        }
  
        const cursoSeleccionado = cursos[cursoIndex];
        terminal.writeln(`Has seleccionado: ${cursoSeleccionado.nombre}`);
        terminal.writeln('----------------------------------------');
  }
  
