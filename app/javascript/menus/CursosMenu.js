// CursosMenu.js
import { mostrarMenuPrincipal } from './MenuPrincipal.js';

export function mostrarMenuCursos(terminal) {
    // Realizar una solicitud al servidor para obtener la lista de cursos
    fetch('/cursos')
        .then(response => response.json())
        .then(cursos => {
            terminal.clear();
            terminal.writeln('Cursos de Autoaprendizaje Disponibles:');
            cursos.forEach((curso, index) => {
                terminal.writeln(`${index + 1}. ${curso.nombre}`);
            });
            terminal.writeln('\nSeleccione un curso o presione 0 para volver al menú principal: ');
        })
        .catch(error => {
            terminal.writeln('Error al cargar los cursos.');
            console.error(error);
        });
}

export function procesarOpcionCursos(opcion, terminal) {
    if (opcion === '0') {
      mostrarMenuPrincipal(terminal);
      return;
    }
  
    const cursoId = parseInt(opcion);
    if (isNaN(cursoId) || cursoId < 1) {
      terminal.writeln('Opción no válida. Intente de nuevo.');
      mostrarMenuCursos(terminal);
      return;
    }
  
    fetch('/cursos')
    .then(response => response.json())
    .then(cursos => {
        const cursoSeleccionado = cursos.find(curso => curso.id === parseInt(opcion));
        if (!cursoSeleccionado) {
            throw new Error('Curso no encontrado');
        }
        return fetch(cursoSeleccionado.url);
    })
    .then(response => response.json())
    .then(cursoJson => mostrarCurso(cursoJson, terminal))
    .catch(error => {
        terminal.writeln('Error al cargar el curso.');
        console.error(error);
    });
  }
function mostrarCurso(curso, terminal) {
    terminal.clear();
    terminal.writeln(`Curso: ${curso.nombre}`);
    terminal.writeln(curso.descripcion);
    curso.lecciones.forEach((leccion, index) => {
        terminal.writeln(`Lección ${index + 1}: ${leccion.titulo}`);
        terminal.writeln(leccion.contenido);
        leccion.instrucciones.forEach(instruccion => {
            terminal.writeln(instruccion);
        });
        // Aquí puedes incluir lógica para manejar la pregunta y las posibles soluciones
    });
    terminal.writeln('Curso completado. Presione Enter para volver al menú principal.');
}

// Esta función se puede usar para volver al menú principal después de completar un curso
export function volverAlMenuPrincipal(terminal) {
    mostrarMenuPrincipal(terminal);
}
