import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { mostrarMenuPrincipal, procesarOpcion } from './menu_estudiante/index.js';

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
    mostrarMenuPrincipal(terminal);

    let inputBuffer = '';

    terminal.onKey(({ key, domEvent }) => {
        if (domEvent.keyCode === 13) { // Enter key
            terminal.write("\r\n");
            procesarOpcion(inputBuffer.trim(), terminal);
            inputBuffer = '';
        } else if (domEvent.keyCode === 8) {
            // Manejar retroceso (borrar)
            if (inputBuffer.length > 0) {
                inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
                terminal.write('\b \b');
            }
        } else {
            inputBuffer += key;
            terminal.write(key);
        }
    });
});