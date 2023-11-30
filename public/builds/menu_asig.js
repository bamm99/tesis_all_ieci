(() => {
  // app/javascript/menu_asig.js
  document.addEventListener("DOMContentLoaded", function() {
    alert("Test");
    var dropdownButton = document.querySelector(".dropbtn");
    dropdownButton.addEventListener("click", function() {
      this.nextElementSibling.classList.toggle("show");
    });
    var submenuButtons = document.querySelectorAll(".submenu-btn");
    submenuButtons.forEach(function(btn) {
      btn.addEventListener("click", function() {
        this.nextElementSibling.classList.toggle("show");
      });
    });
  });
})();
//# sourceMappingURL=/assets/menu_asig.js.map
