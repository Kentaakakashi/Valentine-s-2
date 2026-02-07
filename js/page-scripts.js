// Page-specific scripts

// Common functions for all pages
function createFloatingElements(element, count, className) {
    const container = document.createElement('div');
    container.className = `${className}-container`;
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = className;
        el.innerHTML = element;
        el.style.position = 'absolute';
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;
        el.style.fontSize = `${Math.random() * 20 + 15}px`;
        el.style.opacity = `${Math.random() * 0.4 + 0.1}`;
        el.style.animation = `float ${Math.random() * 5 + 5}s infinite ease-in-out ${Math.random() * 5}s`;
        
        container.appendChild(el);
    }
    
    document.body.appendChild(container);
}

// Chocolate Day Functions
function createChocolateBox(containerId, chocolates) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    chocolates.forEach((chocolate, index) => {
        const choco = document.createElement('div');
        choco.className = 'chocolate';
        choco.innerHTML = `
            <div class="choco-icon">🍫</div>
            <div class="choco-name">${chocolate.name}</div>
            <div class="choco-message" style="display: none">${chocolate.message}</div>
        `;
        
        choco.addEventListener('click', function() {
            const message = this.querySelector('.choco-message');
            message.style.display = 'block';
            message.style.animation = 'text-reveal 0.5s ease';
            
            // Add melt effect
            this.classList.add('chocolate-melt');
            
            // Play sound
            const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-bite-into-a-cookie-2216.mp3');
            sound.volume = 0.3;
            sound.play();
        });
        
        container.appendChild(choco);
    });
}

// Teddy Day Functions
function createTeddyBear() {
    const teddy = document.querySelector('.virtual-teddy');
    if (!teddy) return;
    
    teddy.addEventListener('click', function() {
        this.classList.add('teddy-hug');
        
        // Change background color for warmth effect
        document.querySelector('.hug-simulator').style.background = 
            'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
        
        // Play hug sound
        const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-cute-little-girl-hug-1902.mp3');
        sound.volume = 0.3;
        sound.play();
        
        // Reset after 2 seconds
        setTimeout(() => {
            this.classList.remove('teddy-hug');
            document.querySelector('.hug-simulator').style.background = 
                'linear-gradient(135deg, #ffeff6, #ffe6f0)';
        }, 2000);
    });
}

// Promise Day Functions
function createPromiseTree() {
    const promises = [
        "Always honest",
        "Forever faithful",
        "Endlessly supportive",
        "Patient always",
        "Kind everyday",
        "Love unconditionally"
    ];
    
    const tree = document.querySelector('.tree-leaves');
    if (!tree) return;
    
    promises.forEach((promise, index) => {
        const leaf = document.createElement('div');
        leaf.className = 'promise-leaf';
        leaf.textContent = promise;
        leaf.style.left = `${Math.random() * 80 + 10}%`;
        leaf.style.top = `${Math.random() * 80 + 10}%`;
        
        leaf.addEventListener('click', function() {
            this.style.background = '#ff4081';
            this.style.transform = 'scale(1.3)';
            
            // Create floating promise
            const floatingPromise = document.createElement('div');
            floatingPromise.textContent = promise;
            floatingPromise.style.position = 'absolute';
            floatingPromise.style.left = `${Math.random() * 80 + 10}%`;
            floatingPromise.style.top = '50%';
            floatingPromise.style.color = '#ff4081';
            floatingPromise.style.fontWeight = '600';
            floatingPromise.style.fontSize = '1.2rem';
            floatingPromise.style.animation = 'float 3s ease-out forwards';
            
            document.querySelector('.promise-tree').appendChild(floatingPromise);
            
            setTimeout(() => {
                floatingPromise.remove();
            }, 3000);
        });
        
        tree.appendChild(leaf);
    });
}

