// dark-mode.js
document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById("darkModeToggle");
  
    // Check localStorage for user's dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
      if (darkModeToggle) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
      }
    }
  
    // Toggle dark mode on button click
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
          localStorage.setItem("darkMode", "enabled");
          darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
          localStorage.setItem("darkMode", "disabled");
          darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
      });
    }
  });
  