// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: false,
        offset: 200
    });
    
    // Add scroll event for box animations
    window.addEventListener('scroll', function() {
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            const boxes = document.querySelectorAll('.box');
            const scrollPosition = window.scrollY;
            
            // Adjust box positions based on scroll
            boxes.forEach((box, index) => {
                const speed = 0.1 + (index * 0.01);
                const yPos = scrollPosition * speed;
                box.style.transform = `translateY(${-yPos}px)`;
            });
        }
        
        // Handle skill items animation
        animateSkillItems();
    });
    
    // Function to animate skill items on scroll
    function animateSkillItems() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Make all skills visible immediately when the section is in view
            const skillsSection = document.querySelector('.skills-section');
            if (skillsSection) {
                const sectionRect = skillsSection.getBoundingClientRect();
                if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
            }
        });
    }
    
    // Initial check for animations
    setTimeout(() => {
        animateSkillItems();
    }, 500);
});

// Remove the initContactSpline function since we're using the direct Spline viewer element
function initContactSpline() {
    // Check if the contact section is in the viewport
    const contactSection = document.querySelector('.contact-section');
    if (!contactSection) return;
    
    // You'll need to replace this URL with your actual Spline scene URL
    const splineContainer = document.getElementById('spline-hand');
    if (splineContainer && !splineContainer.hasChildNodes()) {
        const spline = new Spline({
            target: splineContainer,
            url: 'https://prod.spline.design/your-spline-scene-id'
        });
    }
}


// Add parallax effect to sections
function initParallaxEffects() {
    // Parallax for profile section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Profile parallax
        const profileSection = document.querySelector('.profile-section');
        if (profileSection) {
            const profileImage = profileSection.querySelector('.profile-image');
            const profileText = profileSection.querySelector('.profile-text');
            
            if (profileImage && profileText) {
                const profileRect = profileSection.getBoundingClientRect();
                if (profileRect.top < window.innerHeight && profileRect.bottom > 0) {
                    const scrollFactor = (window.innerHeight - profileRect.top) / (window.innerHeight + profileRect.height);
                    profileImage.style.transform = `translateY(${scrollFactor * 30}px)`;
                    profileText.style.transform = `translateY(${-scrollFactor * 20}px)`;
                }
            }
        }
        
        // Projects parallax
        const projects = document.querySelectorAll('.featured-project');
        projects.forEach((project, index) => {
            const rect = project.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollFactor = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const projectImage = project.querySelector('.project-image');
                const projectDetails = project.querySelector('.project-details');
                
                if (projectImage && projectDetails) {
                    projectImage.style.transform = `translateY(${scrollFactor * 20}px)`;
                    projectDetails.style.transform = `translateY(${-scrollFactor * 15}px)`;
                }
            }
        });
        
        // Contact section parallax
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            const contactVisual = contactSection.querySelector('.contact-visual');
            const contactInfo = contactSection.querySelector('.contact-info');
            
            if (contactVisual && contactInfo) {
                const contactRect = contactSection.getBoundingClientRect();
                if (contactRect.top < window.innerHeight && contactRect.bottom > 0) {
                    const scrollFactor = (window.innerHeight - contactRect.top) / (window.innerHeight + contactRect.height);
                    contactVisual.style.transform = `translateY(${scrollFactor * 40}px)`;
                    contactInfo.style.transform = `translateY(${-scrollFactor * 30}px)`;
                }
            }
        }
    });
}

// Smooth scroll effect for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a, .back-to-top');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#top') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fix skills grid to ensure consistent sizing
function fixSkillsGrid() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skillsGrid.style.display = 'grid';
        skillsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        skillsGrid.style.gridTemplateRows = 'repeat(2, 1fr)';
        skillsGrid.style.gap = '2rem';
        skillsGrid.style.padding = '2rem';
        
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.style.height = '200px';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.justifyContent = 'center';
            item.style.backgroundColor = '#ffffff';
            item.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        });
    }
}

