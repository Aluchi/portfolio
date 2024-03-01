// Add class "header-active" when you scroll.
window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("header-active", window.scrollY > 0);
});