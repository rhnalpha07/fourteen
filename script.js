// ===== CONFIGURATION =====
const CONFIG = {
    hearts: {
        spawnInterval: 3500, // Increased from 2000 (optimized for performance)
        emojis: ['❤️', '💕', '💖', '💗', '💓', '💝'],
        minSize: 20,
        maxSize: 40
    },
    sparkles: {
        count: 12, // Reduced from 25 (still looks great)
        spawnInterval: 150,
        minDelay: 0,
        maxDelay: 2000
    }
};

// ===== HEARTS PARTICLE SYSTEM =====
class HeartsSystem {
    constructor() {
        this.container = document.getElementById('hearts-container');
        this.pool = [];
        this.maxPoolSize = 15;
        this.init();
    }

    init() {
        // Pre-create pool of heart elements
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.display = 'none';
            this.container.appendChild(heart);
            this.pool.push(heart);
        }

        // Create initial hearts
        this.createHeart();

        // Set recurring heart generation
        setInterval(() => {
            this.createHeart();
        }, CONFIG.hearts.spawnInterval);
    }

    getHeart() {
        for (let heart of this.pool) {
            if (heart.style.display === 'none') {
                return heart;
            }
        }
        if (this.pool.length < this.maxPoolSize) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            this.container.appendChild(heart);
            this.pool.push(heart);
            return heart;
        }
        return this.pool[0];
    }

    createHeart() {
        const heart = this.getHeart();

        // Random emoji from the array
        const randomEmoji = CONFIG.hearts.emojis[
            Math.floor(Math.random() * CONFIG.hearts.emojis.length)
        ];
        heart.textContent = randomEmoji;

        // Random size
        const size = CONFIG.hearts.minSize +
            Math.random() * (CONFIG.hearts.maxSize - CONFIG.hearts.minSize);
        heart.style.fontSize = `${size}px`;

        // Random horizontal position
        const startX = Math.random() * 100;
        heart.style.left = `${startX}%`;
        heart.style.bottom = '0';

        // Random drift for natural movement
        const drift = (Math.random() - 0.5) * 60; // -30vw to +30vw
        heart.style.setProperty('--drift-x', `${drift}px`);

        // Random animation duration for variety
        const duration = 5 + Math.random() * 3; // 5-8 seconds
        heart.style.animationDuration = `${duration}s`;

        heart.style.display = 'block';

        // Hide heart after animation completes
        setTimeout(() => {
            heart.style.display = 'none';
        }, duration * 1000);
    }
}

// ===== SPARKLES SYSTEM =====
class SparklesSystem {
    constructor() {
        this.container = document.getElementById('sparkles-container');
        this.bouquetElement = document.querySelector('.bouquet-container');
        this.init();
    }

    init() {
        if (!this.bouquetElement) return;

        // Create sparkles around the bouquet
        for (let i = 0; i < CONFIG.sparkles.count; i++) {
            setTimeout(() => {
                this.createSparkle();
            }, Math.random() * CONFIG.sparkles.maxDelay);
        }
    }

    createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        // Get bouquet position
        const rect = this.bouquetElement.getBoundingClientRect();
        const bouquetCenterX = rect.left + rect.width / 2;
        const bouquetCenterY = rect.top + rect.height / 2;

        // Random position around bouquet
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 150; // 100-250px from center
        const x = bouquetCenterX + Math.cos(angle) * distance;
        const y = bouquetCenterY + Math.sin(angle) * distance;

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        // Random animation delay and duration
        const delay = Math.random() * 2;
        const duration = 1 + Math.random() * 2; // 1-3 seconds
        sparkle.style.animationDelay = `${delay}s`;
        sparkle.style.animationDuration = `${duration}s`;

        this.container.appendChild(sparkle);

        // Recreate sparkle after it disappears
        setTimeout(() => {
            this.container.removeChild(sparkle);
            this.createSparkle();
        }, (delay + duration) * 1000);
    }
}

// ===== INTERACTIVE BOUQUET =====
class InteractiveBouquet {
    constructor() {
        this.bouquetElement = document.querySelector('.bouquet-container');
        this.init();
    }

    init() {
        if (!this.bouquetElement) return;

        // Add click/touch interaction
        this.bouquetElement.addEventListener('click', () => {
            this.createBurst();
        });

        // Add touch support for mobile
        this.bouquetElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.createBurst();
        });
    }

    createBurst() {
        const heartsContainer = document.getElementById('hearts-container');
        const rect = this.bouquetElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create 8 hearts in a burst pattern
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = CONFIG.hearts.emojis[
                Math.floor(Math.random() * CONFIG.hearts.emojis.length)
            ];
            heart.style.fontSize = '28px';

            // Position at bouquet center
            heart.style.left = `${centerX}px`;
            heart.style.top = `${centerY}px`;

            // Calculate burst direction
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;

            heart.style.setProperty('--drift-x', `${targetX}px`);
            heart.style.animationDuration = '2s';

            heartsContainer.appendChild(heart);

            // Remove after animation
            setTimeout(() => {
                heartsContainer.removeChild(heart);
            }, 2000);
        }
    }
}

// ===== HORIZONTAL HEARTS SYSTEM =====
class HorizontalHeartsSystem {
    constructor() {
        this.container = document.getElementById('hearts-container');
        this.init();
    }

