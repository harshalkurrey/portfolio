/* =========================================
   Welcome Gate Logic (Security Check)
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const gate = document.getElementById('welcome-gate');
    const gateForm = document.getElementById('gate-form');
    
    // Check karo: Kya user pehle aa chuka hai?
    const userEmail = localStorage.getItem('portfolio_visitor_email');
    const userName = localStorage.getItem('portfolio_visitor_name');

    if (userEmail && userName) {
        // Agar data hai, toh gate hata do
        gate.style.display = 'none';
        
        // Optional: Console mein hello bolo
        console.log(`Welcome back, ${userName}!`);
    } else {
        // Agar naya banda hai, toh body scroll band kar do
        document.body.style.overflow = 'hidden';
    }

    // Jab user form submit kare
    gateForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Page reload mat hone do

        const nameInput = document.getElementById('visitor-name').value;
        const emailInput = document.getElementById('visitor-email').value;

        // Data browser ki memory mein save karo
        localStorage.setItem('portfolio_visitor_name', nameInput);
        localStorage.setItem('portfolio_visitor_email', emailInput);

        // Gate khol do (Animation ke sath gayab)
        gate.style.transition = "opacity 0.5s ease";
        gate.style.opacity = "0";
        
        setTimeout(() => {
            gate.style.display = 'none';
            document.body.style.overflow = 'auto'; // Scroll wapas chalu
            
            // Optional: User ko personalize welcome karo (Alert ya Text)
            alert(`Access Granted! Welcome, ${nameInput}.`);
        }, 500);
    });
});

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



