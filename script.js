const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("is-active"));
    link.classList.add("is-active");
  });
});

// Menú lateral móvil (hamburger)
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const sidebarNav = document.querySelectorAll(".sidebar-nav a");
const sidebarClose = document.querySelector(".sidebar-close");

function openSidebar() {
  if (sidebar && sidebarOverlay && menuToggle) {
    sidebar.classList.add("is-open");
    sidebarOverlay.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
}

function closeSidebar() {
  if (sidebar && sidebarOverlay && menuToggle) {
    sidebar.classList.remove("is-open");
    sidebarOverlay.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeSidebar() : openSidebar();
  });
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeSidebar);
}

if (sidebarClose) {
  sidebarClose.addEventListener("click", closeSidebar);
}

if (sidebarNav.length) {
  sidebarNav.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });
}
