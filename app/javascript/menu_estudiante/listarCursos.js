import { activarEntrada } from "../control_entrada";
import { seleccionarCurso } from "./seleccionarCurso";


export function listarCursos(terminal, setCommandHandler) {
  fetch('/cursos')
    .then(response => response.json())
    .then(cursos => {
      terminal.writeln('Cursos disponibles:');
      cursos.forEach((curso, index) => {
        terminal.writeln(`${index + 1}. ${curso.nombre}`);
      });
      terminal.writeln('Ingrese el número del curso que desea ver:');
      activarEntrada(terminal);
      setCommandHandler(input => {
        seleccionarCurso(input, cursos, terminal, setCommandHandler);
      });
    })
    .catch(error => {
      console.error('Error al obtener cursos:', error);
      terminal.writeln('Error al cargar los cursos.');
    });
}

