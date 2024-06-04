// Function to initialize dark mode toggle
function initializeDarkModeToggle() {
    const darkModeBtn = document.querySelector("#dark-mode-toggle");
    const headerDarkMode = document.querySelector("header");

    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            darkModeBtn.classList.toggle("dark-mode-active");
            headerDarkMode.classList.toggle("header-dark-mode");

            // Save in localStorage
            if (document.body.classList.contains(`dark`)) {
                localStorage.setItem(`dark-mode`, `true`);
            } else {
                localStorage.setItem(`dark-mode`, `false`);
            }
        });

        // Set initial dark mode state based on localStorage
        if (localStorage.getItem(`dark-mode`) === `true`) {
            document.body.classList.add("dark");
            darkModeBtn.classList.add("dark-mode-active");
            headerDarkMode.classList.add("header-dark-mode");
        } else {
            document.body.classList.remove("dark");
            darkModeBtn.classList.remove("dark-mode-active");
            headerDarkMode.classList.remove("header-dark-mode");
        }
    }
}

function headerResponsive() {
    const openNavBtn = document.querySelector("#open-nav");
    const closeNavBtn = document.querySelector("#close-nav");
    const header = document.querySelector("header");
    const overlay = document.querySelector(".overlay");


    if (openNavBtn && closeNavBtn && header && overlay) {
        openNavBtn.addEventListener("click", () => {
            header.classList.add("nav-active");
            overlay.classList.add("active");
        });

        closeNavBtn.addEventListener("click", () => {
            header.classList.remove("nav-active");
            overlay.classList.remove("active");
        });

        overlay.addEventListener("click", () => {
            header.classList.remove("nav-active");
            overlay.classList.remove("active");
        });
    } else {
        console.error("One or more elements are not found in the DOM.");
    }
}


// Function to initialize language buttons
function initializeLanguageButtons() {
    const enBtn = document.querySelector("#en");
    const esBtn = document.querySelector("#es");

    if (enBtn && esBtn) {
        enBtn.addEventListener("click", () => {
            const enUrl = "https://raw.githubusercontent.com/Aluchi/portfolio/master/language/en.json";
            loadContent(enUrl);
            localStorage.setItem("language", enUrl);
        });
        esBtn.addEventListener("click", () => {
            const esUrl = "https://raw.githubusercontent.com/Aluchi/portfolio/master/language/es.json";
            loadContent(esUrl);
            localStorage.setItem("language", esUrl);
        });
    }
}

// Function to initialize smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('.header-link').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

let projectsArray = [];

// Function to initialize portfolio modal
function initializePortfolioModal() {
    const projectButtons = document.querySelectorAll(".project-button");
    const modal = document.querySelector("#modal");
    const overlay = document.querySelector(".overlay");

    // Añade event listeners a los botones de los proyectos
    if (projectButtons) {
        projectButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const projectIndex = button.dataset.projectIndex;
                openModal(projectIndex);
            });
        });
    }

    // Añade event listener para cerrar el modal y animar el cierre
    if (modal && overlay) {
        // Usar delegación de eventos para el botón de cerrar dentro del modal
        modal.addEventListener("click", (event) => {
            if (event.target.id === "close-button" || event.target === modal) {
                closeModal(modal, overlay);
            }
        });

        // También cerrar el modal si se hace clic fuera de él (en el overlay)
        overlay.addEventListener("click", () => {
            closeModal(modal, overlay);
        });
    }
}

function openModal(projectIndex) {
    const project = projectsArray[projectIndex];
    const overlay = document.querySelector(".overlay");
    const modal = document.querySelector("#modal");

    if (project) {
        overlay.classList.add("active");
        modal.innerHTML = `
            <div class="modal animate__animated animate__zoomIn">
                <div class="${project.classImg} modal-img"></div>
                <div class="modal-content">
                    <h1>${project.title}</h1>
                    <p>${project.description}</p>
                    <div class="modal-link">
                        <a href="${project.href}" target="_blank">Go to "${project.title}"</a>
                    </div>
                </div>
                <button class="close-button" id="close-button">
                    X
                </button>
            </div>
        `;
        modal.classList.add("modal-active");
    }
}


// Función para cerrar el modal con animación
function closeModal(modal, overlay) {
    const modalContent = modal.querySelector(".modal");
    if (modalContent) {
        modalContent.classList.remove("animate__zoomIn");
        modalContent.classList.add("animate__zoomOut");
        modalContent.addEventListener("animationend", () => {
            modalContent.classList.remove("animate__zoomOut");
            modal.classList.remove("modal-active");
            overlay.classList.remove("active");
        }, { once: true });
    }
}

