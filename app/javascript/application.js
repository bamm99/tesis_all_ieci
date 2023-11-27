// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import './terminal'
import './menu_estudiante/index.js'
import './menu_estudiante/docs_asig.js'
import './menu_estudiante/ver_malla.js'
import './menu_estudiante/cursos_linux.js'

$(document).ready(function() {
    $("#usuarios-btn").click(function(e) {
      e.preventDefault();
      $.ajax({
        url: '/admin_home/usuarios',
        method: 'GET',
        success: function(data) {
          $(".main-container").html(data);
        },
        error: function(error) {
          console.error(error);
        }
      });
    });
  });