// Add scroll reveal animations
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('reveal-section');
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    initParallaxEffects();
    initSmoothScroll();
    fixSkillsGrid();
    initScrollReveal();
    
    // Fix contact section z-index and overlay issues
    const contactSection = document.querySelector('#contact');
    const overlay = document.querySelector('div.gradient-overlay');
    const transition = document.querySelector('div.section-transition');
    
    // Set proper z-index for contact section
    if(contactSection) {
        // Set z-index higher than overlay and transition elements
        contactSection.style.position = 'relative';
        contactSection.style.zIndex = '102';
    }
    
    // Hide gradient overlay when it's not needed
    if(overlay) {
        overlay.style.display = 'none';
    }
});

// Initialize loading screen
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body
    document.body.classList.add('loading');
    
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const totalLoadTime = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / totalLoadTime) * 100;
    
    const loadingTimer = setInterval(() => {
        progress += increment;
        const currentProgress = Math.min(Math.floor(progress), 100);
        
        loadingPercentage.textContent = `${currentProgress}%`;
        loadingProgress.style.width = `${currentProgress}%`;
        
        if (currentProgress >= 100) {
            clearInterval(loadingTimer);
            
            // Add small delay before transition
            setTimeout(() => {
                loadingScreen.classList.add('loading-complete');
                
                // Remove loading screen after transition
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.remove('loading');
                    document.body.classList.add('loaded');
                    
                    // Initialize AOS and other animations after loading
                    initializeAfterLoading();
                }, 1000);
            }, 500);
        }
    }, interval);
});

// Function to initialize animations after loading
function initializeAfterLoading() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: false,
        offset: 200
    });
    
    // Add scroll event for box animations
    window.addEventListener('scroll', function() {
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            const boxes = document.querySelectorAll('.box');
            const scrollPosition = window.scrollY;
            
            // Adjust box positions based on scroll
            boxes.forEach((box, index) => {
                const speed = 0.1 + (index * 0.01);
                const yPos = scrollPosition * speed;
                box.style.transform = `translateY(${-yPos}px)`;
            });
        }
        
        // Handle skill items animation
        animateSkillItems();
    });
    
    // Initial check for animations
    setTimeout(() => {
        animateSkillItems();
    }, 500);
}

// Function to animate skill items on scroll
function animateSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Make all skills visible immediately when the section is in view
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            const sectionRect = skillsSection.getBoundingClientRect();
            if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
            }
        }
    });
}

// Remove the initContactSpline function since we're using the direct Spline viewer element
function initContactSpline() {
    // Check if the contact section is in the viewport
    const contactSection = document.querySelector('.contact-section');
    if (!contactSection) return;
    
    // You'll need to replace this URL with your actual Spline scene URL
    const splineContainer = document.getElementById('spline-hand');
    if (splineContainer && !splineContainer.hasChildNodes()) {
        const spline = new Spline({
            target: splineContainer,
            url: 'https://prod.spline.design/your-spline-scene-id'
        });
    }
}


// Add parallax effect to sections
function initParallaxEffects() {
    // Parallax for profile section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Profile parallax
        const profileSection = document.querySelector('.profile-section');
        if (profileSection) {
            const profileImage = profileSection.querySelector('.profile-image');
            const profileText = profileSection.querySelector('.profile-text');
            
            if (profileImage && profileText) {
                const profileRect = profileSection.getBoundingClientRect();
                if (profileRect.top < window.innerHeight && profileRect.bottom > 0) {
                    const scrollFactor = (window.innerHeight - profileRect.top) / (window.innerHeight + profileRect.height);
                    profileImage.style.transform = `translateY(${scrollFactor * 30}px)`;
                    profileText.style.transform = `translateY(${-scrollFactor * 20}px)`;
                }
            }
        }
        
        // Projects parallax
        const projects = document.querySelectorAll('.featured-project');
        projects.forEach((project, index) => {
            const rect = project.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollFactor = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const projectImage = project.querySelector('.project-image');
                const projectDetails = project.querySelector('.project-details');
                
                if (projectImage && projectDetails) {
                    projectImage.style.transform = `translateY(${scrollFactor * 20}px)`;
                    projectDetails.style.transform = `translateY(${-scrollFactor * 15}px)`;
                }
            }
        });
        
        // Contact section parallax
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            const contactVisual = contactSection.querySelector('.contact-visual');
            const contactInfo = contactSection.querySelector('.contact-info');
            
            if (contactVisual && contactInfo) {
                const contactRect = contactSection.getBoundingClientRect();
                if (contactRect.top < window.innerHeight && contactRect.bottom > 0) {
                    const scrollFactor = (window.innerHeight - contactRect.top) / (window.innerHeight + contactRect.height);
                    contactVisual.style.transform = `translateY(${scrollFactor * 40}px)`;
                    contactInfo.style.transform = `translateY(${-scrollFactor * 30}px)`;
                }
            }
        }
    });
}

