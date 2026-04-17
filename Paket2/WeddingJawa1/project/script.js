// Wedding date - Set to future date for countdown to work
// Set to 3 months from now for demonstration
const currentDate = new Date();
const weddingDate = new Date(currentDate.getTime() + (90 * 24 * 60 * 60 * 1000)); // 90 days from now
weddingDate.setHours(10, 0, 0, 0); // Set time to 10:00 AM

console.log('Wedding Date:', weddingDate.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
}));

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = weddingDate.getTime() - now;

    // Get countdown elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Check if elements exist before updating
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Debug log (remove in production)
        if (seconds % 10 === 0) { // Log every 10 seconds
            console.log(`Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`);
        }

        // Update display with animation effect
        updateCountdownDisplay(daysElement, days);
        updateCountdownDisplay(hoursElement, hours);
        updateCountdownDisplay(minutesElement, minutes);
        updateCountdownDisplay(secondsElement, seconds);
    } else {
        // Wedding day has arrived
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        // Add special message and effects for wedding day
        const countdownSection = document.querySelector('.countdown-section .section-header h2');
        if (countdownSection) {
            countdownSection.innerHTML = 'Hari Bahagia Telah Tiba! 🎉✨';
            countdownSection.style.animation = 'pulse 2s infinite, rainbow 3s linear infinite';
        }

        // Add celebration particles
        createCelebrationEffect();
    }
}

// Function to update countdown display with smooth transition
function updateCountdownDisplay(element, value) {
    const newValue = value.toString().padStart(2, '0');
    if (element.textContent !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#FFD700';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 100);
    }
}

// Celebration effect for when countdown reaches zero
function createCelebrationEffect() {
    const countdownContainer = document.querySelector('.countdown-container');
    if (!countdownContainer) return;

    // Create floating hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = ['💝', '💕', '💖', '✨', '🎊'][Math.floor(Math.random() * 5)];
            heart.style.cssText = `
                position: absolute;
                font-size: 2rem;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * 100}%;
                animation: floatUp 3s ease-out forwards;
            `;
            
            countdownContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }, i * 200);
    }
}

// Update wedding date display in hero section
function updateWeddingDateDisplay() {
    const weddingDateElement = document.querySelector('.wedding-date h2');
    if (weddingDateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = weddingDate.toLocaleDateString('id-ID', options);
        weddingDateElement.textContent = formattedDate;
    }
}

// Initialize countdown and date display when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    updateWeddingDateDisplay();
    updateCountdown();
});

// Update countdown every second
setInterval(updateCountdown, 1000);

