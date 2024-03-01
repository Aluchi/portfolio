const darkModeBtn = document.querySelector("#dark-mode-toggle");
const headerDarkMode = document.querySelector("header");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkModeBtn.classList.toggle("dark-mode-active");
    headerDarkMode.classList.toggle("header-dark-mode");

    // Save in localStorage
    if(document.body.classList.contains(`dark`)){
        localStorage.setItem(`dark-mode`, `true`);
    } else {
        localStorage.setItem(`dark-mode`, `false`);
    }

});

if(localStorage.getItem(`dark-mode`) === `true`){
    document.body.classList.add("dark");
    darkModeBtn.classList.add("dark-mode-active");
    headerDarkMode.classList.add("header-dark-mode");
} else {
    
    document.body.classList.remove("dark");
    darkModeBtn.classList.remove("dark-mode-active");
    headerDarkMode.classList.remove("header-dark-mode");
}