// Smooth scroll effect for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a, .back-to-top');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#top') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fix skills grid to ensure consistent sizing
function fixSkillsGrid() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skillsGrid.style.display = 'grid';
        skillsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        skillsGrid.style.gridTemplateRows = 'repeat(2, 1fr)';
        skillsGrid.style.gap = '2rem';
        skillsGrid.style.padding = '2rem';
        
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.style.height = '200px';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.justifyContent = 'center';
            item.style.backgroundColor = '#ffffff';
            item.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        });
    }
}

// Add scroll reveal animations
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
        section.classList.add('reveal-section');
    });
}

// Add this new function for section transition effects
function initSectionTransitions() {
    // Enable smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add scroll snap points
    document.querySelector('main').style.scrollSnapType = 'y mandatory';
    document.querySelectorAll('section').forEach(section => {
        section.style.scrollSnapAlign = 'start';
        section.style.minHeight = '100vh';
    });

    // Custom animation when entering new section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Scale up animation
                entry.target.style.transform = 'scale(0.98)';
                entry.target.style.opacity = '0';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.opacity = '1';
                }, 100);
                
                // Add color pulse effect to current nav item
                const id = entry.target.id;
                if (id) {
                    const navLink = document.querySelector(`nav a[href="#${id}"]`);
                    if (navLink) {
                        navLink.classList.add('active-pulse');
                        setTimeout(() => {
                            navLink.classList.remove('active-pulse');
                        }, 1000);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Update DOMContentLoaded initialization
document.addEventListener('DOMContentLoaded', () => {
    initParallaxEffects();
    initSmoothScroll();
    fixSkillsGrid();
    initScrollReveal();
    initSectionTransitions(); // Add this line
});

// Function to initialize animations after loading
function initializeAfterLoading() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: false,
        offset: 200
    });
    
    // Add scroll event for box animations
    window.addEventListener('scroll', function() {
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            const boxes = document.querySelectorAll('.box');
            const scrollPosition = window.scrollY;
            
            // Adjust box positions based on scroll
            boxes.forEach((box, index) => {
                const speed = 0.1 + (index * 0.01);
                const yPos = scrollPosition * speed;
                box.style.transform = `translateY(${-yPos}px)`;
            });
        }
        
        // Handle skill items animation
        animateSkillItems();
    });
    
    // Initial check for animations
    setTimeout(() => {
        animateSkillItems();
    }, 500);
}

function initHeaderDivider() {
    const headerDivider = document.querySelector('.header-divider');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        let shouldBeBlack = false;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                if (section.classList.contains('projects-section') || 
                    section.classList.contains('about-section') ||
                    section.classList.contains('contact-section')) {
                    shouldBeBlack = true;
                }
            }
        });
        
        headerDivider.style.backgroundColor = shouldBeBlack ? '#000' : '#fff';
        if (headerDivider.nextElementSibling) {
            headerDivider.nextElementSibling.style.backgroundColor = shouldBeBlack ? '#000' : '#fff';
        }
    });
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initHeaderDivider();
});


function updateHeaderColorOnScroll() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let isOnWhiteSection = false;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (
                rect.top <= 80 && rect.bottom >= 80 && // 80px offset for header height
                (section.classList.contains('projects-section') ||
                 section.classList.contains('profile-section') ||
                 section.classList.contains('skills-section'))
            ) {
                isOnWhiteSection = true;
            }
        });
        if (isOnWhiteSection) {
            header.classList.add('header-dark');
        } else {
            header.classList.remove('header-dark');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initHeaderDivider();
    updateHeaderColorOnScroll();
});
