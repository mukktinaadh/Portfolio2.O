document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Reveals (Hero section)
    setTimeout(() => {
        document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
            // Only add active if it's in the hero section for initial load
            if (el.closest('#hero')) {
                el.classList.add('active');
            }
        });

        // Start typing animation after reveals
        setTimeout(typeWriter, 800);
    }, 100);

    // 2. Typewriter Effect
    const taglineText = "Building production-grade AI systems and distributed infrastructure. 25+ projects, published research, 700+ LeetCode problems solved.";
    const typewriterElement = document.getElementById('typewriter');
    let i = 0;
    let typingSpeed = 30; // ms per character

    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';

    function typeWriter() {
        if (i < taglineText.length) {
            typewriterElement.textContent += taglineText.charAt(i);
            // Re-append cursor
            typewriterElement.appendChild(cursor);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // 3. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Scroll Reveal Observer for other sections
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        if (!el.closest('#hero')) {
            revealObserver.observe(el);
        }
    });

    // 5. Global copy email utility
    window.copyEmail = function (event) {
        if (event) event.preventDefault();
        const email = "mukktinaadhraghavarapu@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        });
    }

    // 6. Other Projects Rendering and Filtering
    const otherProjects = [
        { title: "Federated_Medical_Imaging", category: "ai" },
        { title: "Synthetic_Data_Generation_GAN", category: "ai" },
        { title: "Graph_anamoly_detectio_GNN", category: "ai" },
        { title: "Active_Learning_Pipeline", category: "ai" },
        { title: "Geospatial_Crime_Prediction", category: "ai" },
        { title: "Multivariate_Anomaly_LSTM_VAE", category: "ai" },
        { title: "Explainable_AI_dashboardd", category: "ai" },
        { title: "cricket_player_tracking", category: "ai" },
        { title: "duality-ai-object-detection", category: "ai" },
        { title: "Time_series_forecasting", category: "ai" },
        { title: "stock_sentiment_analysis", category: "ai" },
        { title: "customer_churn_prediction", category: "ai" },
        { title: "NLP_text_classification", category: "ai" },
        { title: "Recommendation_system", category: "ai" },
        { title: "Anamoly_detection", category: "ai" },
        { title: "feature_engineering_pipeline", category: "ai" },
        { title: "AB_testing_framework", category: "backend" },
        { title: "spring-cicd", category: "backend" },
        { title: "SecureVaultChain", category: "blockchain" },
        { title: "CDataDB", category: "backend" },
        { title: "MiniChain", category: "blockchain" },
        { title: "megha-journe", category: "backend" },
        { title: "BOOKXPERT", category: "backend" },
        { title: "VoteChainX", category: "blockchain" }
    ];

    const projectsListContainer = document.getElementById('projects-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderProjects(filterCategory) {
        if (!projectsListContainer) return;

        projectsListContainer.innerHTML = '';

        const filtered = filterCategory === 'all'
            ? otherProjects
            : otherProjects.filter(p => p.category === filterCategory);

        filtered.forEach(project => {
            const el = document.createElement('div');
            el.className = 'list-item fade-in';

            // Format nice title
            const cleanTitle = project.title.replace(/_/g, ' ');

            // Format category nice name
            const catNames = {
                'ai': 'AI / ML',
                'backend': 'Backend / DevOps',
                'blockchain': 'Blockchain'
            };

            el.innerHTML = `
                <span class="list-item-title">${cleanTitle}</span>
                <span class="list-item-category">${catNames[project.category] || 'Other'}</span>
            `;
            projectsListContainer.appendChild(el);
        });
    }

    if (projectsListContainer) {
        renderProjects('all');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Render based on data-filter attribute
                const filter = e.target.getAttribute('data-filter');

                // Add tiny visual delay for transition
                projectsListContainer.style.opacity = '0';
                setTimeout(() => {
                    renderProjects(filter);
                    projectsListContainer.style.opacity = '1';
                }, 200);
            });
        });

        // Setup transition for projects list container
        projectsListContainer.style.transition = 'opacity 0.2s ease';
    }
});
