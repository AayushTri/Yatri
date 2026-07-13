// ===== CAROUSEL NAVIGATION =====
const carousel = document.getElementById('tripsCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');

if (carousel && prevBtn && nextBtn) {
    const scrollAmount = 320;

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
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
}

// Click dots to scroll
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if(carousel) carousel.scrollTo({ left: index * scrollAmount * 2, behavior: 'smooth' });
    });
});

console.log('✅ Home page JS loaded');