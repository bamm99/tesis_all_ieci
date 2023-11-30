import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { mostrarMenuPrincipal, procesarOpcion } from './menu_estudiante/index.js';
import { desactivarEntrada, activarEntrada } from './control_entrada.js';

document.addEventListener("DOMContentLoaded", () => {
    // Obteniendo el contenedor de la terminal
    const terminalContainer = document.getElementById('terminal-container');

    // Creando una nueva instancia de Terminal
    const terminal = new Terminal({
        theme: {
            background: '#772953',
            foreground: '#ffffff',
            cursor: 'rgba(255,255,255,0.5)',
            selection: 'rgba(255,255,255,0.3)'
        }
    });

    // Abriendo la terminal en el contenedor especificado
    terminal.open(terminalContainer);
    terminal.focus();

    // Mostrando el menú principal
    mostrarMenuPrincipal(terminal);

    let inputBuffer = '';
    let estado = { esperandoEntrada: true };

    // Manejo de eventos de teclado en la terminal
    terminal.onKey(({ key, domEvent }) => {
        const charCode = typeof domEvent.which == "number" ? domEvent.which : domEvent.keyCode;
        const isEnter = charCode === 13;
        const isBackspace = charCode === 8;
        const isArrowKey = [37, 38, 39, 40].includes(charCode);
    
        if (!estado.esperandoEntrada || isArrowKey) {
            return; // Ignorar teclas si no se espera entrada o si son teclas de flecha
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

    // Asegurándose de que la terminal ocupe todo el espacio disponible en su contenedor
    terminal.fit();
});
