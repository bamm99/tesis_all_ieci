import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { mostrarMenuPrincipal, procesarOpcion } from './menu_estudiante/index.js';

let setCommandHandler;

document.addEventListener("DOMContentLoaded", () => {
    const terminalContainer = document.getElementById('terminal-container');
    const terminal = new Terminal({
        theme: {
            background: '#772953',
            foreground: '#ffffff',
            cursor: 'rgba(255,255,255,0.5)',
            selection: 'rgba(255,255,255,0.3)',
        }
    });
    
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalContainer);
    fitAddon.fit();

    window.addEventListener('resize', () => {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(() => {
            fitAddon.fit();
        }, 250);
    });

    terminal.focus();
    mostrarMenuPrincipal(terminal);

    let inputBuffer = '';
    let keyEventListener = null;

    setCommandHandler = (handler) => {
        if (keyEventListener) {
            terminal.offKey(keyEventListener);
        }
        keyEventListener = ({ key, domEvent }) => {
            const charCode = typeof domEvent.which == "number" ? domEvent.which : domEvent.keyCode;
            const isEnter = charCode === 13;
            const isBackspace = charCode === 8;
    
            if (isEnter) {
                terminal.write("\r\n");
                handler(inputBuffer.trim());
                inputBuffer = '';
            } else if (isBackspace && inputBuffer.length > 0) {
                inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
                terminal.write('\b \b');
            } else if (!isNaN(parseInt(key)) || key.match(/[yn]/i)) {
                inputBuffer += key;
                terminal.write(key);
            }
        };
        
        terminal.onKey(keyEventListener);
    };

    setCommandHandler((command) => {
        procesarOpcion(command, terminal);
    });
});
