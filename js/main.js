// Main JavaScript for Valentine's Journey

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCountdown();
    initMusicPlayer();
    initPageTransitions();
    initDayCards();
    initProgressBar();
    createFloatingHearts();
    createSparkles();
    createConfetti();
});

// Countdown Timer
function initCountdown() {
    // Set target date to Feb 14
    const targetDate = new Date('Feb 14, 2025 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Music Player
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = musicToggle.querySelector('i');
    const musicText = musicToggle.querySelector('span');
    
    // Try to play music automatically (with user interaction)
    document.addEventListener('click', function initialPlay() {
        bgMusic.play().catch(e => {
            console.log('Autoplay prevented, waiting for user interaction');
        });
        document.removeEventListener('click', initialPlay);
    }, { once: true });
    
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add('playing');
            musicIcon.className = 'fas fa-volume-up';
            musicText.textContent = 'Playing';
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicIcon.className = 'fas fa-music';
            musicText.textContent = 'Play Music';
        }
    });
    
    bgMusic.volume = 0.3;
}

// Page Transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript:"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Create transition overlay
            const transition = document.createElement('div');
            transition.className = 'page-transition';
            document.body.appendChild(transition);
            
            // Animate out
            setTimeout(() => {
                transition.classList.add('page-transition-out');
            }, 10);
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });
}

// Day Cards Interaction
function initDayCards() {
    const dayCards = document.querySelectorAll('.day-card');
    
    dayCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(255, 64, 129, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
        
        // Add click effect
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return;
            
            const link = this.querySelector('.day-link');
            if (link) {
                link.click();
            }
        });
    });
}

// Progress Bar
function initProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text span');
    
    // Calculate progress based on current date
    const startDate = new Date('Feb 7, 2025').getTime();
    const endDate = new Date('Feb 14, 2025').getTime();
    const now = new Date().getTime();
    
    let progress = 0;
    
    if (now >= endDate) {
        progress = 100;
    } else if (now >= startDate) {
        progress = ((now - startDate) / (endDate - startDate)) * 100;
    } else {
        progress = 0;
    }
    
    progress = Math.min(Math.max(progress, 0), 100);
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
}

// Create Floating Hearts
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.position = 'absolute';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.opacity = `${Math.random() * 0.4 + 0.1}`;
        heart.style.color = i % 3 === 0 ? '#ff4081' : i % 3 === 1 ? '#ff79b0' : '#ffb6c1';
        heart.style.animation = `float ${Math.random() * 5 + 5}s infinite ease-in-out ${Math.random() * 5}s`;
        heart.style.zIndex = '-1';
        
        container.appendChild(heart);
    }
}

// Create Sparkles
function createSparkles() {
    const container = document.querySelector('.sparkles');
    
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✦';
        sparkle.style.position = 'absolute';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.fontSize = `${Math.random() * 10 + 10}px`;
        sparkle.style.opacity = '0';
        sparkle.style.color = '#ffffff';
        sparkle.style.animation = `sparkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 3}s`;
        
        container.appendChild(sparkle);
    }
}

// Create Confetti
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9998';
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = i % 5 === 0 ? '#ff4081' : 
                                       i % 5 === 1 ? '#ff79b0' : 
                                       i % 5 === 2 ? '#ffb6c1' : 
                                       i % 5 === 3 ? '#ff0066' : '#ff85a2';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 3}s linear infinite ${Math.random() * 5}s`;
        
        confettiContainer.appendChild(confetti);
    }
    
    document.body.appendChild(confettiContainer);
}

// Rose Day Petal Rain
function createPetalRain() {
    const container = document.querySelector('.petal-container') || document.body;
    
    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = '🌸';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.fontSize = `${Math.random() * 20 + 20}px`;
        petal.style.animationDuration = `${Math.random() * 3 + 5}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petal.style.color = i % 3 === 0 ? '#ff4081' : i % 3 === 1 ? '#ff79b0' : '#ffb6c1';
        
        container.appendChild(petal);
    }
}

// Save Progress to Local Storage
function saveProgress(day, value) {
    if (typeof Storage !== 'undefined') {
        localStorage.setItem(`valentine-day-${day}`, value);
    }
}

function getProgress(day) {
    if (typeof Storage !== 'undefined') {
        return localStorage.getItem(`valentine-day-${day}`) || 0;
    }
    return 0;
}

// Heartbeat Animation
function startHeartbeat(element) {
    let scale = 1;
    let direction = 1;
    
    function pulse() {
        scale += direction * 0.05;
        
        if (scale >= 1.2) direction = -1;
        if (scale <= 0.9) direction = 1;
        
        element.style.transform = `scale(${scale})`;
        requestAnimationFrame(pulse);
    }
    
    pulse();
}

// Chocolate Melt Effect
function meltChocolate(element) {
    element.classList.add('chocolate-melt');
    setTimeout(() => {
        element.style.display = 'none';
    }, 2000);
}

// Export functions for page scripts
window.VDay = {
    createPetalRain,
    startHeartbeat,
    meltChocolate,
    saveProgress,
    getProgress
};
