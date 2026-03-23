/* ===================================
   NEXCORE SOLUTIONS — JAVASCRIPT
   ===================================== */

// Sticky Navbar
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for Fade-In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0s';
            entry.target.style.animationDelay = delay;
            entry.target.classList.add('fade-up');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-up elements
document.querySelectorAll('.fade-up').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            business: contactForm.querySelectorAll('input[type="text"]')[1].value,
            projectType: contactForm.querySelector('select').value,
            message: contactForm.querySelector('textarea').value
        };
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.business || !formData.projectType || !formData.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email');
            return;
        }
        
        // In a real environment, you would send this to a backend
        console.log('Form Data:', formData);
        
        // Show success message
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'var(--accent-cyan)';
        submitBtn.style.color = '#000';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
        }, 3000);
    });
}

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add subtle mouse parallax to blobs (optional)
const blobs = document.querySelectorAll('.blob');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, index) => {
        const moveX = (mouseX - 0.5) * 50;
        const moveY = (mouseY - 0.5) * 50;
        
        if (index === 0) {
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            blob.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        }
    });
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // Trigger animations for elements already in view
    observer.disconnect();
    document.querySelectorAll('.fade-up').forEach((el, index) => {
        observer.observe(el);
    });
});

// Service Card Hover Animation
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(12, 15, 30, 0.9)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'var(--bg-secondary)';
    });
});

// Active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = 'var(--text-primary)';
            });
            
            const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.style.color = 'var(--accent-gold)';
            }
        }
    });
});

// Prevent default form behavior for demo
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn') && e.target.href === '#') {
        e.preventDefault();
    }
});
