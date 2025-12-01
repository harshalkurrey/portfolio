const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const menuIcon = hamburger.querySelector('i');

// Toggle Menu & Icon Change
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Switch between bars and cross icon
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.replace('fa-bars', 'fa-times');
    } else {
        menuIcon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close Menu on Link Click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.replace('fa-times', 'fa-bars');
    });
});

// Active Link Highlighter on Scroll
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // 100px offset taaki thoda pehle highlight ho jaye
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active-link');
        }
    });

});

/* =========================================
   Typewriter Effect
   ========================================= */
var typed = new Typed(".auto-type", {
    strings: ["Computer Science Student", "Web Developer", "Tech Enthusiast", "Learner"],
    typeSpeed: 100,   // Likhne ki speed
    backSpeed: 100,   // Mitane ki speed
    loop: true        // Baar baar chalega
});

/* =========================================
   Dark/Light Theme Toggle
   ========================================= */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    // Icon change karo (Sun <-> Moon)
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

