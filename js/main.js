const darkModeBtn = document.querySelector("#dark-mode-toggle");
const headerDarkMode = document.querySelector("header");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkModeBtn.classList.toggle("dark-mode-active");
    headerDarkMode.classList.toggle("header-dark-mode");
});