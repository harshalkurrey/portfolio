/* ═══════════════════════════════════════════════════════════════
   HARSHAL KURREY — MODERN DEVELOPER PORTFOLIO SCRIPTS
   Interactive UI, Toast System, Modal, Filters, Typewriter
   ═══════════════════════════════════════════════════════════════ */

function initializePortfolio() {

    // ─── 01. CONSTANTS & DATA ───
    const EMAIL_ADDRESS = 'rahulkurrey321@gmail.com';

    // Project Details for the Interactive Modal
    const PROJECTS_DATA = {
        campuscare: {
            title: 'Campus Care — Student & Campus Management System',
            category: 'Flagship Full Stack Solution',
            image: 'assets/projects/campuscare.jpg',
            description: 'A comprehensive web-based platform built to digitize student records, track academic progress, and manage campus attendance. Built with performance and usability as primary metrics.',
            features: [
                'Real-time student attendance monitoring with actionable status indicators.',
                'Centralized academic profile records with structured course tracking.',
                'Mobile-first responsive architecture tested across diverse screen viewports.',
                'Optimized DOM rendering ensuring low latency even on slower campus networks.'
            ],
            techStack: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'GitHub Pages', 'Responsive Design'],
            demoUrl: 'https://harshalkurrey.github.io/campuscare/',
            sourceUrl: 'https://github.com/harshalkurrey/campuscare'
        },
        ironman: {
            title: 'Iron Man — 3D Computer Vision & Particle System',
            category: 'Interactive WebGL & AI Vision',
            image: 'assets/projects/ironman.jpg',
            description: 'An interactive 3D WebGL experience featuring real-time camera hand gesture tracking using Google MediaPipe and a 20,000+ particle simulation in Three.js with Unreal Bloom post-processing shaders.',
            features: [
                'Real-time hand landmark tracking and gesture recognition powered by MediaPipe Hands.',
                'Interactive 20,000-particle physics simulation rendered at 60 FPS in Three.js.',
                'Post-processing effects pipeline with Unreal Bloom and dynamic glowing shaders.',
                'Responsive camera viewport with real-time video canvas overlay and noise filters.'
            ],
            techStack: ['Three.js', 'MediaPipe Hands', 'WebGL', 'Unreal Bloom', 'Computer Vision'],
            demoUrl: 'https://harshalkurrey.github.io/iron-man/',
            sourceUrl: 'https://github.com/harshalkurrey/iron-man'
        },
        societal: {
            title: 'Societal Innovation Portal — Community Problem Solving',
            category: 'Production Full Stack Solution',
            image: 'assets/projects/societal.jpg',
            description: 'A modern, full-stack societal innovation platform empowering students and community members to propose solutions for grassroots challenges, collaborate with peers, and track implementation.',
            features: [
                'Full-stack architecture utilizing Vite, React, TypeScript, and Supabase database.',
                'Structured problem statement submission workflow with multi-category classification.',
                'Clean reactive state management and responsive Tailwind CSS layout system.',
                'Secure database policies and rapid cloud deployment.'
            ],
            techStack: ['TypeScript', 'React', 'Vite', 'Supabase', 'Tailwind CSS'],
            demoUrl: 'https://societal-innovation-portal-five.vercel.app',
            sourceUrl: 'https://github.com/harshalkurrey/societal-innovation-portal'
        },
        harshalworld: {
            title: 'Harshal World — Creative Digital Universe',
            category: 'Interactive Web Experience',
            image: 'assets/projects/harshalworld.jpg',
            description: 'A playground for frontend engineering, rich micro-interactions, and visual component experiments demonstrating custom animations and layout techniques.',
            features: [
                'Fluid CSS animations and state transitions for enhanced user delight.',
                'Modular component-driven frontend architecture without heavy frameworks.',
                'Dynamic visual elements exploring modern interactive UI paradigms.'
            ],
            techStack: ['HTML5', 'CSS3', 'JavaScript', 'CSS Keyframes'],
            demoUrl: 'https://harshalkurrey.github.io/Harshal-World/',
            sourceUrl: 'https://github.com/harshalkurrey/Harshal-World'
        },
        aditya: {
            title: 'Aditya Computer Academy — Institutional Portal',
            category: 'Production Institutional Web',
            image: 'assets/projects/aditya.jpg',
            description: 'A production website developed for Aditya Computer Academy to present academic programs (DCA, PGDCA), certifications, faculty profiles, and student admission inquiries.',
            features: [
                'SEO-optimized architecture ensuring high organic discovery for prospective students.',
                'Clear course catalog with comprehensive subject syllabi and admission criteria.',
                'Instant WhatsApp and phone inquiry links facilitating admissions communication.',
                'Fast page load times with accessible contrast ratios.'
            ],
            techStack: ['HTML5', 'CSS3', 'JavaScript', 'SEO Best Practices'],
            demoUrl: 'https://harshalkurrey.github.io/adityacomputeracademy/',
            sourceUrl: 'https://github.com/harshalkurrey/adityacomputeracademy'
        },
        opensource: {
            title: 'Open Source Contributions & Repositories',
            category: 'Collaborative Open Source Initiatives',
            image: 'assets/projects/opensource.jpg',
            description: 'Active repository contributions across national student open-source initiatives: Open Source India 2026, GirlScript Summer of Code (GSSoC 2026), and Nexus Spring of Code (NSoC 2026).',
            features: [
                'Project Administrator for Open Source India 2026 and NSoC 2026.',
                'Triaged incoming community issues, reviewed code, and merged pull requests.',
                'Mentored first-time contributors on Git workflows, commits, and clean PR documentation.',
                'Contributed feature enhancements and bug fixes across multi-language codebases.'
            ],
            techStack: ['Git', 'GitHub Actions', 'Issue Triaging', 'Pull Requests', 'Markdown'],
            demoUrl: 'https://github.com/harshalkurrey',
            sourceUrl: 'https://github.com/harshalkurrey'
        }
    };

    // ─── 02. TOAST NOTIFICATION SYSTEM ───
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, icon = 'fa-solid fa-circle-check') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Auto remove after 3.8s
        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3500);
    }

    // ─── 03. DAY / NIGHT THEME TOGGLE ───
    const themeToggleBtn = document.getElementById('theme-toggle');
    const drawerThemeToggleBtn = document.getElementById('drawer-theme-toggle');

    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }

    function applyTheme(theme, showNotification = false) {
        document.documentElement.setAttribute('data-theme', theme);

        if (theme === 'dark') {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }

        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) {
            // LocalStorage fallback
        }

        const isDark = theme === 'dark';
        const ariaLabel = isDark ? 'Switch to Day mode' : 'Switch to Night mode';
        const buttonTitle = isDark ? 'Switch to Day mode (Light)' : 'Switch to Night mode (Dark)';

        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-label', ariaLabel);
            themeToggleBtn.setAttribute('title', buttonTitle);
        }
        if (drawerThemeToggleBtn) {
            drawerThemeToggleBtn.setAttribute('aria-label', ariaLabel);
            drawerThemeToggleBtn.setAttribute('title', buttonTitle);
        }

        if (showNotification) {
            const toastMsg = isDark ? 'Night Mode Activated 🌙' : 'Day Mode Activated ☀️';
            const toastIcon = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
            showToast(toastMsg, toastIcon);
        }
    }

    function toggleTheme() {
        const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme, true);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    if (drawerThemeToggleBtn) {
        drawerThemeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Initialize with current applied or saved theme (Day mode default)
    try {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'dark') {
            applyTheme('dark', false);
        } else {
            applyTheme('light', false);
        }
    } catch (e) {
        applyTheme('light', false);
    }

    // ─── 04. CLIPBOARD COPY UTILITY ───
    async function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
        try {
            await navigator.clipboard.writeText(text);
            showToast(successMsg, 'fa-regular fa-clipboard');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast(successMsg, 'fa-regular fa-clipboard');
        }
    }

    // Bind all copy buttons
    const quickCopyBtn = document.getElementById('btn-quick-copy');
    if (quickCopyBtn) {
        quickCopyBtn.addEventListener('click', () => {
            copyToClipboard(EMAIL_ADDRESS, `Copied ${EMAIL_ADDRESS} to clipboard! ✨`);
        });
    }

    const heroCopyBtn = document.getElementById('hero-copy-email');
    if (heroCopyBtn) {
        heroCopyBtn.addEventListener('click', () => {
            copyToClipboard(EMAIL_ADDRESS, `Copied ${EMAIL_ADDRESS} to clipboard! ✨`);
        });
    }

    const contactCopyBtn = document.getElementById('copy-email-btn');
    if (contactCopyBtn) {
        contactCopyBtn.addEventListener('click', () => {
            copyToClipboard(EMAIL_ADDRESS, `Copied ${EMAIL_ADDRESS} to clipboard! ✨`);
        });
    }

    // ─── 04. TYPEWRITER EFFECT ───
    const typewriterElement = document.getElementById('hero-typewriter');
    const phrases = [
        'Scalable Web Apps.',
        'High-Performance Systems.',
        'Open Source Software.',
        'Clean User Interfaces.',
        'Algorithms & DSA.'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function runTypewriter() {
        if (!typewriterElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2200; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new phrase
        }

        setTimeout(runTypewriter, typeSpeed);
    }

    runTypewriter();

    // ─── 05. SCROLL PROGRESS BAR & NAVBAR SCROLL ───
    const progressBar = document.getElementById('scroll-progress-bar');
    const navPill = document.getElementById('nav-pill');
    const backToTopBtn = document.getElementById('back-to-top');

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${scrollPercentage}%`;
        }

        if (navPill) {
            if (scrollTop > 60) {
                navPill.classList.add('scrolled');
            } else {
                navPill.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollTop > 450) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        updateActiveNav(scrollTop);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── 06. SCROLLSPY ACTIVE NAVIGATION ───
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav(scrollPos) {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    // ─── 07. INTERACTIVE HERO DEVELOPER CARD TABS ───
    const devTabs = document.querySelectorAll('.dev-card-tabs .tab-btn');
    const tabConfig = document.getElementById('tab-config');
    const tabProfile = document.getElementById('tab-profile');

    devTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            devTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const tabTarget = tab.getAttribute('data-tab');
            if (tabTarget === 'config') {
                if (tabConfig) tabConfig.classList.remove('hidden');
                if (tabProfile) tabProfile.classList.add('hidden');
            } else {
                if (tabConfig) tabConfig.classList.add('hidden');
                if (tabProfile) tabProfile.classList.remove('hidden');
            }
        });
    });

    // ─── 08. CARD SPOTLIGHT HOVER EFFECT ───
    const spotlightCards = document.querySelectorAll('[data-spotlight]');

    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ─── 09. SKILLS FILTER SYSTEM ───
    const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-item-card');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.35s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ─── 10. PROJECTS FILTER SYSTEM ───
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-pfilter');
            const projectCards = document.querySelectorAll('.project-showcase-card');

            projectCards.forEach(card => {
                const categoryStr = card.getAttribute('data-pcategory') || '';
                const categories = categoryStr.split(' ');

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.35s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ─── 11. PROJECT DETAILS MODAL ───
    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBodyContent = document.getElementById('modal-body-content');

    function openProjectModal(projectId) {
        const project = PROJECTS_DATA[projectId];
        if (!project || !modalBodyContent || !projectModal) return;

        let techChipsHtml = project.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('');
        let featuresHtml = project.features.map(f => `
            <div class="modal-feature-item">
                <i class="fa-solid fa-check"></i>
                <span>${f}</span>
            </div>
        `).join('');

        const bannerHtml = project.image ? `
            <div class="modal-banner-wrap">
                <img src="${project.image}" alt="${project.title}" class="modal-banner-img">
            </div>
        ` : '';

        modalBodyContent.innerHTML = `
            ${bannerHtml}
            <span class="modal-content-tag">${project.category}</span>
            <h3 class="modal-content-title">${project.title}</h3>
            <p class="modal-content-desc">${project.description}</p>
            
            <h4 class="modal-feature-title">Key Engineering Highlights:</h4>
            <div class="modal-feature-list">
                ${featuresHtml}
            </div>

            <div class="project-tech-chips" style="margin-bottom: 24px;">
                ${techChipsHtml}
            </div>

            <div class="modal-actions">
                <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <span>${project.demoUrl.includes('github.com') ? 'View Repository' : 'Live Demo'}</span>
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
                <a href="${project.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    <i class="fa-brands fa-github"></i>
                    <span>GitHub Repo</span>
                </a>
            </div>
        `;

        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Delegated click handler for project modal buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-project-modal');
        if (btn) {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            openProjectModal(projectId);
        }
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // ─── 12. MOBILE DRAWER NAVIGATION ───
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openMobileDrawer() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.add('open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
        if (!mobileDrawer) return;
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeMobileDrawer);
    });

    // Escape Key Listener for Modals and Drawer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeMobileDrawer();
        }
    });

    // ─── 13. STAT COUNTER ANIMATION ───
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        const counterEls = document.querySelectorAll('.counter');
        if (!counterEls || counterEls.length === 0) return;

        counterEls.forEach(counter => {
            const rawTarget = counter.getAttribute('data-target');
            const target = parseFloat(rawTarget);
            if (isNaN(target)) return;

            const isDecimal = counter.getAttribute('data-decimal') === 'true';
            const duration = 1600; // 1.6s smooth ease-out
            let startTime = null;

            function updateCounter(currentTime) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.max(0, Math.min(elapsed / duration, 1));

                // Ease out cubic: 1 - (1 - progress)^3
                const ease = 1 - Math.pow(1 - progress, 3);
                const currentVal = target * ease;

                if (isDecimal) {
                    counter.textContent = currentVal.toFixed(2);
                } else {
                    counter.textContent = Math.floor(currentVal);
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    // Ensure exact target precision at the end of animation
                    counter.textContent = isDecimal ? target.toFixed(2) : target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    const statsSection = document.querySelector('.hero-stats-container');

    // Dual visibility checker: verifies bounding rect against viewport
    function checkStatsInView() {
        if (countersAnimated) return;
        if (!statsSection) {
            animateCounters();
            return;
        }

        const rect = statsSection.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight || 800;

        // Trigger if stats container is partially visible or within 100px of viewport
        if (rect.top <= vh + 100 && rect.bottom >= -100) {
            animateCounters();
        }
    }

    // 1. IntersectionObserver with relaxed thresholds and rootMargin
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    animateCounters();
                    try {
                        statsObserver.unobserve(statsSection);
                    } catch (e) {}
                }
            });
        }, {
            threshold: [0, 0.05, 0.1],
            rootMargin: '100px 0px 100px 0px'
        });

        statsObserver.observe(statsSection);
    }

    // 2. Immediate check on execution (when section is already in view on load or near top)
    checkStatsInView();

    // 3. Fallback check on scroll (tied to the passive scroll listener)
    window.addEventListener('scroll', checkStatsInView, { passive: true });

    // 4. Fallback check when entire window loads or resizes
    window.addEventListener('load', checkStatsInView, { once: true });
    window.addEventListener('resize', checkStatsInView, { passive: true });

    // 5. Failsafe timeouts in case hash navigation or rendering delays observer
    setTimeout(checkStatsInView, 350);
    setTimeout(checkStatsInView, 1200);

    // ─── 14. CONTACT FORM HANDLING ───
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const subjectInput = document.getElementById('form-subject');
            const messageInput = document.getElementById('form-message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Contact Inquiry';
            const message = messageInput ? messageInput.value.trim() : '';

            // Validation
            if (!name) {
                showToast('Please enter your name.', 'fa-solid fa-triangle-exclamation');
                nameInput?.focus();
                return;
            }

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('Please enter a valid email address.', 'fa-solid fa-triangle-exclamation');
                emailInput?.focus();
                return;
            }

            if (!message) {
                showToast('Please enter your message.', 'fa-solid fa-triangle-exclamation');
                messageInput?.focus();
                return;
            }

            // Client-side confirmation & mailto link prep
            showToast(`Thank you, ${name}! Opening mail client... 🚀`, 'fa-solid fa-paper-plane');

            const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Harshal,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 600);

            contactForm.reset();
        });
    }

}

// Initialize when DOM is ready or immediately if already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}
