import { mostrarMenuPrincipal } from './MenuPrincipal.js';

export function mostrarMenuCursos(terminal, userId) {
    console.log("Mostrando cursos, userID:", userId);
    fetch('/cursos')
        .then(response => response.json())
        .then(cursos => {
            terminal.clear();
            terminal.writeln('Cursos de Autoaprendizaje Disponibles:');
            cursos.forEach((curso, index) => {
                terminal.writeln(`${index + 1}. ${curso.nombre}`);
            });
            terminal.writeln('\nSeleccione un curso o presione 0 para volver al menú principal: ');
            capturarOpcionCursos(terminal, userId);
        })
        .catch(error => {
            console.error('Error al cargar los cursos:', error);
            terminal.writeln('Error al cargar los cursos.');
            mostrarMenuPrincipal(terminal, userId);
        });
}

function capturarOpcionCursos(terminal, userId) {
    let inputBuffer = '';
    terminal.onKey(({ key, domEvent }) => {
        if (domEvent.keyCode === 13) { // Enter
            terminal.write('\r\n');
            procesarOpcionCursos(inputBuffer.trim(), terminal, userId);
            inputBuffer = '';
        } else if (domEvent.keyCode === 8 && inputBuffer.length > 0) { // Backspace
            inputBuffer = inputBuffer.slice(0, -1);
            terminal.write('\b \b');
        } else if (/^\d+$/.test(key)) { // Solo números
            inputBuffer += key;
            terminal.write(key);
        }
    });
}

export function procesarOpcionCursos(opcion, terminal, userId) {
    console.log("Procesando opción de cursos, userID:", userId, "Opción:", opcion);
    if (opcion === '0') {
        mostrarMenuPrincipal(terminal, userId);
        return;
    }

    const cursoId = parseInt(opcion);
    if (isNaN(cursoId) || cursoId < 1) {
        terminal.writeln('Opción no válida. Intente de nuevo.');
        mostrarMenuCursos(terminal, userId);
        return;
    }

    cargarCurso(cursoId, userId, terminal);
}

function cargarCurso(cursoId, userId, terminal) {
    console.log("Cargando curso, cursoID:", cursoId, "userID:", userId);
    fetch(`/cursos/${cursoId}`)
        .then(response => response.json())
        .then(cursoJson => {
            obtenerProgresoUsuario(cursoId, userId, (progreso) => {
                if (progreso > 0 && progreso < cursoJson.lecciones.length) {
                    preguntarReinicioCurso(cursoJson, progreso, terminal, userId);
                } else {
                    mostrarLeccion(cursoJson, progreso, terminal, userId);
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar el curso:', error);
            terminal.writeln('Error al cargar el curso.');
            mostrarMenuCursos(terminal, userId);
        });
}



function obtenerProgresoUsuario(cursoId, userId, callback) {
    fetch(`/progreso_cursos/${cursoId}/obtener?usuario_id=${userId}`)
        .then(response => response.json())
        .then(progreso => callback(progreso.progreso))
        .catch(error => {
            console.error('Error al obtener progreso:', error);
            callback(0);
        });
}

function preguntarReinicioCurso(curso, progresoActual, terminal, userId) {
    terminal.clear();
    terminal.writeln('Ya tiene progreso en este curso. ¿Desea reiniciar el curso? (S/N)');
    let inputBuffer = '';
    terminal.onKey(({ key, domEvent }) => {
        if (/^[SsNn]$/.test(key) && inputBuffer === '') {
            inputBuffer = key.toUpperCase();
            terminal.write(key);
        } else if (domEvent.keyCode === 13) { // Enter
            terminal.write('\r\n');
            if (inputBuffer === 'S') {
                mostrarLeccion(curso, 0, terminal, userId);
            } else {
                mostrarLeccion(curso, progresoActual, terminal, userId);
            }
        }
    });
}

function mostrarLeccion(curso, leccionIndex, terminal, userId) {
    terminal.clear();
    if (leccionIndex < curso.lecciones.length) {
        let leccion = curso.lecciones[leccionIndex];
        terminal.writeln(`Lección ${leccionIndex + 1}: ${leccion.titulo}`);
        terminal.writeln(leccion.contenido);

        preguntarSiLeccionFunciono(curso, leccionIndex, terminal, userId);
    } else {
        terminal.writeln('Ha completado todas las lecciones del curso.');
        mostrarMenuCursos(terminal, userId);
    }
}

function preguntarSiLeccionFunciono(curso, leccionIndex, terminal, userId) {
    terminal.writeln('\n¿Le funcionó lo que se indicó en esta lección? (S/N)');
    let inputBuffer = '';
    terminal.onKey(({ key, domEvent }) => {
        if (/^[SsNn]$/.test(key) && inputBuffer === '') {
            inputBuffer = key.toUpperCase();
            terminal.write(key);
        } else if (domEvent.keyCode === 13) { // Enter
            terminal.write('\r\n');
            if (inputBuffer === 'S' || inputBuffer === 'N') {
                actualizarProgresoUsuario(curso.id, leccionIndex + 1, userId, terminal);
            } else {
                terminal.writeln('Respuesta no válida. Intente de nuevo.');
                preguntarSiLeccionFunciono(curso, leccionIndex, terminal, userId);
            }
        }
    });
}

function actualizarProgresoUsuario(cursoId, progreso, userId, terminal) {
    const data = { progreso_curso: { progreso: progreso } };
    fetch(`/progreso_cursos/${cursoId}/actualizar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.progreso != null) {
            mostrarMenuCursos(terminal, userId);
        } else {
            terminal.writeln('Error al actualizar el progreso.');
        }
    })
    .catch(error => {
        console.error('Error al actualizar el progreso:', error);
        terminal.writeln('Error al actualizar el progreso.');
    });
}

export function volverAlMenuPrincipal(terminal) {
    console.log("Volviendo al menú principal");
    mostrarMenuPrincipal(terminal);
}