// Save Date Function
function saveDate() {
    const eventTitle = 'Pernikahan Arya & Sari';
    
    // Use dynamic wedding date
    const eventDate = weddingDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const eventTime = '10:00'; // Use the same time as set in weddingDate
    const eventLocation = 'Masjid Agung Demak & Pendopo Agung Keraton';
    
    // Create calendar event URL (Google Calendar)
    const startDate = eventDate.replace(/-/g, '') + 'T' + eventTime.replace(':', '') + '00';
    const endDate = eventDate.replace(/-/g, '') + 'T140000'; // Ends at 14:00
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent('Pernikahan Arya Wijaya Kusuma & Sari Kusuma Dewi')}`;
    
    // Open calendar in new tab
    window.open(calendarUrl, '_blank');
    
    // Show confirmation
    showNotification('Acara berhasil disimpan ke kalender!', 'success');
}

// Open Maps Function
function openMaps(location) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
}

// RSVP Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(rsvpForm);
        const nama = formData.get('nama');
        const jumlah = formData.get('jumlah');
        const pesan = formData.get('pesan');
        
        // Validate form
        if (!nama || !jumlah) {
            showNotification('Mohon lengkapi nama dan jumlah tamu!', 'error');
            return;
        }
        
        // Simulate form submission (in real app, send to backend)
        setTimeout(() => {
            showNotification(`Matur nuwun, ${nama}! Kehadiran Anda dengan ${jumlah} tamu telah tercatat. 🙏`, 'success');
            rsvpForm.reset();
        }, 1000);
        
        // Show loading state
        const submitBtn = rsvpForm.querySelector('.rsvp-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Scroll animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-zoom-in, .animate-zoom-in-delay, .animate-zoom-in-delay-2, .animate-zoom-in-delay-3, .animate-fade-up-delay');
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(element);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    observeElements();
});

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Music Control Functions
let isPlaying = false;
let backgroundMusic;
let hasUserInteracted = false;

function toggleMusic() {
    if (!backgroundMusic) {
        backgroundMusic = document.getElementById('backgroundMusic');
    }
    
    const musicToggle = document.getElementById('musicToggle');
    hasUserInteracted = true;
    
    if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.innerHTML = '🔇';
        musicToggle.title = 'Klik untuk memutar musik';
        musicToggle.classList.remove('playing');
        isPlaying = false;
        showNotification('Musik dihentikan 🔇', 'info');
    } else {
        // Try to play music
        backgroundMusic.play().then(() => {
            musicToggle.innerHTML = '🎵';
            musicToggle.title = 'Klik untuk menghentikan musik';
            musicToggle.classList.add('playing');
            isPlaying = true;
            showNotification('Musik sedang diputar 🎵', 'success');
        }).catch(error => {
            console.log('Music play failed:', error);
            showNotification('Gagal memutar musik. Coba lagi!', 'error');
        });
    }
}

// Auto-play music when page loads (if allowed by browser)
document.addEventListener('DOMContentLoaded', function() {
    backgroundMusic = document.getElementById('backgroundMusic');
    
    // Show initial music notification
    setTimeout(() => {
        if (!hasUserInteracted) {
            showMusicWelcomeNotification();
        }
    }, 3000);
    
    // Try auto-play after a short delay
    setTimeout(() => {
        if (backgroundMusic && !hasUserInteracted) {
            backgroundMusic.play().then(() => {
                const musicToggle = document.getElementById('musicToggle');
                musicToggle.innerHTML = '🎵';
                musicToggle.title = 'Klik untuk menghentikan musik';
                musicToggle.classList.add('playing');
                isPlaying = true;
                hasUserInteracted = true;
                // Remove welcome notification if auto-play works
                const welcomeNotification = document.querySelector('.music-welcome-notification');
                if (welcomeNotification) {
                    welcomeNotification.remove();
                }
            }).catch(() => {
                // Auto-play blocked, user needs to interact first
                console.log('Auto-play blocked by browser');
            });
        }
    }, 1500);
});

// Special welcome notification for music
function showMusicWelcomeNotification() {
    // Remove existing notifications
    const existing = document.querySelector('.music-welcome-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'music-welcome-notification';
    notification.innerHTML = `
        <div class="welcome-content">
            <div class="welcome-icon">🎵</div>
            <div class="welcome-text">
                <h4>Selamat Datang!</h4>
                <p>Klik ikon musik di pojok kanan atas untuk memutar lagu pengantin</p>
            </div>
            <button class="welcome-close" onclick="this.parentElement.parentElement.remove()">
                ✕
            </button>
        </div>
    `;
    
    // Add enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2000;
        background: linear-gradient(135deg, #800000, #8B4513);
        color: white;
        padding: 0;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        max-width: 400px;
        width: 90%;
        border: 3px solid #FFD700;
        animation: welcomeSlideIn 0.8s ease-out;
    `;
    
    const welcomeContent = notification.querySelector('.welcome-content');
    welcomeContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 25px 30px;
        position: relative;
    `;
    
    const welcomeIcon = notification.querySelector('.welcome-icon');
    welcomeIcon.style.cssText = `
        font-size: 3rem;
        animation: pulse 2s infinite;
    `;
    
    const welcomeText = notification.querySelector('.welcome-text');
    welcomeText.style.cssText = `
        flex: 1;
    `;
    
    const welcomeTitle = notification.querySelector('h4');
    welcomeTitle.style.cssText = `
        margin: 0 0 8px 0;
        font-family: 'Playfair Display', serif;
        font-size: 1.4rem;
        color: #FFD700;
        font-weight: 700;
    `;
    
    const welcomeDesc = notification.querySelector('p');
    welcomeDesc.style.cssText = `
        margin: 0;
        font-size: 1rem;
        line-height: 1.5;
        color: #FFFFF0;
    `;
    
    const closeButton = notification.querySelector('.welcome-close');
    closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        color: #FFD700;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.3s ease;
    `;
    
    // Add hover effect to close button
    closeButton.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 215, 0, 0.2)';
        this.style.transform = 'scale(1.1)';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.background = 'none';
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(notification);
    
    // Auto close after 8 seconds if user doesn't interact
    setTimeout(() => {
        if (notification.parentElement && !hasUserInteracted) {
            notification.style.animation = 'welcomeSlideOut 0.5s ease-in forwards';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 500);
        }
    }, 8000);
    
    // Close when clicking music button
    const musicToggle = document.getElementById('musicToggle');
    const closeWelcome = () => {
        if (notification.parentElement) {
            notification.remove();
        }
        musicToggle.removeEventListener('click', closeWelcome);
    };
    musicToggle.addEventListener('click', closeWelcome);
}

