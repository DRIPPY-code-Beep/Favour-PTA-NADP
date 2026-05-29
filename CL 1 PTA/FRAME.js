// Fade-in Animations Using Intersection Observer API
document.addEventListener("DOMContentLoaded", () => {
    const fadeCards = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeCards.forEach(card => {
        // Initial state set programmatically to ensure layout degrades gracefully if JavaScript is disabled
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(card);
    });

    const studentCards = document.querySelectorAll('.student-card');
    studentCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const galleryKey = card.dataset.gallery;
            if (galleryKey) openStudentGallery(galleryKey);
        });
        card.addEventListener('keypress', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                const galleryKey = card.dataset.gallery;
                if (galleryKey) openStudentGallery(galleryKey);
            }
        });
    });

    // Initialize gallery container random image rotation (every 12 seconds)
    initializeGalleryContainerImageRotation();
});

// Gallery Container Image Rotation: randomly select and display images every 12 seconds
function initializeGalleryContainerImageRotation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(container => {
        // Get all images from this container's gallery-thumbs
        const images = Array.from(container.querySelectorAll('.gallery-thumbs img'));
        const placeholder = container.querySelector('.gallery-placeholder');
        
        if (images.length === 0 || !placeholder) return;
        
        // Function to update the container's background with a random image
        function displayRandomImage() {
            const randomIndex = Math.floor(Math.random() * images.length);
            const randomImg = images[randomIndex];
            const imageSrc = randomImg.getAttribute('src');
            
            // Set the background image of the placeholder
            placeholder.style.backgroundImage = `url('${imageSrc}'), linear-gradient(45deg, rgba(40, 40, 59, 0.6), rgba(10, 10, 20, 0.8))`;
            placeholder.style.backgroundSize = 'cover, cover';
            placeholder.style.backgroundPosition = 'center, center';
        }
        
        // Display a random image immediately on load
        displayRandomImage();
        
        // Update to a new random image every 12 seconds
        setInterval(displayRandomImage, 12000);
    });
}

// Theme toggle: set initial theme and wire the toggle button
function applyTheme(theme) {
    const btn = document.getElementById('theme-toggle');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        if (btn) { btn.innerText = '☀️'; btn.setAttribute('aria-pressed', 'true'); }
    } else {
        document.body.classList.remove('light-theme');
        if (btn) { btn.innerText = '🌙'; btn.setAttribute('aria-pressed', 'false'); }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    const stored = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = stored || (prefersLight ? 'light' : 'dark');
    applyTheme(initial);

    if (btn) {
        btn.addEventListener('click', () => {
            const isLight = document.body.classList.contains('light-theme');
            const next = isLight ? 'dark' : 'light';
            localStorage.setItem('theme', next);
            applyTheme(next);
        });
    }
});

const studentGalleryData = {
    jet: {
        title: 'Jet Club Science Showcase',
        description: 'Science project references from top STEM websites and competitions, highlighting innovation, experimental design, and team research.',
        items: [
            {
                src: 'https://images.unsplash.com/photo-1531096130204-5337c5f4b999?auto=format&fit=crop&w=1000&q=80',
                caption: 'A chemistry lab demonstration with vibrant reagents, representing the careful experiments built by Jet Club members.'
            },
            {
                src: 'https://images.unsplash.com/photo-1555967524-0c13f5fc11ea?auto=format&fit=crop&w=1000&q=80',
                caption: 'Prototype robotics work on display, showing the engineering focus of a science fair project team.'
            },
            {
                src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
                caption: 'A student presentation at a science competition, showing research storytelling and polished findings.'
            }
        ]
    },
    sports: {
        title: 'Sports & Athletics Gallery',
        description: 'Local club moments captured with school images; these photos show training, team pride, and competitive athletic events.',
        items: [
            {
                src: '1.jpeg',
                caption: 'Student athletes warming up together, showing strong teamwork and discipline on the field.'
            },
            {
                src: '3.jpeg',
                caption: 'A sprinting practice session, highlighting speed training and athletic focus during track drills.'
            },
            {
                src: '8.jpeg',
                caption: 'A winning moment with students celebrating after a match, symbolizing sportsmanship and victory.'
            },
            {
                src: '7.jpeg',
                caption: 'Athletes preparing for competition, showing dedication, coaching support, and team spirit.'
            }
        ]
    },
    debate: {
        title: 'Debate & Press Club Inspiration',
        description: 'Communication channel references from media and press websites, illustrating broadcast, reporting, and persuasive speaking skills.',
        items: [
            {
                src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80',
                caption: 'A podcast microphone and desk setup, representing the club’s audio interviews and spoken-word content.'
            },
            {
                src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80',
                caption: 'A newsroom desk with cameras and notebooks, showing the press side of the club covering school stories.'
            },
            {
                src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
                caption: 'A student broadcaster speaking into a microphone, symbolizing confident communication and media presence.'
            }
        ]
    }
};

