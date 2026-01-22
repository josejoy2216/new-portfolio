// ==================== DATA CONFIGURATION ====================
const portfolioData = {
    experience: [
        {
            title: "Senior Technology Architect",
            company: "Tech Innovations Corp",
            period: "2020 - Present",
            description: "Leading digital transformation initiatives, architecting microservices platforms, and implementing AI-driven solutions for enterprise clients.",
            achievements: [
                "Architected cloud-native platforms serving 100K+ users",
                "Led team of 15+ developers across multiple projects",
                "Reduced infrastructure costs by 40% through optimization"
            ]
        },
        {
            title: "Lead Full-Stack Developer",
            company: "Digital Solutions Ltd",
            period: "2016 - 2020",
            description: "Spearheaded development of scalable web applications, mentored junior developers, and established coding standards and best practices.",
            achievements: [
                "Built 20+ production applications",
                "Mentored 25+ junior developers",
                "Established CI/CD pipelines reducing deployment time by 70%"
            ]
        },
        {
            title: "Senior Software Engineer",
            company: "Innovation Systems",
            period: "2012 - 2016",
            description: "Developed enterprise-grade applications, optimized database performance, and implemented automated testing frameworks.",
            achievements: [
                "Improved application performance by 300%",
                "Implemented automated testing reducing bugs by 60%",
                "Led migration to modern tech stack"
            ]
        },
        {
            title: "Software Developer",
            company: "StartupTech",
            period: "2008 - 2012",
            description: "Built foundational skills in web development, database design, and agile methodologies while contributing to multiple product launches.",
            achievements: [
                "Contributed to 5 successful product launches",
                "Developed core features used by 10K+ users",
                "Mastered full-stack development fundamentals"
            ]
        }
    ],

    projects: [
        {
            title: "Enterprise Cloud Platform 1",
            description: "Architected and developed a comprehensive cloud-native platform serving 50,000+ users with microservices architecture and real-time analytics.",
            fullDescription: "This enterprise-grade platform revolutionized how our client managed their digital operations. Built with microservices architecture, it provides real-time analytics, automated scaling, and comprehensive monitoring. The platform handles millions of transactions daily with 99.9% uptime.",
            technologies: ["React", "Node.js", "AWS", "Docker", "Kubernetes"],
            category: "Enterprise",
            link: "#",
            features: [
                "Real-time analytics dashboard",
                "Automated scaling and monitoring",
                "Multi-tenant architecture",
                "Advanced security protocols"
            ]
        },
        {
            title: "AI-Powered Analytics Dashboard 1",
            description: "Built an intelligent analytics platform with machine learning capabilities, providing actionable insights and predictive analytics for business operations.",
            fullDescription: "Revolutionary analytics platform that uses machine learning to predict business trends and provide actionable insights. Features advanced data visualization, natural language querying, and automated report generation.",
            technologies: ["Python", "TensorFlow", "Vue.js", "PostgreSQL"],
            category: "AI/ML",
            link: "#",
            features: [
                "Predictive analytics engine",
                "Natural language queries",
                "Automated insight generation",
                "Custom visualization builder"
            ]
        },
        {
            title: "Mobile-First E-Commerce Solution 1",
            description: "Developed a high-performance e-commerce platform with advanced payment integration, inventory management, and seamless mobile experience.",
            fullDescription: "Complete e-commerce solution optimized for mobile-first experiences. Includes advanced features like AR product visualization, personalized recommendations, and seamless checkout processes.",
            technologies: ["React Native", "Express.js", "MongoDB", "Stripe"],
            category: "E-Commerce",
            link: "#",
            features: [
                "AR product visualization",
                "Personalized recommendations",
                "Multi-payment gateway integration",
                "Real-time inventory tracking"
            ]
        }
    ],

    blogs: [
        {
            title: "The Future of AI in Software Development",
            date: "August 25, 2025",
            category: "AI/Technology",
            description: "Exploring how artificial intelligence is reshaping the development landscape and what it means for the future of our industry.",
            readTime: "8 min read",
            fullContent: "Artificial Intelligence is not just changing how we build software—it's fundamentally transforming what software can do. From automated code generation to intelligent debugging, AI tools are becoming indispensable parts of the modern developer's toolkit. In this comprehensive analysis, we explore the current state of AI in development, emerging trends, and practical implications for developers at all levels.",
            tags: ["AI", "Development", "Future Tech"]
        },
        {
            title: "Microservices vs. Monolith: A Modern Perspective",
            date: "July 12, 2025",
            category: "Architecture",
            description: "Breaking down the pros and cons of microservices architecture and when it makes sense to stick with a monolithic approach.",
            readTime: "12 min read",
            fullContent: "The debate between microservices and monolithic architectures continues to evolve. While microservices offer scalability and flexibility, they come with increased complexity in deployment and monitoring. This article provides a decision framework for architects and technical leaders to choose the right pattern for their specific organizational needs and team capabilities.",
            tags: ["Architecture", "Microservices", "Cloud"]
        },
        {
            title: "Optimizing Cloud Costs for Enterprise Scale",
            date: "June 05, 2025",
            category: "Cloud Computing",
            description: "Practical strategies for managing and reducing cloud infrastructure costs without compromising performance or reliability.",
            readTime: "10 min read",
            fullContent: "As cloud adoption matures, cost optimization has become a critical priority for enterprises. We look at proven strategies for identifying waste, rightsizing instances, and leveraging spot instances and reserved capacity. Learn how to build a FinOps culture that empowers engineering teams to take ownership of their cloud spend.",
            tags: ["AWS", "Cost Optimization", "DevOps"]
        }
    ]
};