    init() {
        // Create initial horizontal hearts
        this.createHorizontalHeart();

        // Set recurring horizontal heart generation (optimized for performance)
        setInterval(() => {
            this.createHorizontalHeart();
        }, 7000); // Every 7 seconds (reduced from 4.5)
    }

    createHorizontalHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart-horizontal';

        // Random emoji from the array
        const randomEmoji = CONFIG.hearts.emojis[
            Math.floor(Math.random() * CONFIG.hearts.emojis.length)
        ];
        heart.textContent = randomEmoji;

        // Random size
        const size = 30 + Math.random() * 30; // 30-60px
        heart.style.fontSize = `${size}px`;

        // Random vertical position (20% to 80% of viewport height)
        const verticalPos = 20 + Math.random() * 60;
        heart.style.top = `${verticalPos}%`;

        // Random wave motion
        const waveY = (Math.random() - 0.5) * 100; // -50px to +50px
        heart.style.setProperty('--wave-y', `${waveY}px`);

        // Random direction (left-to-right or right-to-left)
        const isLeftToRight = Math.random() > 0.5;
        if (isLeftToRight) {
            heart.classList.add('heart-left-to-right');
            heart.style.left = '-10%';
        } else {
            heart.classList.add('heart-right-to-left');
            heart.style.right = '-10%';
        }

        // Random animation duration
        const duration = 6 + Math.random() * 4; // 6-10 seconds
        heart.style.animationDuration = `${duration}s`;

        // Add to DOM
        this.container.appendChild(heart);

        // Create star trail effect
        this.createStarTrail(heart, duration, isLeftToRight, verticalPos);

        // Remove heart after animation completes
        setTimeout(() => {
            if (this.container.contains(heart)) {
                this.container.removeChild(heart);
            }
        }, duration * 1000);
    }

    createStarTrail(heartElement, duration, isLeftToRight, verticalPos) {
        const trailInterval = 150; // Create a star every 150ms (optimized)
        const trailCount = Math.floor((duration * 1000) / trailInterval);

        for (let i = 0; i < trailCount; i++) {
            setTimeout(() => {
                // Get the current position of the heart
                const rect = heartElement.getBoundingClientRect();
                if (rect.width === 0) return; // Heart has been removed

                // Create 1-2 stars per interval (reduced for performance)
                const starsPerInterval = 1 + Math.floor(Math.random() * 2);
                for (let j = 0; j < starsPerInterval; j++) {
                    const star = document.createElement('div');
                    star.className = 'star-trail';

                    // Random twinkle effect
                    if (Math.random() > 0.6) {
                        star.classList.add('twinkle');
                    }

                    // Position at heart's current location with slight randomness
                    const offsetX = (Math.random() - 0.5) * 20;
                    const offsetY = (Math.random() - 0.5) * 20;
                    star.style.left = `${rect.left + rect.width / 2 + offsetX}px`;
                    star.style.top = `${rect.top + rect.height / 2 + offsetY}px`;

                    // Random size variation
                    const starSize = 2 + Math.random() * 3;
                    star.style.width = `${starSize}px`;
                    star.style.height = `${starSize}px`;

                    // Add to document body
                    document.body.appendChild(star);

                    // Remove star after animation
                    setTimeout(() => {
                        if (document.body.contains(star)) {
                            document.body.removeChild(star);
                        }
                    }, 800);
                }
            }, i * trailInterval);
        }
    }
}

// ===== CURSOR TRAIL SYSTEM =====
class CursorTrail {
    constructor() {
        this.loveTexts = ['love', 'love', 'love', '♥', '💕'];
        this.lastSpawnTime = 0;
        this.spawnThreshold = 100; // Increased from 50ms (better performance)
        this.init();
    }

    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });

        // Also track touch movement for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                this.handleMouseMove({
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
            }
        });
    }

    handleMouseMove(e) {
        const now = Date.now();

        // Throttle spawn rate for performance
        if (now - this.lastSpawnTime < this.spawnThreshold) {
            return;
        }

        this.lastSpawnTime = now;
        this.createTrailParticle(e.clientX, e.clientY);
    }

    createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-trail';

        // Random text from array
        const randomText = this.loveTexts[
            Math.floor(Math.random() * this.loveTexts.length)
        ];
        particle.textContent = randomText;

        // Position at cursor with slight offset
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        particle.style.left = `${x + offsetX}px`;
        particle.style.top = `${y + offsetY}px`;

        // Random size variation
        const size = 14 + Math.random() * 6; // 14-20px
        particle.style.fontSize = `${size}px`;

        // Add to body
        document.body.appendChild(particle);

        // Remove after animation (1.2s)
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 1200);
    }
}

// ===== INITIALIZE ON DOM LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Start the hearts particle system
    new HeartsSystem();

    // Start the horizontal hearts system
    new HorizontalHeartsSystem();

    // Start the sparkles system
    new SparklesSystem();

    // Initialize interactive bouquet
    new InteractiveBouquet();

    // Initialize cursor trail
    new CursorTrail();

    // Add page load animation
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Use requestAnimationFrame for smooth animations
let rafId;
function optimizePerformance() {
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Cancel animation frame when hidden
            if (rafId) cancelAnimationFrame(rafId);
        }
    });
}

optimizePerformance();
