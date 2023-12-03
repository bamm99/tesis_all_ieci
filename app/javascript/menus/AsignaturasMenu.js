export function mostrarMenuAsignaturas(terminal) {
    terminal.clear();
    terminal.writeln('Menú de Asignaturas');
    terminal.writeln('2.1 Seleccione el semestre de la asignatura');
    terminal.write('Ingrese una subopción: ');
}

export function procesarOpcionAsignaturas(opcion, terminal) {
    switch (opcion) {
        case '2.1':
            terminal.writeln('Opción 2.1 seleccionada: Seleccione el semestre de la asignatura');
            mostrarMenuAsignaturasSemestre(terminal);
            break;
        default:
            terminal.writeln('Subopción no válida. Intente de nuevo.');
            mostrarMenuAsignaturas(terminal);
            break;
    }
}

export function mostrarMenuAsignaturasSemestre(terminal) {
    terminal.clear();
    terminal.writeln('Menú de Asignaturas por Semestre');
    terminal.writeln('2.2.1 Seleccionar asignatura');
    terminal.writeln('2.2.2 Ver listado de documentos');
    terminal.writeln('2.2.3 Descargar documento');
    terminal.writeln('2.2.4 Consultar si desea descargar otro documento o volver al menú principal');
    terminal.write('Ingrese una subopción: ');
}

// Aquí puedes agregar procesarOpcionAsignaturasSemestre y más lógica según sea necesario
