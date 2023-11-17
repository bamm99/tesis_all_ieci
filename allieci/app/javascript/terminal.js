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

    const prompt = () => {
        terminal.write('\x1b[32mallieci:~$ \x1b[0m'); // Prefijo en verde
    };

    terminal.open(document.getElementById('terminal-container'));
    terminal.focus(); 
    prompt();

    let inputBuffer = '';

    terminal.onKey(({ key, domEvent }) => {
        if (domEvent.keyCode === 13) { // Enter key
            terminal.write("\r\n");
            processCommand(inputBuffer);
            inputBuffer = ''; // Limpiar el buffer después de procesar el comando
            prompt();
        } else if (domEvent.keyCode === 8) {
            // Manejar retroceso (borrar)
            if (inputBuffer.length > 0) {
                inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
                // Borrar el último carácter en la terminal
                terminal.write('\b \b');
            }
        } else {
            inputBuffer += key; // Agregar la tecla presionada al buffer de entrada
            terminal.write(key);
        }
    });

    function processCommand(command) {
        if (command.trim() === 'hola') {
            terminal.writeln('Hola mundo');
        } else {
            terminal.writeln('Comando no reconocido: ' + command);
        }
    }
});