// ==================== RENDERING FUNCTIONS ====================

function renderExperience() {
    return `
        <div class="container">
            <h2 class="section-title">Professional Journey</h2>
            <div class="timeline">
                ${portfolioData.experience.map(exp => `
                    <div class="timeline-item">
                        <div class="timeline-content">
                            <h3>${exp.title}</h3>
                            <h4 style="color: var(--accent); margin-bottom: 0.5rem;">${exp.company}</h4>
                            <p class="item-date">${exp.period}</p>
                            <p style="margin: 1rem 0; color: var(--text-secondary);">${exp.description}</p>
                            <ul style="color: var(--text-secondary); margin-left: 1rem;">
                                ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="timeline-dot"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderExperiencePreview() {
    // Show only the first 2 experience items
    const previewItems = portfolioData.experience.slice(0, 2);
    
    return `
        <div class="container section-container highlight">
            <h2 class="section-title">Professional Experience</h2>
            <div class="grid grid-2">
                ${previewItems.map(exp => `
                    <div class="card p-4">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                            <div>
                                <h3 style="margin-bottom: 0.5rem;">${exp.title}</h3>
                                <h4 style="color: var(--accent); margin-bottom: 0.5rem;">${exp.company}</h4>
                                <p class="item-date">${exp.period}</p>
                            </div>
                        </div>
                        <p style="color: var(--text-secondary); margin-bottom: 1rem;">${exp.description}</p>
                        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            ${exp.achievements.slice(0, 2).map(achievement => `
                                <span style="background: var(--accent-bg); color: var(--accent); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">✓ ${achievement}</span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="text-center" style="margin-top: 3rem;">
                <a href="experience.html" class="btn-primary">View Complete Timeline</a>
            </div>
        </div>
    `;
}

function renderProjects() {
    return `
        <div class="container">
            <h2 class="section-title">Featured Projects</h2>
            <div class="grid grid-2">
                ${portfolioData.projects.map((project, index) => `
                    <div class="card card-expandable" data-project="${index}">
                        <div class="item-header"></div>
                        <div class="item-content">
                            <div class="card-preview">
                                <div class="item-meta">
                                    <h3 class="item-title">${project.title}</h3>
                                    <span style="background: var(--accent-bg); color: var(--accent); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">${project.category}</span>
                                </div>
                                <p class="item-description">${project.description}</p>
                                <div class="tech-tags">
                                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                                <button class="btn-outline expand-btn">Show More</button>
                            </div>
                            <div class="card-expanded">
                                <p class="item-description">${project.fullDescription}</p>
                                <h4 style="margin-bottom: 0.5rem;">Key Features:</h4>
                                <ul style="color: var(--text-secondary); margin-left: 1rem; margin-bottom: 1rem;">
                                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                                <div style="display: flex; gap: 1rem;">
                                    <button class="btn-outline" onclick="window.open('${project.link}', '_blank')">View Project</button>
                                    <button class="btn-outline collapse-btn">Show Less</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderProjectsPreview() {
    // Show first 3 projects
    const previewProjects = portfolioData.projects.slice(0, 3);
    
    return `
        <div class="container section-container">
            <h2 class="section-title">Featured Projects</h2>
            <div class="grid grid-3 mobile-scroll-x">
                ${previewProjects.map(project => {
                    const visibleTags = project.technologies.slice(0, 3);
                    const remainingTags = project.technologies.length - 3;
                    
                    return `
                    <div class="card">
                        <div class="item-header"></div>
                        <div class="item-content">
                            <h3 class="item-title">${project.title}</h3>
                            <p class="item-description">${project.description}</p>
                            <div class="tech-tags">
                                ${visibleTags.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                ${remainingTags > 0 ? `<span class="tech-tag">+${remainingTags} more</span>` : ''}
                            </div>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
            <div class="text-center" style="margin-top: 3rem;">
                <a href="projects.html" class="btn-primary">Explore All Projects</a>
            </div>
        </div>
    `;
}

function renderBlogs() {
    return `
        <div class="container">
            <h2 class="section-title">Latest Insights</h2>
            <div class="grid grid-2">
                ${portfolioData.blogs.map((blog, index) => `
                    <article class="card card-expandable" data-blog="${index}">
                        <div class="item-header" style="background: var(--gradient-2);"></div>
                        <div class="item-content">
                            <div class="card-preview">
                                <div class="item-meta">
                                    <p class="item-date">${blog.date}</p>
                                    <span style="background: var(--purple-bg); color: var(--purple-text); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">${blog.category}</span>
                                </div>
                                <h3 class="item-title">${blog.title}</h3>
                                <p class="item-description">${blog.description}</p>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                                    <span style="color: var(--text-muted); font-size: 0.9rem;">${blog.readTime}</span>
                                    <button class="btn-outline expand-btn">Read More</button>
                                </div>
                            </div>
                            <div class="card-expanded">
                                <p class="item-description">${blog.fullContent}</p>
                                <div class="tech-tags" style="margin-top: 1rem;">
                                    ${blog.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                                </div>
                                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                                    <button class="btn-outline collapse-btn">Show Less</button>
                                </div>
                            </div>
                        </div>
                    </article>
                `).join('')}
            </div>
        </div>
    `;
}

function renderBlogsPreview() {
    // Show first 2 blogs
    const previewBlogs = portfolioData.blogs.slice(0, 2);

    return `
        <div class="container section-container highlight">
            <h2 class="section-title">Latest Insights</h2>
            <div class="grid grid-2 mobile-scroll-x">
                ${previewBlogs.map(blog => `
                    <article class="card">
                        <div class="item-header" style="background: var(--gradient-2); height: 120px;"></div>
                        <div class="item-content">
                            <div class="item-meta">
                                <p class="item-date">${blog.date}</p>
                                <span style="background: var(--purple-bg); color: var(--purple-text); padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem;">${blog.readTime}</span>
                            </div>
                            <h3 class="item-title">${blog.title}</h3>
                            <p class="item-description">${blog.description}</p>
                        </div>
                    </article>
                `).join('')}
            </div>
            <div class="text-center" style="margin-top: 3rem;">
                <a href="blog.html" class="btn-primary">Read All Articles</a>
            </div>
        </div>
    `;
}

// ==================== EVENT LISTENERS ====================

function attachEventListeners() {
    // Expand/Collapse functionality
    // We use event delegation or re-attach listeners because content might be dynamic
    // But since we render immediately on load, simple selection works if done after rendering
    
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('expand-btn')) {
            e.stopPropagation();
            const card = e.target.closest('.card-expandable');
            if (card) {
                card.classList.add('expanded');
            }
        }
        
        if (e.target.classList.contains('collapse-btn')) {
            e.stopPropagation();
            const card = e.target.closest('.card-expandable');
            if (card) {
                card.classList.remove('expanded');
            }
        }
    });

    // Contact forms (both home and contact page)
    const contactForm = document.getElementById('contactForm');
    const homeContactForm = document.getElementById('homeContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }
    
    if (homeContactForm) {
        homeContactForm.addEventListener('submit', handleContactSubmission);
    }

    // Card hover effects - delegated for dynamic content
    document.body.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.card');
        if (card && !card.classList.contains('expanded') && !card.classList.contains('card-expandable')) {
             // Simple cards
             // Note: CSS hover is usually better for this, but keeping JS if needed for complex logic
        }
    });
}

function handleContactSubmission(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            e.target.reset();
        }, 2000);
    }, 1500);
}

// ==================== PARTICLES BACKGROUND ====================

function createParticles() {
    const particlesHtml = Array.from({ length: 50 }, () => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 4;
        return `<div class="particle" style="left: ${left}%; top: ${top}%; animation-delay: ${delay}s;"></div>`;
    }).join('');

    document.body.insertAdjacentHTML('beforeend', `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none;">
            ${particlesHtml}
        </div>
    `);
}

// ==================== INITIALIZATION ====================

async function loadSharedComponents() {
    try {
        // Load Header
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            const headerResponse = await fetch('header.html');
            if (headerResponse.ok) {
                const headerHtml = await headerResponse.text();
                headerPlaceholder.innerHTML = headerHtml;
                
                // Set active nav link
                const currentPath = window.location.pathname;
                const page = currentPath.split('/').pop() || 'index.html';
                const navLinks = document.querySelectorAll('.nav-link');
                
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === page || (page === '' && href === 'index.html')) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        }

        // Load Footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            const footerResponse = await fetch('footer.html');
            if (footerResponse.ok) {
                footerPlaceholder.innerHTML = await footerResponse.text();
            }
        }
    } catch (error) {
        console.warn('Error loading shared components. If you are running this locally (file://), fetch requests may be blocked by CORS. Please use a local server (http://localhost).', error);
    }

    // Continue with normal app initialization
    initializeApp();
}

function initializeApp() {
    // 1. Theme Management
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    
    // Inject Theme Toggle Button
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        // Check if button already exists to prevent duplicates
        if (!document.querySelector('.theme-switch-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'theme-switch-wrapper';
            
            const label = document.createElement('label');
            label.className = 'theme-switch';
            label.setAttribute('for', 'checkbox');
            
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = 'checkbox';
            // If theme is 'light', checkbox should be checked (assuming switch right is light/sun)
            // Or typically: unchecked = dark (moon left), checked = light (sun right)
            // Let's go with: unchecked = dark, checked = light
            input.checked = theme === 'light';
            
            const slider = document.createElement('div');
            slider.className = 'slider round';
            
            // Add knob with icons inside
            slider.innerHTML = `
                <div class="knob">
                    <i class="fas fa-sun"></i>
                    <i class="fas fa-moon"></i>
                </div>
            `;
            
            label.appendChild(input);
            label.appendChild(slider);
            wrapper.appendChild(label);
            
            // Insert before menu toggle if it exists, or append
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                navContainer.insertBefore(wrapper, menuToggle);
            } else {
                navContainer.appendChild(wrapper);
            }
            
            input.addEventListener('change', (e) => {
                const newTheme = e.target.checked ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }

    // 2. Render Content
    // Previews (Home Page)
    const expPreview = document.getElementById('experience-preview-container');
    if (expPreview) expPreview.innerHTML = renderExperiencePreview();
    
    const projPreview = document.getElementById('projects-preview-container');
    if (projPreview) projPreview.innerHTML = renderProjectsPreview();
    
    const blogPreview = document.getElementById('blogs-preview-container');
    if (blogPreview) blogPreview.innerHTML = renderBlogsPreview();
    
    // Full Pages
    const expContainer = document.getElementById('experience-container');
    if (expContainer) expContainer.innerHTML = renderExperience();

    const projContainer = document.getElementById('projects-container');
    if (projContainer) projContainer.innerHTML = renderProjects();

    const blogContainer = document.getElementById('blog-container');
    if (blogContainer) blogContainer.innerHTML = renderBlogs();

    // 3. Setup Effects & Listeners
    createParticles();
    attachEventListeners();
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.getElementById('menuToggle');
        if (navMenu && menuToggle && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            if (navMenu) navMenu.classList.remove('active');
            // Close any expanded cards
            document.querySelectorAll('.card-expandable.expanded').forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });

    // Initialize Scroll Animations
    initScrollAnimations();
    
    // Initialize Accessibility
    initAccessibility();
}

function initAccessibility() {
    // 2. Add Skip to Content Link (Accessibility)
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#mainContent';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // 2. Inject Accessibility Toggle & Panel
    const navContainer = document.querySelector('.nav-container');
    if (navContainer && !document.querySelector('.a11y-toggle')) {
        // Create Toggle Button
        const a11yToggle = document.createElement('button');
        a11yToggle.className = 'a11y-toggle';
        a11yToggle.ariaLabel = 'Accessibility Settings';
        a11yToggle.innerHTML = '<i class="fas fa-universal-access"></i>';
        
        // Create Panel
        const panel = document.createElement('div');
        panel.className = 'a11y-panel';
        panel.innerHTML = `
            <h3>Accessibility</h3>
            <div class="a11y-controls">
                <div>
                    <p style="margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">Text Size</p>
                    <div class="font-controls">
                        <button class="font-btn" id="font-dec" aria-label="Decrease Font Size">A-</button>
                        <button class="font-btn active" id="font-reset" aria-label="Reset Font Size">Reset</button>
                        <button class="font-btn" id="font-inc" aria-label="Increase Font Size">A+</button>
                    </div>
                </div>
            </div>
        `;
        
        // Insert in Navbar (before menu toggle)
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            navContainer.insertBefore(a11yToggle, menuToggle);
        } else {
            navContainer.appendChild(a11yToggle);
        }

        // Inject Google Translate into the Main Nav Menu instead of the Panel
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            const translateLi = document.createElement('li');
            translateLi.className = 'nav-item-translate';
            // Add a container for the translate element
            translateLi.innerHTML = `<div id="google_translate_element"></div>`;
            navMenu.appendChild(translateLi);
        }
        
        // Append Panel to body (to avoid overflow issues in nav) or nav
        // Nav is better for positioning relative to button, but check z-index
        navContainer.appendChild(panel);
        
        // Toggle Panel Visibility
        a11yToggle.addEventListener('click', (e) => {
            // e.stopPropagation(); // Removed to allow bubbling, handled by window listener
            panel.classList.toggle('active');
            const isExpanded = panel.classList.contains('active');
            a11yToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (panel.classList.contains('active') && !panel.contains(e.target) && !a11yToggle.contains(e.target)) {
                panel.classList.remove('active');
                a11yToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panel.classList.contains('active')) {
                panel.classList.remove('active');
                a11yToggle.setAttribute('aria-expanded', 'false');
                a11yToggle.focus();
            }
        });
        
        // 3. Font Resizing Logic
        const root = document.documentElement;
        let currentSize = 16;
        const minSize = 12;
        const maxSize = 24;
        
        const updateFont = (size) => {
            currentSize = size;
            root.style.setProperty('--base-font-size', `${size}px`);
            
            // Update active state
            document.querySelectorAll('.font-btn').forEach(btn => btn.classList.remove('active'));
            if (size === 16) document.getElementById('font-reset').classList.add('active');
            else if (size < 16) document.getElementById('font-dec').classList.add('active');
            else document.getElementById('font-inc').classList.add('active');
        };
        
        document.getElementById('font-dec').addEventListener('click', () => {
            if (currentSize > minSize) updateFont(currentSize - 2);
        });
        
        document.getElementById('font-inc').addEventListener('click', () => {
            if (currentSize < maxSize) updateFont(currentSize + 2);
        });
        
        document.getElementById('font-reset').addEventListener('click', () => {
            updateFont(16);
        });
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll('.card, .timeline-item, .section-title, .hero-content, .hero-visual, .form-group, .tech-tag');
    
    elementsToAnimate.forEach((el, index) => {
        el.classList.add('reveal');
        // Add staggered delays for cards to create a wave effect
        if (el.classList.contains('card') || el.classList.contains('tech-tag')) {
             const delayClass = `reveal-delay-${(index % 3) + 1}`;
             el.classList.add(delayClass);
        }
        observer.observe(el);
    });
}

// ==================== STARTUP ====================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSharedComponents);
} else {
    loadSharedComponents();
}