// Gift Section Functions
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        let accountName;
        switch(type) {
            case 'mandiri':
                accountName = 'Bank Mandiri';
                break;
            case 'bca':
                accountName = 'Bank BCA';
                break;
            case 'dana':
                accountName = 'Dana';
                break;
            case 'gopay':
                accountName = 'GoPay';
                break;
            default:
                accountName = 'Nomor';
        }
        
        showNotification(`Nomor ${accountName} berhasil disalin! 📋`, 'success');
        
        // Add visual feedback
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✅';
        button.style.background = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('Gagal menyalin nomor', 'error');
    });
}

// Location Functions
function shareLocation(locationName) {
    if (navigator.share) {
        navigator.share({
            title: `Lokasi Pernikahan Arya & Sari`,
            text: `Lokasi: ${locationName}`,
            url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`
        }).then(() => {
            showNotification('Lokasi berhasil dibagikan!', 'success');
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(locationName);
        });
    } else {
        fallbackShare(locationName);
    }
}

function fallbackShare(locationName) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`;
    navigator.clipboard.writeText(`Lokasi Pernikahan Arya & Sari: ${locationName}\n${url}`).then(() => {
        showNotification('Link lokasi berhasil disalin!', 'success');
    }).catch(err => {
        console.error('Failed to copy location:', err);
        showNotification('Gagal membagikan lokasi', 'error');
    });
}

// Enhanced Save Date Function with multiple calendar options
function saveDate() {
    const eventTitle = 'Pernikahan Arya & Sari';
    const eventDate = '2024-06-15';
    const eventTime = '08:00';
    const eventLocation = 'Masjid Agung Demak & Pendopo Agung Keraton';
    const eventDetails = 'Pernikahan Arya Wijaya Kusuma & Sari Kusuma Dewi\n\nAkad Nikah: 08.00 WIB di Masjid Agung Demak\nResepsi: 11.00 WIB di Pendopo Agung Keraton';
    
    // Create calendar event URL (Google Calendar)
    const startDate = eventDate.replace(/-/g, '') + 'T' + eventTime.replace(':', '') + '00';
    const endDate = eventDate.replace(/-/g, '') + 'T140000'; // Ends at 14:00
    
    // Try multiple calendar options
    const calendarOptions = [
        {
            name: 'Google Calendar',
            url: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent(eventDetails)}`
        },
        {
            name: 'Outlook',
            url: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventTitle)}&startdt=${startDate}&enddt=${endDate}&location=${encodeURIComponent(eventLocation)}&body=${encodeURIComponent(eventDetails)}`
        }
    ];
    
    // Open Google Calendar by default
    window.open(calendarOptions[0].url, '_blank');
    
    // Show confirmation with additional options
    showCalendarOptions(calendarOptions);
}

function showCalendarOptions(options) {
    showNotification('Acara berhasil disimpan ke Google Calendar! 📅', 'success');
    
    // Could add modal here for other calendar options if needed
    setTimeout(() => {
        if (confirm('Ingin menambahkan ke Outlook juga?')) {
            window.open(options[1].url, '_blank');
        }
    }, 3000);
}

// Enhanced Animation Observer with stagger effect
function observeElementsEnhanced() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on element index
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-zoom-in, .animate-zoom-in-delay, .animate-zoom-in-delay-2, .animate-zoom-in-delay-3, .animate-fade-up-delay, .gift-card, .location-card');
    
    animatedElements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px) scale(0.95)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(element);
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    observeElementsEnhanced();
    
    // Add smooth hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.gift-card, .location-card, .event-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Preload critical images for better performance
document.addEventListener('DOMContentLoaded', function() {
    const criticalImages = [
        'src/assets/pria_jawa.jpg',
        'src/assets/wanita_jawa.jpg',
        'src/assets/jawa1.jpg',
        'src/assets/jawa2.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add loading spinner for heavy content
function showLoadingSpinner(element) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '⏳';
    spinner.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        animation: spin 2s linear infinite;
    `;
    
    element.style.position = 'relative';
    element.appendChild(spinner);
    
    return spinner;
}

// Add CSS for spinner animation and welcome notification
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    @keyframes welcomeSlideIn {
        0% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes welcomeSlideOut {
        0% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0px) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg);
        }
    }
    
    @keyframes rainbow {
        0% { color: #FFD700; }
        16% { color: #FF6B6B; }
        33% { color: #4ECDC4; }
        50% { color: #45B7D1; }
        66% { color: #96CEB4; }
        83% { color: #FFEAA7; }
        100% { color: #FFD700; }
    }
`;
document.head.appendChild(style);