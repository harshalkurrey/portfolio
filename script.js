// ── LOADING SCREEN
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingPercent = document.getElementById('loadingPercent');
    let currentPercent = 0;
    
    const percentInterval = setInterval(() => {
        if (currentPercent < 100) {
            currentPercent += Math.random() * 30;
            if (currentPercent > 100) currentPercent = 100;
            loadingPercent.textContent = Math.floor(currentPercent);
        }
    }, 150);
    
    setTimeout(() => {
        clearInterval(percentInterval);
        loadingPercent.textContent = '100';
        loadingScreen.classList.add('hidden');
    }, 2200);
});

// ── PARTICLES
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
const PARTICLE_COUNT = 80;

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.7 ? '#ff006e' : '#00f5ff'
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = '#00f5ff';
                ctx.globalAlpha = (1 - dist / 120) * 0.08;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
    requestAnimationFrame(drawParticles);
}
drawParticles();

// ── TYPEWRITER
const roles = [
    'Full Stack Developer',
    'AI/ML Engineer',
    'Competitive Programmer',
    'Open Source Contributor',
    'System Design Enthusiast'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typewrite() {
    const role = roles[roleIdx];
    if (!deleting) {
        tw.textContent = '> ' + role.slice(0, charIdx + 1) + '_';
        charIdx++;
        if (charIdx === role.length) {
            deleting = true;
            setTimeout(typewrite, 2000);
            return;
        }
    } else {
        tw.textContent = '> ' + role.slice(0, charIdx - 1) + '_';
        charIdx--;
        if (charIdx === 0) {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }
    setTimeout(typewrite, deleting ? 40 : 80);
}
typewrite();

// ── SCROLL PROGRESS
const prog = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    prog.style.width = scrolled + '%';
});

// ── REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── SKILL BARS
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(el => barObserver.observe(el));

// ── COUNTER ANIMATION
const counters = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            let count = 0;
            const step = target / 50;
            const timer = setInterval(() => {
                count += step;
                if (count >= target) { count = target; clearInterval(timer); }
                el.textContent = Math.floor(count) + '+';
            }, 30);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// ── PROJECT LINKS - ENSURE THEY OPEN
const projLinks = document.querySelectorAll('.proj-link');
projLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            window.open(href, '_blank');
        }
    });
});

// ── FORM SUBMIT
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-send');
    btn.textContent = '✓ MESSAGE SENT!';
    btn.style.background = 'var(--neon-green)';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> &nbsp;SEND MESSAGE';
        btn.style.background = '';
        e.target.reset();
    }, 3000);
}

// ── ACTIVE NAV LINK
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--neon-cyan)' : '';
    });
});

// Download Resume Function
function downloadResume() {
    // Create a temporary link element
    const fileName = 'HARSHAL_Resume_Final.pdf';
    const link = document.createElement('a');
    
    // Try to fetch the PDF file
    fetch(fileName)
        .then(response => response.blob())
        .then(blob => {
            // Create blob URL
            const url = window.URL.createObjectURL(blob);
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error downloading resume:', error);
            alert('Resume download link broken. Please try again or contact me via email.');
        });
}
