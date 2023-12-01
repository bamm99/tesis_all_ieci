import { activarEntrada } from '../control_entrada';
import { listarCursos } from './listarCursos';

export function seleccionarCurso(cursos, terminal, setCommandHandler) {
    terminal.write('Ingrese el número del curso que desea ver:');
    activarEntrada(terminal);

    setCommandHandler(input => {
        const cursoIndex = parseInt(input) - 1;
        if (isNaN(cursoIndex) || cursoIndex < 0 || cursoIndex >= cursos.length) {
            terminal.writeln("Por favor, ingresa un número de curso válido.");
            // Volver a listar los cursos
            listarCursos(terminal, setCommandHandler);
            return;
        }
  
        const cursoSeleccionado = cursos[cursoIndex];
        terminal.writeln(`Has seleccionado: ${cursoSeleccionado.nombre}`);
        terminal.writeln('----------------------------------------');
        // Continuar con la lógica específica del curso seleccionado
    });
}
    