// Function to load content and reinitialize event listeners
function loadContent(language) {
    console.log(`Loading content from: ${language}`);
    fetch(`${language}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(langContent => {
            // Load Header
            const header = document.querySelector('#header');
            header.innerHTML = `
                <button class="open-nav" id="open-nav">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <nav>
                    <button class="close-nav" id="close-nav">
                        <i class="fa-solid fa-x"></i>
                    </button>
                    <ul id="nav-ul">
                        ${langContent.header.nav.items.map(item => `<li><a class="header-link" href="${item.href}">${item.text}</a></li>`).join('')}
                        <button class="dark-mode-toggle" id="dark-mode-toggle">
                            <span><i class="${langContent.header.nav.dark_mode_toggle.sun_icon}"></i></span>
                            <span><i class="${langContent.header.nav.dark_mode_toggle.moon_icon}"></i></span>
                        </button>
                        <div class="language">
                            <button id="en">
                                <img src="https://flagcdn.com/h40/gb.png" srcset="https://flagcdn.com/h80/gb.png 2x,
                                https://flagcdn.com/h120/gb.png 3x" height="40" alt="Reino Unido">
                            </button>
                            <button id="es">
                                <img src="https://flagcdn.com/h40/ar.png" srcset="https://flagcdn.com/h80/ar.png 2x,
                                    https://flagcdn.com/h120/ar.png 3x" height="40" alt="Argentina">
                            </button>
                        </div>
                    </ul>
                </nav>
            `;

            // Load Main
            const main = document.querySelector('#main');
            main.innerHTML = `

                <!--------- MAIN --------->
                <section class="hero-container" id="${langContent.main.hero.id}">
                    <div>
                        <span class="am-logo">${langContent.main.hero.logo}</span>
                        <div class="hero-text">
                            <h1 class="animate__animated animate__fadeInLeft animate__faster">${langContent.main.hero.greeting}</h1>
                            <p class="animate__animated animate__fadeInLeft animate__fast">${langContent.main.hero.role}</p>
                        </div>
                    </div>
                </section>

                <!----------- PRESENTATION---------->

                <section class="topic-section" id="${langContent.main.about_me.id}" data-aos="fade-down">
                    <div class="about-me-container" data-aos="fade-down" data-aos-duration="1300">
                        <div class="about-me-content wrapper">
                            <img src="${langContent.main.about_me.img_src}" alt="${langContent.main.about_me.img_alt}">
                            <div class="about-me-text">
                                <h3>${langContent.main.about_me.introduction_title}</h3>
                                <p>${langContent.main.about_me.introduction_text}</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!----------- KNOWLEDGE SECTION ---------->

                <section class="topic-section" id="${langContent.main.knowledge.id}">
                    <div class="knowledge-container" data-aos="fade-down" data-aos-duration="1300">
                        <h2 class="sections-title">${langContent.main.knowledge.title}</h2>
                        <p>${langContent.main.knowledge.description}</p>
                        <div class="knowledge-content">
                            ${langContent.main.knowledge.icons.map(icon => `<i class="${icon}"></i>`).join('')}
                        </div>
                    </div>
                </section>
                <!----------- CERTIFICATES SECTION ---------->

                <section class="topic-section wrapper" id="${langContent.main.certificates.id}">
                    <div class="certificates-container" data-aos="fade-down" data-aos-duration="1300">
                        <h2 class="sections-title">${langContent.main.certificates.title}</h2>
                        <div class="certificates">
                            ${langContent.main.certificates.images.map(image => `<a href="${image.href}" target="_blank"><img src="${image.src}" alt="${image.alt}"></a>`).join('')}
                        </div>
                    </div>
                </section>
                
                <!----------- PORTFOLIO ---------->
                
                <section class="topic-section" id="${langContent.main.portfolio.id}">
                    <div class="portfolio-container" data-aos="fade-down" data-aos-duration="1300">
                        <h2 class="sections-title">${langContent.main.portfolio.title}</h2>
                        <div class="portfolio-content" id="portfolio-content">
                            ${langContent.main.portfolio.projects.map(project => `
                                <article class="project">
                                    <div class="project-text">
                                        <time>${project.year}</time>
                                        <h3>${project.title}</h3>
                                    </div>
                                    <button class="img-container project-button" data-project-index="${project.data_index}">
                                        <img src="${project.img_src}" alt="${project.img_alt}">
                                    </button>
                                    <button class="check-it-btn project-button" data-project-index="${project.data_index}">
                                        <span>${project.button_text}</span>
                                    </button>
                                </article>
                            `).join('')}
                        </div>
                    </div>
                </section>
                
            `;

            // Load Footer
            const footer = document.querySelector('#footer');
            footer.innerHTML = `
                <nav>
                    <div class="social-media">
                        <h4>${langContent.footer.social_media.title}</h4>
                        <ul>
                            ${langContent.footer.social_media.links.map(link => `
                                <li><a href="${link.href}" target="_blank" rel="noopener noreferrer"><i class="${link.icon}"></i></a></li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="contact" id="contact">
                        <h4>${langContent.footer.contact.title}</h4>
                        <p><i class="${langContent.footer.contact.email.icon}"></i> ${langContent.footer.contact.email.text}</p>
                        <p><i class="${langContent.footer.contact.phone.icon}"></i> ${langContent.footer.contact.phone.text}</p>
                    </div>
                </nav>
            `;
            projectsArray = langContent.main.portfolio.projects;
            // Reinitialize event listeners after loading new content
            headerResponsive();
            initializeDarkModeToggle();
            initializeLanguageButtons();
            initializeSmoothScroll();
            initializePortfolioModal();
        })
        .catch(error => console.error('Error loading content:', error));
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        loadContent(savedLanguage);
    } else {
        // Default to English if no language is saved
        loadContent("https://raw.githubusercontent.com/Aluchi/portfolio/master/language/en.json");
    }


});

// Add class "header-active" when you scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.classList.toggle("header-active", window.scrollY > 0);
});