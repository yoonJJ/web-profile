document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    function addRevealItems(selector, className = 'reveal-item') {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add('reveal-item');
            if (className) {
                element.classList.add(className);
            }
            element.style.setProperty('--reveal-delay', `${index * 0.08}s`);
        });
    }

    addRevealItems('.about-image', 'reveal-left');
    addRevealItems('.about-text', 'reveal-right');
    addRevealItems('.framework-marquee', 'reveal-zoom');
    addRevealItems('.work .section-header', 'reveal-left');
    addRevealItems('.work .project-card', 'reveal-item');
    addRevealItems('.blog-intro', 'reveal-left');
    addRevealItems('.blog-content', 'reveal-right');
    addRevealItems('.contact .section-header', 'reveal-left');
    addRevealItems('.contact .email-display', 'reveal-right');
    addRevealItems('.contact .contact-description p', 'reveal-item');
    addRevealItems('.contact .contact-button', 'reveal-zoom');
    
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--brand-soft, #dce8ec), var(--brand-muted, #6b8a96));
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    const blogSection = document.querySelector('.blog');
    const blogRight = document.querySelector('.blog-right');
    let isParallaxTicking = false;

    function updateBlogParallax() {
        if (!blogSection || !blogRight) return;
        const rect = blogRight.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        // 블로그 우측 목록 시작~종료 구간에 맞춰 채움 진행률 계산
        const startY = rect.top + window.scrollY - 120;
        const endY = rect.bottom + window.scrollY - viewportHeight + 120;
        const currentY = window.scrollY;
        const rawProgress = (currentY - startY) / Math.max(1, endY - startY);
        const clampedProgress = Math.min(1, Math.max(0, rawProgress));
        blogSection.style.setProperty('--blog-fill-progress', clampedProgress.toFixed(3));

        isParallaxTicking = false;
    }

    function onParallaxScroll() {
        if (isParallaxTicking) return;
        isParallaxTicking = true;
        requestAnimationFrame(updateBlogParallax);
    }

    if (blogSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        updateBlogParallax();
        window.addEventListener('scroll', onParallaxScroll, { passive: true });
        window.addEventListener('resize', onParallaxScroll);
    }
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        setInterval(() => {
            scrollArrow.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                scrollArrow.style.transform = 'translateY(0)';
            }, 1000);
        }, 2000);
    }
    
    const modal = document.getElementById('aboutModal');
    const portfolioModal = document.getElementById('portfolioModal');
    const portfolioFrame = document.getElementById('portfolioFrame');
    const readMoreBtn = document.querySelector('.read-more');
    const closeBtn = document.querySelector('.close');
    const closePortfolioBtn = document.querySelector('.close-portfolio');
    const portfolioModalTitle = document.getElementById('portfolioModalTitle');
    const portfolioModalButtons = document.querySelectorAll('.open-portfolio-modal');
    const modalAnimationMs = 220;
    let previousFocusedElement = null;

    function openModal() {
        if (!modal) return;
        previousFocusedElement = document.activeElement;
        modal.classList.remove('is-closing');
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        closeBtn?.focus();
    }

    function closeModal() {
        if (!modal || !modal.classList.contains('is-open')) return;
        modal.classList.remove('is-open');
        modal.classList.add('is-closing');
        document.body.style.overflow = '';

        setTimeout(() => {
            modal.classList.remove('is-closing');
            previousFocusedElement?.focus?.();
        }, modalAnimationMs);
    }

    function openPortfolioModal(src, title) {
        if (!portfolioModal || !portfolioFrame) return;
        previousFocusedElement = document.activeElement;
        portfolioModal.classList.remove('is-closing');
        portfolioModal.classList.add('is-open');
        portfolioFrame.src = src;
        if (portfolioModalTitle && title) {
            portfolioModalTitle.textContent = title;
        }
        document.body.style.overflow = 'hidden';
        closePortfolioBtn?.focus();
    }

    function closePortfolioModal() {
        if (!portfolioModal || !portfolioModal.classList.contains('is-open')) return;
        portfolioModal.classList.remove('is-open');
        portfolioModal.classList.add('is-closing');
        document.body.style.overflow = '';

        setTimeout(() => {
            portfolioModal.classList.remove('is-closing');
            if (portfolioFrame) portfolioFrame.src = '';
            previousFocusedElement?.focus?.();
        }, modalAnimationMs);
    }
    
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            openModal();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    if (closePortfolioBtn) {
        closePortfolioBtn.addEventListener('click', function() {
            closePortfolioModal();
        });
    }

    portfolioModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const src = this.getAttribute('data-src');
            if (!src) return;
            const title = this.getAttribute('data-title');
            openPortfolioModal(src, title);
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
        if (event.target === portfolioModal) {
            closePortfolioModal();
        }
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            closePortfolioModal();
        }
    });
    
    let isScrolling = false;
    let hasUserInteracted = false;
    
    document.addEventListener('wheel', function() {
        hasUserInteracted = true;
    }, { once: true });
    
    window.addEventListener('wheel', function(e) {
        if (isScrolling || !hasUserInteracted) return;
        
        const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        const section = currentSection.closest('section');
        
        if (section && section.classList.contains('hero')) {
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
            
            e.preventDefault();
            
            const delta = e.deltaY;
            
            if (delta > 0) {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    }, { passive: false });

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add a subtle animation effect
            const activePanel = document.getElementById(targetTab);
            activePanel.style.opacity = '0';
            activePanel.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activePanel.style.opacity = '1';
                activePanel.style.transform = 'translateY(0)';
            }, 50);
        });
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    const contactMeButton = document.querySelector('.contact-me');
    if (contactMeButton) {
        contactMeButton.addEventListener('click', function() {
            window.location.href = 'tel:01033445539';
        });
    }
    
    const contactButton = document.querySelector('.contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            window.location.href = 'mailto:yoon.jj5539@gmail.com';
        });
    }
});
