import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

document.addEventListener("DOMContentLoaded", () => {
    const terminal = new Terminal({
        cols: 80,
        rows: 28,
        theme: {
            background: '#772953',
            foreground: '#ffffff',
            cursor: 'rgba(255,255,255,0.5)',
            selection: 'rgba(255,255,255,0.3)'
        }
    });

    terminal.open(document.getElementById('terminal-container'));
    terminal.focus(); 
    mostrarMenuPrincipal();

    let inputBuffer = '';

    terminal.onKey(({ key, domEvent }) => {
        if (domEvent.keyCode === 13) { // Enter key
            terminal.write("\r\n");
            processCommand(inputBuffer);
            inputBuffer = ''; // Limpiar el buffer después de procesar el comando
        } else if (domEvent.keyCode === 8) {
            // Manejar retroceso (borrar)
            if (inputBuffer.length > 0) {
                inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
                terminal.write('\b \b');
            }
        } else {
            inputBuffer += key; // Agregar la tecla presionada al buffer de entrada
            terminal.write(key);
        }
    });

    function processCommand(command) {
        switch (command.trim()) {
            case '1':
                // Lógica para la opción 1
                terminal.writeln('Opción 1 seleccionada');
                break;
            case '2':
                // Lógica para la opción 2
                terminal.writeln('Opción 2 seleccionada');
                break;
            case '3':
                // Lógica para la opción 3
                terminal.writeln('Opción 3 seleccionada');
                break;
            default:
                terminal.writeln('Opción no válida');
                mostrarMenuPrincipal();
                break;
        }
    }

    function mostrarMenuPrincipal() {
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
});