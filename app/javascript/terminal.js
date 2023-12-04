// terminal.js

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { mostrarMenuPrincipal, procesarOpcionPrincipal } from './menus/MenuPrincipal.js';
import { mostrarMenuCursos, procesarOpcionCursos } from './menus/CursosMenu.js';
import { mostrarMenuAsignaturas, procesarOpcionAsignaturas } from './menus/AsignaturasMenu.js';

let estadoMenu = 'principal';

document.addEventListener("DOMContentLoaded", () => {
    const terminalContainer = document.getElementById('terminal-container');
    const userId = terminalContainer.getAttribute('data-user-id');
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
    configurarManejadorTeclado();

    function configurarManejadorTeclado() {
        let inputBuffer = '';
        terminal.onKey(({ key, domEvent }) => {
            if (estadoMenu === 'principal') {
                manejarTecladoMenuPrincipal(key, domEvent);
            } else if (estadoMenu === 'listarAsignaturas') {
                manejarTecladoListarAsignaturas(key, domEvent);
            } else if (estadoMenu === 'asignaturas') {
                manejarTecladoAsignaturas(key, domEvent);
            } else if (estadoMenu === 'cursos') {
                manejarTecladoCursos(key, domEvent);
            }
        });

        function manejarTecladoMenuPrincipal(key, domEvent) {
            manejarInputComun(key, domEvent, procesarOpcionPrincipal);
        }

        function manejarTecladoListarAsignaturas(key, domEvent) {
            // Lógica para manejar teclado en listar asignaturas
            // ...
        }

        function manejarTecladoAsignaturas(key, domEvent) {
            manejarInputComun(key, domEvent, procesarOpcionAsignaturas);
        }

        function manejarTecladoCursos(key, domEvent) {
            manejarInputComun(key, domEvent, procesarOpcionCursos);
        }

        function manejarInputComun(key, domEvent, procesadorOpcion) {
            const charCode = domEvent.keyCode;
            if ([37, 38, 39, 40].includes(charCode)) return; // Ignorar teclas de flecha

            if (charCode === 13) { // Enter
                terminal.write('\r\n');
                let opcion = inputBuffer.trim();
                inputBuffer = '';
                procesadorOpcion(opcion, terminal, userId);
                actualizarEstadoMenu(opcion);
            } else if (charCode === 8 && inputBuffer.length > 0) { // Backspace
                inputBuffer = inputBuffer.slice(0, -1);
                terminal.write('\b \b');
            } else if (/^[a-zA-Z0-9]$/.test(key)) { // Aceptar letras y números
                inputBuffer += key;
                terminal.write(key);
            }
        }

        function actualizarEstadoMenu(opcion) {
            switch (opcion) {
                case '1':
                    estadoMenu = 'listarAsignaturas';
                    break;
                case '2':
                    estadoMenu = 'asignaturas';
                    break;
                case '3':
                    estadoMenu = 'cursos';
                    break;
                default:
                    estadoMenu = 'principal';
                    break;
            }
        }
    }
});
