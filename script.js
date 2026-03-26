// ==================== DATA CONFIGURATION ====================
const portfolioData = {
    experience: [
        {
            title: "Software Developer",
            company: "PPFAS",
            period: "Oct 2024 - Present",
            description: "Building business-critical websites, portals, payments, and internal systems at PPFAS using Laravel, React, PHP, WordPress, AWS, and CI/CD-driven deployment workflows, with added design support through Figma and Photoshop.",
            achievements: [
                "Built and launched gift.ppfas.com and wealth.ppfas.com",
                "Created a management portal for amc.ppfas.com, including backend-managed website workflows, job portal features, and related internal portals",
                "Saved 20+ lakh in fixed costs by building static pages and management portals that reduced dependency on the tech team",
                "Saved 10+ lakh in annual recurring cost by building QR scanning and door list portals",
                "Built the payment gateway flow for PPFAS Gift, including international payment support, plus a compliance and QC backend portal for uploads and staff management",
                "Designed email templates and website layouts in Figma and Photoshop before implementation"
            ]
        },
        {
            title: "Professional Software Developer",
            company: "Akbar Travels",
            period: "Feb 2024 - Sep 2024",
            description: "Professional software developer with a strong web development focus, centered on JavaScript and practical full-stack delivery across React, Express, Node.js, MongoDB, MySQL, Firebase, and Java.",
            achievements: [
                "Developed and maintained 10+ web applications using the MERN stack",
                "Completed 15+ projects across web, real-time, data, and social-impact use cases",
                "Built a strong self-learning foundation with JavaScript as the core skill"
            ]
        },
        {
            title: "Data Analyst and Billing",
            company: "Mansha Distributors LLP",
            period: "Jun 2021 - May 2022",
            description: "Handled pricing, billing, and sales support analysis to improve business decisions and operational performance.",
            achievements: [
                "Implemented pricing strategies that increased net profit by 150%",
                "Improved profit from INR 100,000 to INR 250,000",
                "Managed product suggestions and sales-force optimization"
            ]
        },
        {
            title: "Android Developer",
            company: "StayVibez",
            period: "Oct 2020 - Feb 2021",
            description: "Worked in a small delivery team to build an Android application under tight timelines while balancing client needs and feature priorities.",
            achievements: [
                "Led a team of 4 developers on the Android app delivery",
                "Contributed to a 15% increase in client referrals",
                "Improved teamwork, delivery focus, and client communication"
            ]
        },
        {
            title: "Technology Associate",
            company: "Student and Project Roles",
            period: "Earlier Experience",
            description: "Built a foundation across software development, analytics, collaboration, and leadership through academic and project-based work.",
            achievements: [
                "Completed 15+ academic and practical projects",
                "Developed leadership through fest, NSS, and coaching responsibilities",
                "Built strong communication and presentation skills"
            ]
        }
    ],

    projects: [
        {
            title: "BookNook",
            description: "MERN e-commerce application for books with browsing, product details, purchasing flow, admin panel, and Firebase authentication.",
            fullDescription: "BookNook is a MERN e-commerce project built around books and user purchase flow. It includes user browsing, product exploration, admin functionality, and Firebase authentication to support a more complete real-world application structure.",
            technologies: ["React", "Node.js", "MongoDB", "Firebase"],
            category: "E-Commerce",
            link: "https://github.com/josejoy2216/Ecommerce",
            features: [
                "Book browsing and product details",
                "Purchase flow and admin panel",
                "Firebase authentication",
                "MERN-based application structure"
            ]
        },
        {
            title: "Mafia - Game",
            description: "Real-time multiplayer Mafia game with cross-device join flow, unique game code, role assignment, night and day phases, voting, and win conditions.",
            fullDescription: "Mafia - Game is a real-time multiplayer experience focused on coordinated session flow, role assignment, voting mechanics, and cross-device participation. It reflects strong JavaScript-centered problem solving in interactive application design.",
            technologies: ["React", "Node.js", "MongoDB", "Real-Time Logic"],
            category: "Real-Time App",
            link: "https://github.com/josejoy2216/mafia/",
            features: [
                "Cross-device room join with unique game code",
                "Role assignment and night/day phases",
                "Voting and win-condition logic",
                "Real-time multiplayer coordination"
            ]
        },
        {
            title: "UNO - Game",
            description: "Backend server for a multiplayer UNO card game built with Node.js, Express, and MongoDB.",
            fullDescription: "UNO - Game focuses on backend multiplayer logic using Node.js, Express, and MongoDB. It demonstrates server-side game coordination, state handling, and full-stack readiness for interactive products.",
            technologies: ["Node.js", "Express", "MongoDB", "Game Backend"],
            category: "Backend System",
            link: "https://github.com/josejoy2216/UNO-GAME",
            features: [
                "Multiplayer backend architecture",
                "Server-side game state handling",
                "Node and Express API implementation",
                "MongoDB-powered persistence"
            ]
        },
        {
            title: "Movie Recommendation System",
            description: "Content-based movie recommender with similar-title discovery and sentiment analysis on user reviews.",
            fullDescription: "Movie Recommendation System combines recommendation logic with sentiment analysis to help users discover similar movies and evaluate audience response. It highlights practical data-driven development beyond standard CRUD applications.",
            technologies: ["Python", "Recommendation Engine", "Sentiment Analysis", "Web App"],
            category: "Data Project",
            link: "https://josejoy2216.github.io/Movie-Recommendation-System-with-Sentiment-Analysis",
            features: [
                "Content-based recommendation flow",
                "Sentiment analysis on reviews",
                "Interactive discovery experience",
                "Applied Python and data-processing logic"
            ]
        },
        {
            title: "Library Management System",
            description: "Web application to manage a library inventory with a simple management workflow.",
            fullDescription: "Library Management System is a web application focused on organizing and managing a library's inventory efficiently. It reflects practical CRUD-oriented application development with a clean workflow-driven interface.",
            technologies: ["HTML", "CSS", "JavaScript", "Web App"],
            category: "Management System",
            link: "https://josejoy2216.github.io/library-management-system/",
            features: [
                "Library inventory management workflow",
                "Browser-based interface",
                "Practical CRUD-style interaction",
                "Project focused on usability and organization"
            ]
        },
        {
            title: "Taskify",
            description: "To-do list application with add, complete, edit, delete, and search features.",
            fullDescription: "Taskify is a clean productivity-oriented to-do list app built with HTML, CSS, and JavaScript. It focuses on usability, state changes, and day-to-day interaction patterns common in frontend development.",
            technologies: ["HTML", "CSS", "JavaScript"],
            category: "Productivity App",
            link: "https://josejoy2216.github.io/Taskify/",
            features: [
                "Add and manage tasks",
                "Edit, complete, and delete actions",
                "Search functionality",
                "Clean frontend-focused implementation"
            ]
        },
        {
            title: "Portfolio - vCard",
            description: "Fully responsive personal portfolio website built with HTML, CSS, and JavaScript.",
            fullDescription: "Portfolio - vCard is a responsive personal portfolio project that showcases profile, skills, projects, and contact information in a compact presentation format. It demonstrates frontend design and implementation capability.",
            technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
            category: "Portfolio",
            link: "https://josejoy2216.github.io/vCard-Personal-Portfolio/",
            features: [
                "Responsive portfolio layout",
                "Profile, skills, and project showcase",
                "Frontend implementation with vanilla web stack",
                "Design-focused personal branding"
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

const resumeBuilderData = {
    name: "Jose Chacko",
    role: "Software Developer | Full Stack Developer | React | Laravel | PHP | JavaScript",
    phone: "7977017155",
    email: "josejoy2216@gmail.com",
    location: "Mumbai, Maharashtra, India",
    portfolio: "https://www.josechacko.com",
    github: "https://github.com/josejoy2216",
    linkedin: "https://www.linkedin.com/in/josejoychacko/",
    summary: "Software Developer with experience building production websites, payment workflows, admin portals, and internal systems using Laravel, React, PHP, JavaScript, WordPress, AWS, and CI/CD. Delivered measurable cost savings through practical full-stack execution.",
    skills: {
        languages: ["JavaScript", "PHP", "Java", "Python", "C#", "C", "C++"],
        frontend: ["HTML", "CSS", "Bootstrap", "React", "Next.js", "Material UI"],
        backend: ["Laravel", "Node.js", "Express", "WordPress", "PHP"],
        databases: ["MongoDB", "MySQL", "Firebase"],
        tools: ["AWS", "Git", "GitHub", "CI/CD", "Figma", "Photoshop", "Microsoft Office"],
        focus: ["Payment Workflows", "Internal Portals", "Admin Systems", "Responsive Web Apps", "Website Management Systems"]
    },
    education: [
        {
            degree: "Master of Computer Application",
            institution: "Thakur Institute of Management Studies, Career Development & Research (TIMSCDR)",
            year: "2022 – 2024",
            marks: "CGPA: 7.83 / 10"
        },
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "Thakur Ramnarayan College of Arts & Commerce",
            year: "2018 – 2021",
            marks: "CGPA: 8.65 / 10"
        }
    ],
    certifications: [
        "NISM Series V-A Certification",
        "Google Data Analytics - Coursera / Google",
        "Google Cloud (2022) - Google",
        "Programming using JavaScript (2020) - Microsoft",
        "Programming in Java - NPTEL",
        "Cross-Platform Mobile App Development - Microsoft",
        "Java Certification and RDBMS PostgreSQL - Spoken Tutorial Project at IIT Bombay"
    ]
};

const RESUME_STORAGE_KEY = 'jose_resume_builder_html_v2';
const RESUME_PRINT_WINDOW_TITLE = 'Jose Chacko Resume';

const WEB3FORMS_ACCESS_KEY = 'b32e8fe7-712e-401a-820b-9b5b09b93e59';

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
    const previewItems = portfolioData.experience.slice(0, 3);
    
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
                                    <button class="btn-outline" onclick="window.open('${project.link}', '_blank', 'noopener')">View Project</button>
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
    const projectPreviewOrder = ["BookNook", "Mafia - Game", "UNO - Game", "Movie Recommendation System"];
    const previewProjects = projectPreviewOrder
        .map((title) => portfolioData.projects.find((project) => project.title === title))
        .slice(0, 3)
        .filter(Boolean);
    
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

function getResumeExperience() {
    const experiencePriority = ["PPFAS", "Akbar Travels", "Mansha Distributors LLP", "StayVibez"];
    const experienceBullets = {
        PPFAS: [
            "Built and launched gift.ppfas.com and wealth.ppfas.com, along with management workflows for amc.ppfas.com",
            "Reduced business costs by 20+ lakh in fixed spend and 10+ lakh in annual recurring spend through internal portals and operational tools"
        ],
        "Akbar Travels": [
            "Developed and maintained 10+ full-stack web applications using React, Node.js, Express, MongoDB, MySQL, and Firebase",
            "Delivered projects across web, real-time, and data-driven use cases with a strong JavaScript-led development focus"
        ],
        "Mansha Distributors LLP": [
            "Implemented pricing strategies that increased net profit by 150%, improving profit from INR 100,000 to INR 250,000",
            "Handled billing analysis, product suggestions, and sales-force optimization to support better business decisions"
        ],
        StayVibez: [
            "Led a team of 4 developers to deliver an Android application under tight timelines",
            "Contributed to a 15% increase in client referrals through timely delivery and client coordination"
        ]
    };

    const selectedExperience = experiencePriority
        .map((company) => portfolioData.experience.find((exp) => exp.company === company))
        .filter(Boolean);

    return selectedExperience.map((exp) => `
        <div class="resume-job">
            <div class="resume-row">
                <h3>${exp.company}</h3>
                <span>${exp.period}</span>
            </div>
            <div class="resume-row resume-subrow">
                <p>${exp.title}</p>
                <p>${exp.company === 'PPFAS' ? 'Mumbai, India' : ''}</p>
            </div>
            <p class="resume-job-summary">${exp.description}</p>
            <ul class="resume-list">
                ${experienceBullets[exp.company].map((achievement) => `<li>${achievement}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function getResumeProjects() {
    const projectPriority = ["BookNook", "Mafia - Game", "Movie Recommendation System", "UNO - Game"];
    const projectBullets = {
        BookNook: [
            "Built a MERN-based e-commerce application with product browsing, purchase flow, admin panel, and Firebase authentication",
            "Demonstrated full-stack architecture, user workflow design, and admin-side functionality"
        ],
        "Mafia - Game": [
            "Built a real-time multiplayer game with room join flow, role assignment, voting, and win-condition logic",
            "Showcased JavaScript-heavy problem solving for session coordination and interactive user flows"
        ],
        "Movie Recommendation System": [
            "Developed a content-based movie recommendation system using Python and sentiment analysis",
            "Built an interactive discovery flow for similar-title recommendations and review-based insights"
        ],
        "UNO - Game": [
            "Built a multiplayer backend server with Node.js, Express, and MongoDB for game-state handling",
            "Demonstrated backend API design, state coordination, and interactive system logic"
        ]
    };
    const selectedProjects = projectPriority
        .map((title) => portfolioData.projects.find((project) => project.title === title))
        .filter(Boolean);

    return selectedProjects.map((project) => `
        <div class="resume-project">
            <div class="resume-row">
                <h3>${project.title}</h3>
                <span>${project.category}</span>
            </div>
            <p class="resume-project-tech"><strong>Tech:</strong> ${project.technologies.join(', ')}</p>
            <ul class="resume-list">
                ${projectBullets[project.title].map((feature) => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function buildResumeDraft() {
    return `
        <article class="resume-document" id="resumePreviewDocument" contenteditable="true" spellcheck="false">
            <header class="resume-header">
                <h1>${resumeBuilderData.name}</h1>
                <p class="resume-role">${resumeBuilderData.role}</p>
                <p class="resume-contact">
                    ${resumeBuilderData.location} |
                    <a href="tel:${resumeBuilderData.phone}">${resumeBuilderData.phone}</a> |
                    <a href="mailto:${resumeBuilderData.email}">${resumeBuilderData.email}</a>
                </p>
                <p class="resume-contact">
                    <a href="${resumeBuilderData.portfolio}" target="_blank" rel="noopener noreferrer">${resumeBuilderData.portfolio}</a> |
                    <a href="${resumeBuilderData.github}" target="_blank" rel="noopener noreferrer">${resumeBuilderData.github}</a> |
                    <a href="${resumeBuilderData.linkedin}" target="_blank" rel="noopener noreferrer">${resumeBuilderData.linkedin}</a>
                </p>
            </header>

            <section class="resume-section">
                <h2>Professional Summary</h2>
                <p>${resumeBuilderData.summary}</p>
            </section>

            <section class="resume-section">
                <h2>Professional Experience</h2>
                ${getResumeExperience()}
            </section>

            <section class="resume-section">
                <h2>Technical Skills</h2>
                <p><strong>Languages:</strong> JavaScript, PHP, Java, Python</p>
                <p><strong>Frontend:</strong> HTML, CSS, Bootstrap, React, Next.js</p>
                <p><strong>Backend:</strong> Laravel, Node.js, Express, WordPress</p>
                <p><strong>Databases & Tools:</strong> MongoDB, MySQL, Firebase, AWS, Git, CI/CD, Figma, Photoshop</p>
            </section>

            <section class="resume-section">
                <h2>Selected Projects</h2>
                ${getResumeProjects()}
            </section>

            <section class="resume-section">
                <h2>Education</h2>
                <div class="resume-education-list">
                    ${resumeBuilderData.education.map((item) => `
                        <div class="resume-education">
                            <div class="resume-education-main">
                                <p><strong>${item.degree}</strong></p>
                                <p>${item.institution}</p>
                            </div>
                            <div class="resume-education-meta">
                                <p><strong>${item.year}</strong></p>
                                <p>${item.marks}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="resume-section">
                <h2>Certifications</h2>
                <ul class="resume-list">
                    ${resumeBuilderData.certifications.map((item) => `<li>${item}</li>`).join('')}
                </ul>
            </section>
        </article>
    `;
}

function renderResumeBuilder() {
    return `
        <div class="resume-builder-layout">
            <aside class="card p-4 resume-builder-panel no-print">
                <h2 style="margin-bottom: 1rem;">Resume Controls</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                    The draft below is generated from your portfolio data. Edit the preview directly, then export it as PDF.
                </p>
                <div class="resume-builder-actions">
                    <button id="resumeResetBtn" class="btn-secondary" type="button">Reset Draft</button>
                    <button id="resumeCopyBtn" class="btn-secondary" type="button">Copy Text</button>
                    <button id="resumePrintBtn" class="btn-primary" type="button">Download PDF</button>
                </div>
                <div class="card p-4 resume-builder-note">
                    <h3 style="margin-bottom: 0.75rem;">How it works</h3>
                    <ul class="resume-list compact">
                        <li>Edit any text directly inside the resume preview.</li>
                        <li>Use the Download PDF button and select Save as PDF in the print dialog.</li>
                        <li>For ATS safety, keep the final PDF text-based and avoid adding graphics.</li>
                    </ul>
                </div>
                <p id="resumeBuilderStatus" class="resume-builder-status">Draft loaded from portfolio data.</p>
            </aside>

            <div class="resume-preview-shell">
                <div class="resume-preview-toolbar no-print">
                    <span>Editable ATS Resume Preview</span>
                    <span>Changes auto-save in this browser</span>
                </div>
                <div id="resumePreviewMount" class="resume-preview-stage"></div>
            </div>
        </div>
    `;
}

function addHyperlinksToResumeHtml(html) {
    const container = document.createElement('div');
    container.innerHTML = html;

    const urlPattern = /(https?:\/\/[^\s|<]+)/g;
    const emailPattern = /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

    const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if (!text || (!urlPattern.test(text) && !emailPattern.test(text))) {
                urlPattern.lastIndex = 0;
                emailPattern.lastIndex = 0;
                return;
            }

            urlPattern.lastIndex = 0;
            emailPattern.lastIndex = 0;

            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            const combinedPattern = /(https?:\/\/[^\s|<]+)|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;
            let match;

            while ((match = combinedPattern.exec(text)) !== null) {
                const start = match.index;
                const value = match[0];

                if (start > lastIndex) {
                    fragment.appendChild(document.createTextNode(text.slice(lastIndex, start)));
                }

                const anchor = document.createElement('a');
                anchor.textContent = value;
                anchor.href = value.includes('@') && !value.startsWith('http') ? `mailto:${value}` : value;
                fragment.appendChild(anchor);
                lastIndex = start + value.length;
            }

            if (lastIndex < text.length) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
            }

            node.parentNode.replaceChild(fragment, node);
            return;
        }

        if (node.nodeType !== Node.ELEMENT_NODE || node.tagName === 'A') {
            return;
        }

        Array.from(node.childNodes).forEach(walk);
    };

    Array.from(container.childNodes).forEach(walk);
    return container.innerHTML;
}

function initializeResumeBuilder() {
    const resumeMount = document.getElementById('resumePreviewMount');
    const status = document.getElementById('resumeBuilderStatus');
    const resetBtn = document.getElementById('resumeResetBtn');
    const copyBtn = document.getElementById('resumeCopyBtn');
    const printBtn = document.getElementById('resumePrintBtn');

    if (!resumeMount) return;

    const renderDraft = (html) => {
        resumeMount.innerHTML = html;
        const doc = document.getElementById('resumePreviewDocument');
        if (!doc) return;

        doc.addEventListener('input', () => {
            localStorage.setItem(RESUME_STORAGE_KEY, doc.outerHTML);
            if (status) status.textContent = 'Draft saved locally.';
        });
    };

    const savedDraft = localStorage.getItem(RESUME_STORAGE_KEY);
    renderDraft(savedDraft || buildResumeDraft());

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            localStorage.removeItem(RESUME_STORAGE_KEY);
            renderDraft(buildResumeDraft());
            if (status) status.textContent = 'Draft reset to portfolio version.';
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const doc = document.getElementById('resumePreviewDocument');
            if (!doc) return;

            try {
                await navigator.clipboard.writeText(doc.innerText);
                if (status) status.textContent = 'Resume text copied to clipboard.';
            } catch (error) {
                if (status) status.textContent = 'Clipboard copy failed in this browser.';
            }
        });
    }

    if (printBtn) {
        printBtn.addEventListener('click', () => {
            const doc = document.getElementById('resumePreviewDocument');
            if (!doc) return;

            const printWindow = window.open('', '_blank', 'width=1024,height=900');
            if (!printWindow) {
                if (status) status.textContent = 'Pop-up blocked. Allow pop-ups and try again.';
                return;
            }

            const printMarkup = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${RESUME_PRINT_WINDOW_TITLE}</title>
    <style>
        :root {
            color-scheme: light;
        }

        * {
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            background: #f3f4f6;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #111827;
        }

        body {
            padding: 24px;
        }

        .print-shell {
            display: flex;
            justify-content: center;
        }

        .resume-document {
            width: 210mm;
            max-width: 210mm;
            min-height: 297mm;
            background: #ffffff;
            color: #111827;
            border-radius: 0;
            padding: 1.4rem 2rem 1.6rem;
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
            border: 1px solid #3f3f46;
            line-height: 1.25;
            font-family: Georgia, "Times New Roman", serif;
        }

        .resume-header {
            border-bottom: 1px solid #3f3f46;
            padding-bottom: 0.3rem;
            margin-bottom: 0.7rem;
            text-align: center;
        }

        .resume-header h1 {
            font-size: 2.1rem;
            line-height: 1;
            margin: 0 0 0.1rem;
            font-weight: 500;
            letter-spacing: 0.01em;
        }

        .resume-role {
            font-weight: 600;
            margin: 0 0 0.12rem;
            line-height: 1.2;
            font-size: 0.88rem;
            font-family: Arial, Helvetica, sans-serif;
        }

        .resume-contact {
            font-size: 0.82rem;
            color: #111827;
            margin: 0;
            line-height: 1.15;
            font-family: Arial, Helvetica, sans-serif;
        }

        a {
            color: inherit;
            text-decoration: underline;
            text-underline-offset: 0.12em;
        }

        .resume-section {
            margin-bottom: 0.65rem;
        }

        .resume-section h2 {
            font-size: 0.95rem;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            border-bottom: 1px solid #3f3f46;
            padding-bottom: 0.08rem;
            margin: 0 0 0.18rem;
            font-variant: small-caps;
            font-weight: 500;
        }

        .resume-section p {
            margin: 0 0 0.08rem;
        }

        .resume-row {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            align-items: baseline;
        }

        .resume-row h3 {
            font-size: 0.98rem;
            margin: 0;
            font-weight: 700;
        }

        .resume-row span {
            font-size: 0.92rem;
            color: #111827;
            white-space: nowrap;
        }

        .resume-subrow p {
            color: #111827;
            font-size: 0.9rem;
            font-style: italic;
            margin: 0;
        }

        .resume-job,
        .resume-project,
        .resume-education {
            margin-bottom: 0.42rem;
        }

        .resume-education-list {
            display: flex;
            flex-direction: column;
            gap: 0.12rem;
        }

        .resume-education {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 0.55rem;
            margin-bottom: 0.22rem;
        }

        .resume-education-main {
            flex: 1;
            min-width: 0;
        }

        .resume-education p {
            margin: 0;
        }

        .resume-education p + p {
            margin-top: 0;
        }

        .resume-education-meta {
            color: #111827;
            font-size: 0.84rem;
            text-align: right;
            flex-shrink: 0;
            line-height: 1.05;
            font-style: italic;
        }

        .resume-job-summary,
        .resume-project-tech {
            margin-top: 0.08rem;
        }

        .resume-list {
            list-style: none;
            padding-left: 1.05rem;
            margin: 0.08rem 0 0;
        }

        .resume-list li {
            margin-bottom: 0.12rem;
            position: relative;
        }

        .resume-list li::before {
            content: "-";
            position: absolute;
            left: -0.8rem;
        }

        .resume-section:last-child .resume-list {
            margin-top: 0.02rem;
        }

        .resume-section:last-child .resume-list li {
            margin-bottom: 0.05rem;
            line-height: 1.08;
        }

        @page {
            size: A4;
            margin: 0;
        }

        @media print {
            html,
            body {
                background: #ffffff;
            }

            body {
                padding: 0;
            }

            .resume-document {
                width: 210mm;
                max-width: 210mm;
                min-height: 297mm;
                margin: 0;
                border: none;
                border-radius: 0;
                box-shadow: none;
                padding: 8mm 10mm;
            }

            .resume-section {
                break-inside: auto;
            }

            .resume-section h2,
            .resume-row {
                break-after: avoid;
            }

            .resume-project,
            .resume-job,
            .resume-education {
                break-inside: auto;
            }

            .resume-list li {
                break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="print-shell">
        ${addHyperlinksToResumeHtml(doc.outerHTML.replace(' contenteditable="true"', ''))}
    </div>
</body>
</html>`;

            printWindow.document.open();
            printWindow.document.write(printMarkup);
            printWindow.document.close();
            printWindow.focus();

            const triggerPrint = () => {
                setTimeout(() => {
                    printWindow.print();
                }, 200);
            };

            if (printWindow.document.readyState === 'complete') {
                triggerPrint();
            } else {
                printWindow.onload = triggerPrint;
            }

            printWindow.onafterprint = () => {
                printWindow.close();
            };
            if (status) status.textContent = 'Opened print-ready resume. Choose Save as PDF.';
        });
    }
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

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    let result = form.querySelector('.form-result');

    if (!result) {
        result = document.createElement('div');
        result.className = 'form-result';
        result.style.marginTop = '1rem';
        result.style.fontSize = '0.95rem';
        result.style.color = 'var(--text-secondary)';
        form.appendChild(result);
    }

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    result.textContent = 'Sending...';
    result.style.color = 'var(--text-secondary)';

    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('from_name', 'Jose Chacko Portfolio');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                throw new Error(data.message || 'Something went wrong');
            }

            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            result.textContent = 'Form submitted successfully.';
            result.style.color = '#10b981';
            form.reset();
        })
        .catch(error => {
            submitBtn.textContent = originalText;
            result.textContent = error.message || 'Network error. Try again.';
            result.style.color = '#ef4444';
        })
        .finally(() => {
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        });
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
    
    // const blogPreview = document.getElementById('blogs-preview-container');
    // if (blogPreview) blogPreview.innerHTML = renderBlogsPreview();
    
    // Full Pages
    const expContainer = document.getElementById('experience-container');
    if (expContainer) expContainer.innerHTML = renderExperience();

    const projContainer = document.getElementById('projects-container');
    if (projContainer) projContainer.innerHTML = renderProjects();

    // const blogContainer = document.getElementById('blog-container');
    // if (blogContainer) blogContainer.innerHTML = renderBlogs();

    const resumeBuilderContainer = document.getElementById('resume-builder-container');
    if (resumeBuilderContainer) resumeBuilderContainer.innerHTML = renderResumeBuilder();

    // 3. Setup Effects & Listeners
    createParticles();
    attachEventListeners();
    initializeResumeBuilder();
    
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
    if (!document.body.classList.contains('resume-builder-page') && !document.querySelector('.skip-link')) {
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
