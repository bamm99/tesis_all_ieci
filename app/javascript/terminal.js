// index.js

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { mostrarMenuPrincipal, procesarOpcionPrincipal } from './menus/MenuPrincipal.js';
import { mostrarMenuCursos, procesarOpcionCursos } from './menus/CursosMenu.js';
import { mostrarMenuAsignaturas, procesarOpcionAsignaturas } from './menus/AsignaturasMenu.js';

let estadoMenu = 'principal';

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
    terminal.onKey(({ key, domEvent }) => {
        const charCode = domEvent.keyCode;
        if ([37, 38, 39, 40].includes(charCode)) return; // Ignorar teclas de flecha

        if (charCode === 13) { // Enter
            terminal.write('\r\n');
            let opcion = inputBuffer.trim();
            inputBuffer = '';

            if (estadoMenu === 'principal') {
                procesarOpcionPrincipal(opcion, terminal);
                // Actualizar estadoMenu según la opción seleccionada
                switch (opcion) {
                    case '1': // Listar todas las asignaturas
                        estadoMenu = 'listarAsignaturas';
                        break;
                    case '2': // Ver asignaturas de un semestre
                        estadoMenu = 'asignaturas';
                        break;
                    case '3': // Ver cursos de autoaprendizaje
                        estadoMenu = 'cursos';
                        break;
                    default:
                        estadoMenu = 'principal';
                        break;
                }
            } else if (estadoMenu === 'listarAsignaturas') {
                mostrarMenuPrincipal(terminal);
                estadoMenu = 'principal';
            } else if (estadoMenu === 'asignaturas') {
                procesarOpcionAsignaturas(opcion, terminal);
            } else if (estadoMenu === 'cursos') {
                procesarOpcionCursos(opcion, terminal);
            }
        } else if (charCode === 8 && inputBuffer.length > 0) { // Backspace
            inputBuffer = inputBuffer.slice(0, -1);
            terminal.write('\b \b');
        } else if (/^[a-zA-Z0-9]$/.test(key)) { // Aceptar letras y números
            inputBuffer += key;
            terminal.write(key);
        }
    });
});
