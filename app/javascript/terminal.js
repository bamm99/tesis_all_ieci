import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { mostrarMenuPrincipal, procesarOpcion } from './menu_estudiante/index.js';
import { desactivarEntrada, activarEntrada } from './control_entrada.js';

document.addEventListener("DOMContentLoaded", () => {
    const terminal = new Terminal({
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
    
    let estado = {
        esperandoEntrada: true
    };

    terminal.onKey(({ key, domEvent }) => {
        const charCode = typeof domEvent.which == "number" ? domEvent.which : domEvent.keyCode;
        const isEnter = charCode === 13;
        const isBackspace = charCode === 8;
        const isArrowKey = [37, 38, 39, 40].includes(charCode);
    
        if (!estado.esperandoEntrada || isArrowKey) {
            // Ignorar teclas si no se espera entrada o si son teclas de flecha
            return;
        }
    
        if (isEnter) {
            terminal.write("\r\n");
            procesarOpcion(inputBuffer.trim(), terminal);
            inputBuffer = '';
        } else if (isBackspace) {
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