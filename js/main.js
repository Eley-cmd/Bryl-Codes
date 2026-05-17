// Smooth active nav link highlight
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
    links.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + cur) a.style.color = 'var(--text-primary)';
    });
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');

// Close nav on link click (mobile) — skip dropdown parent links
document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.closest('.has-dropdown') && a.parentElement.classList.contains('has-dropdown')) return;
    a.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
        if (hamburger) hamburger.classList.remove('open');
        closeAllDropdowns();
    });
});

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open');
        // If closing, reset dropdowns
        if (!isOpen) {
            closeAllDropdowns();
        }
    });
}

// Mobile dropdown toggle
document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            e.stopPropagation();
            // Close other open dropdowns
            document.querySelectorAll('.has-dropdown.open').forEach(dd => {
                if (dd !== link.parentElement) dd.classList.remove('open');
            });
            link.parentElement.classList.toggle('open');
        }
    });
});

// Close dropdowns when nav closes
function closeAllDropdowns() {
    document.querySelectorAll('.has-dropdown.open').forEach(dd => dd.classList.remove('open'));
}

// ─── Nav scroll effect ───
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (nav) {
        nav.classList.toggle('nav-scrolled', window.scrollY > 50);
    }
});

// ─── Hero parallax on scroll ───
const heroBg = document.querySelector('.hero-bg');
const heroGrid = document.querySelector('.hero-grid');
const heroSection = document.getElementById('home');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const sectionBottom = heroSection.offsetTop + heroSection.offsetHeight;

        // Only apply parallax while hero is in view
        if (scrollY < sectionBottom) {
            if (heroBg) heroBg.style.transform = 'translateY(' + (scrollY * -0.4) + 'px)';
            if (heroGrid) heroGrid.style.transform = 'translateY(' + (scrollY * -0.2) + 'px)';
        }
    }, { passive: true });
}

// ─── Hero card mouse tilt effect ───
const heroCard = document.querySelector('.hero-card');
const heroVisual = document.querySelector('.hero-visual');

if (heroCard && heroVisual && window.innerWidth > 900) {
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = ((e.clientY - centerY) / rect.height) * -8;
        const rotateY = ((e.clientX - centerX) / rect.width) * 8;

        heroCard.style.animation = 'none';
        heroCard.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(10px)';
        heroCard.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(26,86,219,0.15)';
    });

    heroVisual.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
        heroCard.style.boxShadow = '';
        // Restart float animation after a short delay
        setTimeout(() => {
            heroCard.style.animation = '';
        }, 300);
    });
}

// ─── Scroll reveal (IntersectionObserver) — infinite ───
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

// ─── Auto-apply reveal classes to common elements ───
function autoReveal() {
    // Section labels, titles, subtitles
    document.querySelectorAll('.section-label, .section-title, .section-sub').forEach((el, i) => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    // Cards with stagger
    const cardSelectors = [
        '.project-card', '.offer-card', '.tech-item',
        '.team-card', '.value-card', '.contact-item',
        '.process-step', '.process-detail-card'
    ];
    cardSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((card, i) => {
            if (!card.classList.contains('reveal-scale')) {
                card.classList.add('reveal-scale');
                card.classList.add('stagger-' + Math.min(i + 1, 6));
            }
        });
    });

    // Stats
    document.querySelectorAll('.stats-strip').forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    // CTA banner
    document.querySelectorAll('.cta-inner').forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    // Contact form
    document.querySelectorAll('.contact-form').forEach(el => {
        if (!el.classList.contains('reveal-right')) {
            el.classList.add('reveal-right');
        }
    });

    // About content
    document.querySelectorAll('.about-content').forEach(el => {
        if (!el.classList.contains('reveal-right')) {
            el.classList.add('reveal-right');
        }
    });

    // About team
    document.querySelectorAll('.about-team').forEach(el => {
        if (!el.classList.contains('reveal-left')) {
            el.classList.add('reveal-left');
        }
    });

    // Re-observe new elements — infinite (no unobserve)
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });
        observer.observe(el);
    });
}

autoReveal();

// ─── Stat counter animation ───
const statNums = document.querySelectorAll('.stat-num');

if (statNums.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                const match = text.match(/^(\d+)/);
                if (match) {
                    const target = parseInt(match[1]);
                    const suffix = text.replace(match[1], '');
                    let current = 0;
                    const duration = 1500;
                    const step = Math.max(1, Math.floor(target / (duration / 16)));
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = current + suffix;
                    }, 16);
                }
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => countObserver.observe(el));
}

// ─── Image fallback handler (replaces inline onerror attributes) ───
document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    function handleError() {
        // Prevent double-firing
        if (this.dataset.handled) return;
        this.dataset.handled = 'true';

        var type = this.dataset.fallback;
        var icon = this.dataset.icon || '';
        var color = this.dataset.iconColor || '';
        var size = this.dataset.iconSize || '';
        var style = '';
        if (color) style += 'color:' + color + ';';
        if (size) style += 'font-size:' + size + ';';
        var iconHtml = icon ? '<i class="' + icon + '"' + (style ? ' style="' + style + '"' : '') + '></i>' : '';

        switch (type) {
            case 'replace-parent':
                this.style.display = 'none';
                if (this.parentNode) this.parentNode.innerHTML = iconHtml;
                break;
            case 'prepend-parent':
                this.style.display = 'none';
                if (this.parentNode) this.parentNode.insertAdjacentHTML('afterbegin', iconHtml);
                break;
            case 'icon-sibling':
                this.style.display = 'none';
                if (this.nextElementSibling) this.nextElementSibling.innerHTML = iconHtml;
                break;
            case 'hide':
                this.style.display = 'none';
                break;
            case 'placeholder':
                this.style.background = 'var(--surface2)';
                this.style.height = this.dataset.fallbackHeight || '160px';
                break;
            case 'placeholder-block':
                this.style.background = 'var(--surface2)';
                this.style.display = 'block';
                break;
        }
    }

    img.addEventListener('error', handleError);
    // Catch images that already failed before JS loaded
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src') !== '#') {
        handleError.call(img);
    }
});