// Hug Day Functions
class HugSimulator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.timer = 0;
        this.timerInterval = null;
        this.isHugging = false;
        this.init();
    }
    
    init() {
        this.createHugButton();
        this.createTimerDisplay();
        this.createWarmthIndicator();
    }
    
    createHugButton() {
        const hugBtn = document.createElement('div');
        hugBtn.className = 'hug-button';
        hugBtn.innerHTML = '🤗<br><small>Press & Hold</small>';
        hugBtn.style.cursor = 'pointer';
        
        // Mouse/touch events
        hugBtn.addEventListener('mousedown', () => this.startHug());
        hugBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startHug();
        });
        
        hugBtn.addEventListener('mouseup', () => this.endHug());
        hugBtn.addEventListener('touchend', () => this.endHug());
        hugBtn.addEventListener('mouseleave', () => this.endHug());
        
        this.container.appendChild(hugBtn);
        this.hugBtn = hugBtn;
    }
    
    createTimerDisplay() {
        const timer = document.createElement('div');
        timer.className = 'hug-timer';
        timer.id = 'hugTimer';
        timer.textContent = '0.00s';
        this.container.appendChild(timer);
        this.timerDisplay = timer;
    }
    
    createWarmthIndicator() {
        const warmth = document.createElement('div');
        warmth.className = 'warmth-indicator';
        warmth.style.width = '100%';
        warmth.style.height = '20px';
        warmth.style.background = 'linear-gradient(90deg, #ffefef, #ff6b6b)';
        warmth.style.borderRadius = '10px';
        warmth.style.marginTop = '20px';
        warmth.style.transition = 'all 0.3s ease';
        
        this.container.appendChild(warmth);
        this.warmthIndicator = warmth;
    }
    
    startHug() {
        if (this.isHugging) return;
        
        this.isHugging = true;
        this.hugBtn.style.animation = 'none';
        this.hugBtn.style.transform = 'scale(0.9)';
        
        // Start timer
        this.timer = 0;
        this.timerInterval = setInterval(() => {
            this.timer += 0.01;
            this.timerDisplay.textContent = this.timer.toFixed(2) + 's';
            
            // Increase warmth
            const warmthLevel = Math.min(this.timer / 10, 1);
            this.warmthIndicator.style.background = 
                `linear-gradient(90deg, #ffefef, #ff6b6b ${warmthLevel * 100}%)`;
            
            // Change background color
            const red = 255;
            const green = 107 + Math.floor(148 * warmthLevel);
            const blue = 107;
            this.container.style.background = 
                `rgb(${red}, ${green}, ${blue})`;
        }, 10);
        
        // Play heartbeat sound
        this.heartbeatSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-heartbeat-990.mp3');
        this.heartbeatSound.loop = true;
        this.heartbeatSound.volume = 0.3;
        this.heartbeatSound.play();
    }
    
    endHug() {
        if (!this.isHugging) return;
        
        this.isHugging = false;
        clearInterval(this.timerInterval);
        this.hugBtn.style.transform = 'scale(1)';
        this.hugBtn.style.animation = 'pulse 2s infinite';
        
        // Stop sound
        if (this.heartbeatSound) {
            this.heartbeatSound.pause();
            this.heartbeatSound.currentTime = 0;
        }
        
        // Save hug duration
        if (this.timer > 0) {
            VDay.saveProgress(6, this.timer.toFixed(2));
            
            // Show celebration for long hugs
            if (this.timer > 3) {
                this.showCelebration();
            }
        }
        
        // Reset after delay
        setTimeout(() => {
            this.container.style.background = '';
            this.warmthIndicator.style.background = 'linear-gradient(90deg, #ffefef, #ff6b6b 0%)';
        }, 1000);
    }
    
    showCelebration() {
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <h3>🤗 Amazing Hug! 🤗</h3>
            <p>That was a ${this.timer.toFixed(2)} second hug!</p>
            <p>Our connection grows stronger every day! 💝</p>
        `;
        celebration.style.position = 'fixed';
        celebration.style.top = '50%';
        celebration.style.left = '50%';
        celebration.style.transform = 'translate(-50%, -50%)';
        celebration.style.background = 'rgba(255, 255, 255, 0.95)';
        celebration.style.padding = '30px';
        celebration.style.borderRadius = '20px';
        celebration.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        celebration.style.zIndex = '10000';
        celebration.style.textAlign = 'center';
        celebration.style.animation = 'fadeIn 0.5s ease';
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                celebration.remove();
            }, 500);
        }, 2000);
    }
}

// Kiss Day Functions
class KissCollector {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.kissCount = 0;
        this.kissTypes = ['💋', '😘', '🥰', '😚', '😙', '💏'];
        this.init();
    }
    
    init() {
        this.createKissGrid();
        this.createKissCounter();
        this.createKissOMeter();
    }
    
    createKissGrid() {
        for (let i = 0; i < 12; i++) {
            const kiss = document.createElement('div');
            kiss.className = 'kiss-item';
            kiss.innerHTML = this.kissTypes[Math.floor(Math.random() * this.kissTypes.length)];
            
            kiss.addEventListener('click', () => this.collectKiss(kiss));
            
            this.container.appendChild(kiss);
        }
    }
    
    createKissCounter() {
        const counter = document.createElement('div');
        counter.className = 'kiss-counter';
        counter.innerHTML = `
            <h3>Kisses Collected: <span id="kissCount">0</span></h3>
            <p>Click on kisses to collect them!</p>
        `;
        counter.style.textAlign = 'center';
        counter.style.margin = '20px 0';
        
        this.container.parentNode.insertBefore(counter, this.container);
    }
    
    createKissOMeter() {
        const meter = document.createElement('div');
        meter.className = 'kiss-o-meter';
        meter.innerHTML = `
            <div class="meter-title">Kiss-O-Meter</div>
            <div class="meter-bar">
                <div class="meter-fill" style="width: 0%"></div>
            </div>
            <div class="meter-labels">
                <span>Cold</span>
                <span>Warm</span>
                <span>Hot</span>
                <span>On Fire! 🔥</span>
            </div>
        `;
        meter.style.background = 'rgba(255, 255, 255, 0.9)';
        meter.style.borderRadius = '20px';
        meter.style.padding = '25px';
        meter.style.marginTop = '30px';
        meter.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        
        this.container.parentNode.appendChild(meter);
        this.meterFill = meter.querySelector('.meter-fill');
    }
    
    collectKiss(kissElement) {
        this.kissCount++;
        
        // Update counter
        document.getElementById('kissCount').textContent = this.kissCount;
        
        // Update meter
        const percentage = Math.min((this.kissCount / 12) * 100, 100);
        this.meterFill.style.width = `${percentage}%`;
        this.meterFill.style.background = this.getMeterColor(percentage);
        
        // Animate kiss
        kissElement.style.animation = 'kiss-pop 0.5s forwards';
        
        // Create electric effect
        this.createElectricEffect(kissElement);
        
        // Play sound
        const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-kiss-2010.mp3');
        sound.volume = 0.3;
        sound.play();
        
        // Replace kiss after animation
        setTimeout(() => {
            kissElement.style.animation = '';
            kissElement.innerHTML = this.kissTypes[Math.floor(Math.random() * this.kissTypes.length)];
            kissElement.style.opacity = '1';
            kissElement.style.transform = 'scale(1)';
        }, 500);
        
        // Save progress
        VDay.saveProgress(7, this.kissCount);
        
        // Show celebration for full collection
        if (this.kissCount >= 12) {
            this.showFireworks();
        }
    }
    
    getMeterColor(percentage) {
        if (percentage < 25) return '#ffefef';
        if (percentage < 50) return '#ffcccc';
        if (percentage < 75) return '#ff9999';
        return '#ff4081';
    }
    
    createElectricEffect(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        for (let i = 0; i < 5; i++) {
            const spark = document.createElement('div');
            spark.style.position = 'fixed';
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.width = '2px';
            spark.style.height = '2px';
            spark.style.background = '#ff4081';
            spark.style.borderRadius = '50%';
            spark.style.boxShadow = '0 0 10px #ff4081';
            spark.style.zIndex = '1000';
            spark.style.pointerEvents = 'none';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 30;
            
            spark.animate([
                {
                    transform: `translate(0, 0)`,
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
                    opacity: 0
                }
            ], {
                duration: 500,
                easing: 'ease-out'
            });
            
            document.body.appendChild(spark);
            
            setTimeout(() => {
                spark.remove();
            }, 500);
        }
    }
    
    showFireworks() {
        // Create fireworks effect
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createFirework();
            }, i * 100);
        }
        
        // Show celebration message
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <h3>🎆 FIREWORKS OF LOVE! 🎆</h3>
            <p>You've collected all the kisses!</p>
            <p>Our love is officially ON FIRE! 🔥</p>
        `;
        celebration.style.position = 'fixed';
        celebration.style.top = '50%';
        celebration.style.left = '50%';
        celebration.style.transform = 'translate(-50%, -50%)';
        celebration.style.background = 'rgba(255, 255, 255, 0.95)';
        celebration.style.padding = '40px';
        celebration.style.borderRadius = '20px';
        celebration.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        celebration.style.zIndex = '10000';
        celebration.style.textAlign = 'center';
        celebration.style.animation = 'fadeIn 0.5s ease';
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                celebration.remove();
            }, 500);
        }, 3000);
    }
    
    createFirework() {
        const firework = document.createElement('div');
        firework.style.position = 'fixed';
        firework.style.left = `${Math.random() * 80 + 10}%`;
        firework.style.top = `${Math.random() * 80 + 10}%`;
        firework.style.zIndex = '9999';
        firework.style.pointerEvents = 'none';
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.background = ['#ff4081', '#ff79b0', '#ffb6c1', '#ffd700', '#00bcd4'][Math.floor(Math.random() * 5)];
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 20px currentColor';
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = 80;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            firework.appendChild(particle);
        }
        
        document.body.appendChild(firework);
        
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }
}

