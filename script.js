document.addEventListener('DOMContentLoaded', function() {
            // --- UI/UX IMPROVEMENT: ACTIVE NAVIGATION STATE ---
            const navLinks = document.querySelectorAll('nav a');
            const sections = document.querySelectorAll('[data-section]');
            const navObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        navLinks.forEach(link => {
                            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                        });
                    }
                });
            }, { rootMargin: "-50% 0px -50% 0px" });
            sections.forEach(section => navObserver.observe(section));
            
            // --- UI/UX IMPROVEMENT: SMOOTH PORTFOLIO FILTERING ---
            const filterButtons = document.querySelectorAll('.filter-btn');
            const gridItems = document.querySelectorAll('.video-card'); // Needs to be populated first
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    const filter = button.dataset.filter;
                    document.querySelectorAll('#video-grid .video-card').forEach(item => {
                        const isVisible = filter === 'all' || item.dataset.category === filter;
                        item.classList.toggle('hidden', !isVisible);
                    });
                });
            });

            // --- UI/UX IMPROVEMENT: LIGHTBOX STAGGERED ANIMATION ---
            function openLightbox(video) {
                document.getElementById('lightbox-title').textContent = video.title;
                document.getElementById('lightbox-client').textContent = video.client;
                document.getElementById('lightbox-description').textContent = video.description;
                document.getElementById('lightbox-results').textContent = video.results;
                document.getElementById('lightbox-video').src = video.videoUrl;
                document.getElementById('lightbox').classList.add('visible');
                document.body.style.overflow = 'hidden';

                const items = document.querySelectorAll('.lightbox-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 150 * (index + 1));
                });
            }

            function closeLightboxHandler() {
                const lightbox = document.getElementById('lightbox');
                lightbox.classList.remove('visible');
                document.getElementById('lightbox-video').pause();
                document.getElementById('lightbox-video').src = '';
                document.body.style.overflow = '';
                document.querySelectorAll('.lightbox-item').forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                });
            }

            // --- CORE FUNCTIONALITY (Adapted for improvements) ---
            const videoData = [
                { id: 1, category: 'short-form', title: 'Viral Reel Edit', client: 'Fashion Brand', description: 'A fast-paced, trend-driven edit for a new clothing line launch on Instagram Reels.', results: 'Achieved over 2 million views and a 300% increase in engagement in the first 48 hours.', thumbnail: 'https://placehold.co/600x400/0a0a0a/ffffff?text=Short+Form', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
                { id: 2, category: 'long-form', title: 'YouTube Documentary', client: 'Tech Startup', description: 'A 15-minute documentary detailing the founding story and vision of an innovative tech company.', results: 'Helped secure a new round of funding and was featured on major tech publications.', thumbnail: 'https://placehold.co/600x400/0a0a0a/ffffff?text=Long+Form', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
                { id: 3, category: 'gaming', title: 'Gaming Montage', client: 'eSports Team', description: 'An epic montage showcasing the team\'s best moments from a recent tournament, set to high-energy music.', results: 'Increased team channel subscriptions by 25% and was shared by top gaming influencers.', thumbnail: 'https://placehold.co/600x400/0a0a0a/ffffff?text=Gaming', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
                { id: 4, category: 'ecommerce', title: 'Product Ad', client: 'Lifestyle Gadgets', description: 'A sleek and modern ad for a new smart home device, focusing on its ease of use and benefits.', results: 'Drove a 40% increase in online sales and a 2.5x return on ad spend.', thumbnail: 'https://placehold.co/600x400/0a0a0a/ffffff?text=eCommerce', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
                { id: 5, category: 'ads', title: 'Brand Commercial', client: 'Beverage Company', description: 'A cinematic brand awareness commercial telling an emotional story to connect with the audience.', results: 'Aired on national television and led to a significant lift in brand recall.', thumbnail: 'https://placehold.co/600x400/0a0a0a/ffffff?text=Ad', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
                { id: 6, category: 'short-form', title: 'TikTok Dance Trend', client: 'Music Artist', description: 'Created a unique video edit to launch a new song and dance challenge on TikTok.', results: 'The sound was used in over 500,000 user-generated videos, propelling the song to the charts.', thumbnail: 'https://placehold.co/600x400/0a0a0a/ffffff?text=Short+Form+2', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
            ];

            const grid = document.getElementById('video-grid');
            // --- Enhanced Video Card Creation ---
            function createVideoCard(video) {
                const card = document.createElement('div');
                card.className = `video-card cursor-pointer group relative aspect-video magnetic-target`;
                card.setAttribute('data-category', video.category);
                
                card.innerHTML = `
                    <div class="relative w-full h-full overflow-hidden rounded-lg">
                        <img src="${video.thumbnail}" alt="${video.title}" 
                             class="video-thumbnail w-full h-full object-cover" 
                             onerror="this.src='https://placehold.co/600x400/0a0a0a/ffffff?text=Image+Error'">
                        
                        <div class="video-category-badge">${video.category.replace('-', ' ')}</div>
                        
                        <div class="video-play-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3"/>
                            </svg>
                        </div>
                        
                        <div class="video-overlay">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2 text-xs text-white/80">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polygon points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                                        <polyline points="17 6 23 6 23 12"/>
                                    </svg>
                                    ${Math.floor(Math.random() * 500) + 100}K views
                                </div>
                                <div class="text-xs text-white/60">
                                    ${Math.floor(Math.random() * 5) + 1} min read
                                </div>
                            </div>
                            <h3 class="text-lg font-bold text-white mb-1">${video.title}</h3>
                            <p class="text-sm text-white/80">${video.client}</p>
                        </div>
                    </div>
                `;
                
                card.addEventListener('click', () => openLightbox(video));
                return card;
            }

            // --- Mobile Menu Functionality ---
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            let isMenuOpen = false;

            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', () => {
                    isMenuOpen = !isMenuOpen;
                    if (isMenuOpen) {
                        mobileMenu.style.transform = 'translateY(0)';
                        mobileMenu.style.opacity = '1';
                        document.body.style.overflow = 'hidden';
                    } else {
                        mobileMenu.style.transform = 'translateY(-100%)';
                        mobileMenu.style.opacity = '0';
                        document.body.style.overflow = '';
                    }
                });

                // Close mobile menu when clicking on links
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.style.transform = 'translateY(-100%)';
                        mobileMenu.style.opacity = '0';
                        document.body.style.overflow = '';
                        isMenuOpen = false;
                    });
                });
            }

            // --- Header Scroll Effect ---
            const header = document.getElementById('main-header');
            let lastScrollY = window.scrollY;
            
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Hide header on scroll down, show on scroll up
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollY = currentScrollY;
            });
            videoData.forEach(video => grid.appendChild(createVideoCard(video)));
            
            document.getElementById('close-lightbox').addEventListener('click', closeLightboxHandler);
            document.getElementById('lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightboxHandler(); });
            
            // --- The rest of the setup script (loader, cursor, observers, etc.) ---
            const canvas = document.getElementById('background-canvas');
            const ctx = canvas.getContext('2d');
            let time = 0;
            let animationFrameId;
            let isInteracting = false;
            let interactionTimeout;
            function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
            function drawGrid() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = '#222';
                const gridSize = 50;
                const complexityFactor = isInteracting ? 0.01 : 0.002;
                for (let x = 0; x < canvas.width; x += gridSize) {
                    for (let y = 0; y < canvas.height; y += gridSize) {
                        const wave = Math.sin(x * complexityFactor + time) * 10 + Math.cos(y * complexityFactor + time) * 10;
                        ctx.strokeRect(x, y, gridSize + wave, gridSize + wave);
                    }
                }
            }
            function animateCanvas() {
                if (document.body.classList.contains('animations-paused')) return;
                time += 0.005;
                drawGrid();
                animationFrameId = requestAnimationFrame(animateCanvas);
            }
            function handleInteraction() {
                isInteracting = true;
                clearTimeout(interactionTimeout);
                interactionTimeout = setTimeout(() => { isInteracting = false; }, 500);
            }
            window.addEventListener('mousemove', handleInteraction);
            window.addEventListener('scroll', handleInteraction);
            const iconsContainer = document.getElementById('floating-icons-container');
            const icons = ['🎬', '✂️', '🎞️', '📹', '🎨', '⚡'];
            for (let i = 0; i < 10; i++) {
                const iconEl = document.createElement('div');
                iconEl.classList.add('floating-icon');
                iconEl.textContent = icons[Math.floor(Math.random() * icons.length)];
                iconEl.style.top = `${Math.random() * 100}vh`;
                iconEl.style.left = `${Math.random() * 100}vw`;
                iconEl.style.animationDuration = `${Math.random() * 15 + 15}s`;
                iconEl.style.animationDelay = `${Math.random() * 5}s`;
                iconsContainer.appendChild(iconEl);
            }
            const heroGradient = document.getElementById('hero-gradient-bg');
            document.addEventListener('mousemove', e => { heroGradient.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 20%)`; });
            const scrollProgress = document.getElementById('scroll-progress');
            window.addEventListener('scroll', () => { scrollProgress.style.width = `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`; });
            resizeCanvas();
            animateCanvas();
            window.addEventListener('resize', resizeCanvas);
            const accessibilityToggle = document.getElementById('accessibility-toggle');
            const playIcon = document.getElementById('play-icon');
            const pauseIcon = document.getElementById('pause-icon');
            accessibilityToggle.addEventListener('click', () => {
                const isPaused = document.body.classList.toggle('animations-paused');
                if (isPaused) { cancelAnimationFrame(animationFrameId); playIcon.style.display = 'block'; pauseIcon.style.display = 'none'; } 
                else { animateCanvas(); playIcon.style.display = 'none'; pauseIcon.style.display = 'block'; }
            });
            const loader = document.getElementById('loader');
            const progress = document.getElementById('progress');
            const progressInterval = setInterval(() => {
                const currentWidth = parseFloat(progress.style.width) || 0;
                if (currentWidth < 100) progress.style.width = `${currentWidth + 20}%`;
            }, 100);
            window.onload = () => {
                clearInterval(progressInterval);
                progress.style.width = '100%';
                setTimeout(() => loader.classList.add('hidden'), 500);
            };
            const cursor = document.getElementById('custom-cursor');
            const magneticTargets = document.querySelectorAll('.magnetic-target');
            document.addEventListener('mousemove', (e) => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
            magneticTargets.forEach(target => {
                target.addEventListener('mouseenter', () => cursor.classList.add('magnetic'));
                target.addEventListener('mouseleave', () => cursor.classList.remove('magnetic'));
            });
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) { entry.target.classList.add('animated'); observer.unobserve(entry.target); }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
            const staggerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const children = entry.target.children;
                        for (let i = 0; i < children.length; i++) {
                            setTimeout(() => { if (children[i]) { children[i].style.opacity = '1'; children[i].style.transform = 'translateY(0)'; } }, i * 150);
                        }
                        staggerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('[data-animate-stagger]').forEach(el => staggerObserver.observe(el));
            document.getElementById('year').textContent = new Date().getFullYear();
        });