function openStudentGallery(key) {
    const data = studentGalleryData[key];
    if (!data) return;
    const overlay = document.getElementById('student-gallery-overlay');
    const title = document.getElementById('student-gallery-title');
    const description = document.getElementById('student-gallery-description');
    const itemsContainer = document.getElementById('student-gallery-items');

    title.innerText = data.title;
    description.innerText = data.description;
    itemsContainer.innerHTML = data.items.map(item => `
        <div class="student-gallery-item">
            <img src="${item.src}" alt="${item.caption}" loading="lazy">
            <div class="student-gallery-caption"><strong>Note:</strong> ${item.caption}</div>
        </div>
    `).join('');

    overlay.style.display = 'flex';
}

function closeStudentGallery() {
    document.getElementById('student-gallery-overlay').style.display = 'none';
}

// Lightbox Logic for Gallery Assets
function openLightbox(element) {
    // Backward-compat: if a container is clicked, show its title in the existing lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxText = document.getElementById('lightbox-text');
    const itemText = element.querySelector('.gallery-overlay-text')?.innerText || 'Media Preview';
    
    lightboxText.innerText = itemText + " Asset Preview";
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// New: open a full image in the lightbox with caption and enlarging behavior
function openImageLightbox(imgEl) {
    const src = imgEl.getAttribute('src');
    const caption = imgEl.dataset.caption || imgEl.alt || '';
    const lightbox = document.getElementById('lightbox');
    const lightboxText = document.getElementById('lightbox-text');

    // build image element inside lightbox
    lightbox.innerHTML = `
        <span class="close-lightbox" onclick="closeLightbox()">&times;</span>
        <div class="lightbox-content">
            <img id="lightbox-img" src="${src}" alt="${caption}" style="max-width:90vw; max-height:80vh; object-fit:contain; display:block; margin:0 auto;" />
            <div id="lightbox-text" style="margin-top:12px; font-size:1rem; color:#d1d5db;">${caption}</div>
        </div>
    `;

    lightbox.style.display = 'flex';

    // click outside content closes
    lightbox.addEventListener('click', function onBgClick(e) {
        if (e.target === lightbox) {
            closeLightbox();
            lightbox.removeEventListener('click', onBgClick);
        }
    });
}

// Form Submission Visual Handler
function handleFormSubmit(event) {
    event.preventDefault();
    alert("Thank you for reaching out! The PTA NADP Int'l College admissions registry team will contact you shortly.");
    document.getElementById('schoolContactForm').reset();
}

// Open a gallery container as a grid inside the shared lightbox.
function openGalleryContainer(containerEl) {
    const title = containerEl.querySelector('.gallery-placeholder')?.innerText || 'Gallery';
    const subtitle = containerEl.querySelector('.gallery-overlay-text')?.innerText || '';
    const imgs = Array.from(containerEl.querySelectorAll('.gallery-thumbs img'));
    const lightbox = document.getElementById('lightbox');

    if (!lightbox) return;

    const gridHtml = imgs.map(img => {
        const src = img.getAttribute('src');
        const caption = img.dataset.caption || img.alt || '';
        return `<img src="${src}" alt="${caption}" data-caption="${caption}" onclick="openImageLightbox(this)"/>`;
    }).join('');

    lightbox.innerHTML = `
        <span class="close-lightbox" onclick="closeLightbox()">&times;</span>
        <div class="lightbox-content grid-lightbox">
            <h2 style="margin-bottom:12px">${title}</h2>
            <p style="color:#d1d5db; margin-bottom:18px">${subtitle}</p>
            <div class="grid-images">
                ${gridHtml}
            </div>
        </div>
    `;

    lightbox.style.display = 'flex';

    // close when clicking backdrop
    function onBgClick(e) {
        if (e.target === lightbox) {
            closeLightbox();
            lightbox.removeEventListener('click', onBgClick);
        }
    }
    lightbox.addEventListener('click', onBgClick);
}

// --- Slideshow Functionality ---
const slideshowImages = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg', '6.jpeg', '7.jpeg', '8.jpeg', '9.jpeg', '10.jpeg', '13.jpeg', '15.jpeg'];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let currentImageIndex = 0;
let imageQueue = shuffleArray(slideshowImages);
let slideshowInterval;
let isTransitioning = false;

function initializeSlideshow() {
    const slideshowImage = document.getElementById('slideshow-image');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');

    if (!slideshowImage) return;

    // Display first image
    slideshowImage.src = imageQueue[currentImageIndex];

    // Auto-play slideshow every 5 seconds
    function autoPlaySlideshow() {
        if (!isTransitioning) {
            showNextSlide();
        }
    }

    slideshowInterval = setInterval(autoPlaySlideshow, 5000);

    // Manual controls
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevSlide);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextSlide);
    }

    // Pause on hover, resume on leave
    const slideshowWrapper = document.querySelector('.slideshow-wrapper');
    if (slideshowWrapper) {
        slideshowWrapper.addEventListener('mouseenter', () => {
            clearInterval(slideshowInterval);
        });

        slideshowWrapper.addEventListener('mouseleave', () => {
            slideshowInterval = setInterval(autoPlaySlideshow, 5000);
        });
    }
}

function showNextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    const slideshowImage = document.getElementById('slideshow-image');
    
    // Add fade-out effect
    slideshowImage.classList.add('fade-out');

    setTimeout(() => {
        // Move to next image
        currentImageIndex = (currentImageIndex + 1) % imageQueue.length;

        // Reshuffle when we reach the end
        if (currentImageIndex === 0) {
            imageQueue = shuffleArray(slideshowImages);
        }

        slideshowImage.src = imageQueue[currentImageIndex];
        slideshowImage.classList.remove('fade-out');
        isTransitioning = false;
    }, 800);
}

function showPrevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    const slideshowImage = document.getElementById('slideshow-image');
    
    // Add fade-out effect
    slideshowImage.classList.add('fade-out');

    setTimeout(() => {
        // Move to previous image
        currentImageIndex = (currentImageIndex - 1 + imageQueue.length) % imageQueue.length;

        slideshowImage.src = imageQueue[currentImageIndex];
        slideshowImage.classList.remove('fade-out');
        isTransitioning = false;
    }, 800);
}

// Initialize slideshow on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSlideshow();
});

// Initialize responsive nav toggle for small screens
document.addEventListener('DOMContentLoaded', () => {
    initializeNavToggle();
});

function initializeNavToggle() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;

    const navLinks = navContainer.querySelector('.nav-links');
    if (!navLinks) return;

    // Create toggle button if not present
    let toggle = navContainer.querySelector('.nav-toggle');
    if (!toggle) {
        toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-label', 'Toggle navigation');
        toggle.setAttribute('aria-expanded', 'false');
        const hamburger = document.createElement('span');
        hamburger.className = 'hamburger';
        toggle.appendChild(hamburger);
        navContainer.insertBefore(toggle, navLinks);
    }

    // Toggle function
    function setOpen(open) {
        if (open) {
            navLinks.classList.add('show');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.classList.add('active');
        } else {
            navLinks.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.classList.remove('active');
        }
    }

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.contains('show');
        setOpen(!isOpen);
    });

    // Close when clicking a link (mobile) for better UX
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => setOpen(false));
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target)) {
            setOpen(false);
        }
    });

    // close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
    });
}