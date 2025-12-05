
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const skillBars = document.querySelectorAll('.skill-progress');
const languageBars = document.querySelectorAll('.language-progress');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const filterButtons = document.querySelectorAll('.filter-btn');
const fullscreenToggle = document.querySelector('.fullscreen-toggle');


if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth Scrolling for Navigation Links
navLinksItems.forEach(link => {
    link.addEventListener('click', (e) => {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Animate Progress Bars on Page Load
function animateProgressBars() {
    // Skill bars animation
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, 500);
    });
    
    // Language bars animation
    languageBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, 800);
    });
}

// Portfolio Filter Functionality
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Fullscreen Toggle Functionality
if (fullscreenToggle) {
    fullscreenToggle.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err.message);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
    
    // Update fullscreen icon based on state
    document.addEventListener('fullscreenchange', () => {
        const icon = fullscreenToggle.querySelector('i');
        if (document.fullscreenElement) {
            icon.className = 'fas fa-compress';
        } else {
            icon.className = 'fas fa-expand';
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Add scroll animations to elements
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.hero-text, .hero-image, .about-text, .about-image, .experience-item, .skill-item, .portfolio-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax Effect for Hero Section
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const aboutImage = document.querySelector('.about-image');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (aboutImage) {
            aboutImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Typing Effect for Hero Title
function addTypingEffect() {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.opacity = '1';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                heroName.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
}

// Skills Counter Animation
function animateSkillCounters() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const progressBar = item.querySelector('.skill-progress');
        const targetWidth = parseInt(progressBar.getAttribute('data-width'));
        
        setTimeout(() => {
            let currentWidth = 0;
            const increment = targetWidth / 50;
            
            const counter = setInterval(() => {
                currentWidth += increment;
                if (currentWidth >= targetWidth) {
                    currentWidth = targetWidth;
                    clearInterval(counter);
                }
                progressBar.style.width = currentWidth + '%';
            }, 30);
        }, index * 200);
    });
}

// Experience Items Stagger Animation
function animateExperienceItems() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('slide-in-left');
        }, index * 200);
    });
}

// Portfolio Hover Effects
function addPortfolioHoverEffects() {
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    setTimeout(() => {
        addScrollAnimations();
        animateProgressBars();
        addParallaxEffect();
        addPortfolioHoverEffects();
        
        // Page-specific animations
        if (document.querySelector('.hero-name')) {
            addTypingEffect();
        }
        
        if (document.querySelector('.experience-item')) {
            setTimeout(animateExperienceItems, 1000);
        }
        
        if (document.querySelector('.skill-progress')) {
            setTimeout(animateSkillCounters, 1500);
        }
    }, 100);
    
    // Add fade-in class to body for smooth page transitions
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Page transition effects
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// Smooth page transitions
function smoothPageTransition(url) {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Add click handlers for smooth transitions
document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        smoothPageTransition(link.href);
    });
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'images/workspace.jpg',
        'images/portrait.jpg',
        'images/portfolio1.jpg',
        'images/portfolio2.jpg',
        'images/portfolio3.jpg',
        'images/portfolio4.jpg',
        'images/portfolio5.jpg',
        'images/portfolio6.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize image preloading
preloadImages();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
    }
});

// Add touch gestures for mobile
let startY = 0;
let startX = 0;

document.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
    if (!startY || !startX) return;
    
    const diffY = startY - e.touches[0].clientY;
    const diffX = startX - e.touches[0].clientX;
    
    // Add subtle parallax on mobile scroll
    if (Math.abs(diffY) > Math.abs(diffX)) {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${diffY * 0.1}px)`;
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});

console.log('Portfolio website initialized successfully!');