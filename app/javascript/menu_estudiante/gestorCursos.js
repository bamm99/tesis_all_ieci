import { activarEntrada } from "../control_entrada";

export function gestorCursos(terminal, setCommandHandler) {
    // Función para listar cursos
    function listarCursos() {
        fetch('/cursos', { headers: { 'Cache-Control': 'no-cache' } })
            .then(response => response.json())
            .then(cursos => {
                terminal.writeln('Cursos disponibles:');
                cursos.forEach((curso, index) => {
                    terminal.writeln(`${index + 1}. ${curso.nombre}`);
                });

                seleccionarCurso(cursos);
            })
            .catch(error => {
                console.error('Error al obtener cursos:', error);
                terminal.writeln('Error al cargar los cursos.');
            });
    }

    // Función para seleccionar un curso
    function seleccionarCurso(cursos) {
        terminal.write('Ingrese el número del curso que desea ver:');
        activarEntrada(terminal);

        setCommandHandler(input => {
            const cursoIndex = parseInt(input) - 1;
            if (isNaN(cursoIndex) || cursoIndex < 0 || cursoIndex >= cursos.length) {
                terminal.writeln("Por favor, ingresa un número de curso válido.");
                listarCursos();
                return;
            }
    
            const cursoSeleccionado = cursos[cursoIndex];
            terminal.writeln(`Has seleccionado: ${cursoSeleccionado.nombre}`);
            terminal.writeln('----------------------------------------');
            // Continuar con la lógica específica del curso seleccionado
        });
    }

    // Iniciar listando los cursos
    listarCursos();
}
