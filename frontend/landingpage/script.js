// ===== CAROUSEL NAVIGATION =====
const carousel = document.getElementById('tripsCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const scrollAmount = 320; // card width + gap

nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

// ===== CAROUSEL DOTS =====
const dots = document.querySelectorAll('.dot');
let currentDot = 0;

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        currentDot = index;
        carousel.scrollTo({ left: index * scrollAmount * 2, behavior: 'smooth' });
    });
});

// Update dots on scroll
carousel.addEventListener('scroll', () => {
    const scrollPos = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const progress = scrollPos / maxScroll;
    const activeIndex = Math.round(progress * (dots.length - 1));
    
    dots.forEach(d => d.classList.remove('active'));
    if (dots[activeIndex]) {
        dots[activeIndex].classList.add('active');
    }
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'white';
    navLinks.style.padding = '20px';
    navLinks.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    navLinks.style.zIndex = '999';
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== NOTIFICATION BUTTON =====
const notificationBtn = document.querySelector('.notification-btn');
notificationBtn.addEventListener('click', () => {
    alert('No new notifications');
});

// ===== LOGIN/SIGNUP BUTTON =====
const loginSignupBtn = document.querySelector('.login-signup-btn');
loginSignupBtn.addEventListener('click', () => {
    // Redirect to login page or show login modal
    alert('Login/Signup functionality coming soon!');
    // window.location.href = 'login.html'; // Uncomment when you create login page
});