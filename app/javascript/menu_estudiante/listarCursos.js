import { seleccionarCurso } from "./seleccionarCurso";

export function listarCursos(terminal, setCommandHandler) {
    fetch('/cursos', { headers: { 'Cache-Control': 'no-cache' } })
        .then(response => response.json())
        .then(cursos => {
            terminal.writeln('Cursos disponibles:');
            cursos.forEach((curso, index) => {
                terminal.writeln(`${index + 1}. ${curso.nombre}`);
            });
            // Pasar control a seleccionarCurso
            seleccionarCurso(cursos, terminal, setCommandHandler);
        });

        
}