// Valentine's Day Functions
function createLoveTimeline() {
    const timeline = document.querySelector('.love-timeline');
    if (!timeline) return;
    
    const milestones = [
        { date: 'First Meet', title: 'Our Story Begins', description: 'The day our paths crossed' },
        { date: 'First Date', title: 'Butterflies', description: 'Nervous smiles and endless conversations' },
        { date: 'First "I Love You"', title: 'Hearts Spoke', description: 'The words that changed everything' },
        { date: 'First Adventure', title: 'Exploring Together', description: 'Creating memories around every corner' },
        { date: 'Today', title: 'Stronger Every Day', description: 'Growing in love with each passing moment' },
        { date: 'Future', title: 'Forever to Go', description: 'Our love story continues...' }
    ];
    
    milestones.forEach((milestone, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-date">${milestone.date}</div>
            <div class="timeline-content">
                <div class="timeline-dot"></div>
                <h3>${milestone.title}</h3>
                <p>${milestone.description}</p>
            </div>
        `;
        
        item.style.animationDelay = `${index * 0.2}s`;
        
        timeline.appendChild(item);
    });
}

function createPhotoCollage(containerId, photos) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    photos.forEach(photo => {
        const frame = document.createElement('div');
        frame.className = 'photo-frame';
        frame.innerHTML = `
            <div class="photo-placeholder" style="
                width: 100%;
                height: 200px;
             
