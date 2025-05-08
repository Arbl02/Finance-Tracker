 // Navigation Scroll Effect
 window.addEventListener('scroll', function() {
    const navBar = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        navBar.classList.add('scrolled');
    } else {
        navBar.classList.remove('scrolled');
    }
});

// Animation on Scroll
function animateOnScroll() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    const processSteps = document.querySelectorAll('.process-step');
    
    const options = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    benefitItems.forEach(item => {
        observer.observe(item);
    });
    
    processSteps.forEach(step => {
        observer.observe(step);
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
// Hover Effect for Steps
const stepDetails = document.querySelectorAll('.step-details');
stepDetails.forEach(detail => {
detail.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-8px)';
this.style.boxShadow = '8px 8px 16px rgba(0, 0, 0, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.8)';
});

detail.addEventListener('mouseleave', function() {
this.style.transform = '';
this.style.boxShadow = '6px 6px 12px rgba(0, 0, 0, 0.15), -6px -6px 12px rgba(255, 255, 255, 0.8)';
});
});

// CTA Button Animation
const actionButtons = document.querySelectorAll('.action-button, .secondary-action');
actionButtons.forEach(button => {
button.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-2px)';
this.style.boxShadow = '5px 5px 10px rgba(0, 0, 0, 0.15), -5px -5px 10px rgba(255, 255, 255, 0.8)';
});

button.addEventListener('mouseleave', function() {
this.style.transform = '';
this.style.boxShadow = '4px 4px 8px rgba(0, 0, 0, 0.15), -4px -4px 8px rgba(255, 255, 255, 0.8)';
});
});

// Mobile Navigation Toggle
function createMobileNav() {
const header = document.querySelector('.top-navigation');
const navWrapper = document.querySelector('.nav-wrapper');

// Create hamburger menu
const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = '<span></span><span></span><span></span>';

// Create mobile nav links container
const mobileNavLinks = document.createElement('div');
mobileNavLinks.className = 'mobile-nav-links';

// Add links based on footer links
const footerLinks = document.querySelectorAll('.footer-column ul li a');
const uniqueLinks = new Set();
footerLinks.forEach(link => {
if (!uniqueLinks.has(link.textContent) && link.textContent) {
    uniqueLinks.add(link.textContent);
    const navLink = document.createElement('a');
    navLink.href = link.href;
    navLink.textContent = link.textContent;
    mobileNavLinks.appendChild(navLink);
}
});

// Add nav links to header
navWrapper.appendChild(mobileNavLinks);

// Add styles
const style = document.createElement('style');
style.textContent = `
.hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 22px;
    cursor: pointer;
    margin-right: 15px;
}

.hamburger span {
    width: 100%;
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 3px;
    transition: all 0.3s ease;
}

.mobile-nav-links {
    display: none;
}

@media (max-width: 768px) {
    .hamburger {
        display: flex;
    }
    
    .nav-wrapper {
        justify-content: space-between;
    }
    
    .mobile-nav-links {
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background-color: var(--background-color);
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        transform: translateY(-200%);
        transition: transform 0.3s ease;
        z-index: 999;
    }
    
    .mobile-nav-links.active {
        display: flex;
        transform: translateY(0);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
    }
}
`;
document.head.appendChild(style);

// Insert hamburger before the action button
const actionButton = document.querySelector('header .action-button');
actionButton.parentNode.insertBefore(hamburger, actionButton);

// Toggle menu on click
hamburger.addEventListener('click', function() {
this.classList.toggle('active');
mobileNavLinks.classList.toggle('active');
});

// Close menu when clicking a link
mobileNavLinks.querySelectorAll('a').forEach(link => {
link.addEventListener('click', function() {
    hamburger.classList.remove('active');
    mobileNavLinks.classList.remove('active');
});
});
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
animateOnScroll();
createMobileNav();

// Add minor delay for better loading experience
setTimeout(() => {
document.querySelector('.dashboard-preview').style.opacity = '1';
}, 300);
});

// Progress animation for habit tracking steps
function trackHabitStepProgress() {
const steps = document.querySelectorAll('.process-step');
let currentStep = 0;

// Highlight active step on page load based on scroll position
updateActiveStep();

// Update active step on scroll
window.addEventListener('scroll', updateActiveStep);

function updateActiveStep() {
for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const rect = step.getBoundingClientRect();
    
    // Check if step is in viewport
    if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
        if (i > currentStep) {
            currentStep = i;
            animateStepProgress(i);
        }
    }
}
}

function animateStepProgress(stepIndex) {
// Add visual indicator for completed steps
for (let i = 0; i <= stepIndex; i++) {
    const stepMarker = steps[i].querySelector('.step-marker');
    if (!stepMarker.classList.contains('completed')) {
        stepMarker.classList.add('completed');
        stepMarker.style.backgroundColor = 'var(--primary-color)';
        stepMarker.style.color = 'white';
    }
}
}
}

// Initialize habit tracking
setTimeout(trackHabitStepProgress, 1000);

// Add dashboard animation
function animateMockWidgets() {
const mockWidgets = document.querySelectorAll('.data-widget');
mockWidgets.forEach((widget, index) => {
setTimeout(() => {
    widget.style.transform = 'translateX(0)';
    widget.style.opacity = '1';
}, index * 200);
});
}

// Add initial styles for widget animation
const style = document.createElement('style');
style.textContent = `
.data-widget {
transform: translateX(-20px);
opacity: 0;
transition: all 0.5s ease;
}
`;
document.head.appendChild(style);

// Initialize dashboard animation
setTimeout(animateMockWidgets, 800);