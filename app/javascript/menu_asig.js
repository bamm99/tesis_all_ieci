
document.addEventListener("DOMContentLoaded", function() {
    // Listener para el botón principal de Asignaturas
    var dropdownButton = document.querySelector('.dropbtn');
    dropdownButton.addEventListener('click', function() {
      this.nextElementSibling.classList.toggle("show");
    });
  
    // Listener para cada botón de submenu de Semestre
    var submenuButtons = document.querySelectorAll('.submenu-btn');
    submenuButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        this.nextElementSibling.classList.toggle("show");
      });
    });
  });