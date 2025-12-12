// Testimonials Auto-Scroll Functionality
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');

    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card-modern');
    const cardWidth = cards[0]?.offsetWidth || 450;
    const gap = 30;
    let currentIndex = 0;
    let autoScrollInterval;

    // Scroll to specific card
    function scrollToCard(index) {
        const scrollPosition = index * (cardWidth + gap);
        track.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        currentIndex = index;
    }

    // Next card
    function nextCard() {
        if (currentIndex < cards.length - 1) {
            scrollToCard(currentIndex + 1);
        } else {
            scrollToCard(0); // Loop back to start
        }
    }

    // Previous card
    function prevCard() {
        if (currentIndex > 0) {
            scrollToCard(currentIndex - 1);
        } else {
            scrollToCard(cards.length - 1); // Loop to end
        }
    }

    // Auto-scroll every 5 seconds
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextCard, 5000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoScroll();
            nextCard();
            startAutoScroll();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoScroll();
            prevCard();
            startAutoScroll();
        });
    }

    // Pause auto-scroll on hover
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoScroll();
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoScroll();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextCard();
        }
        if (touchEndX > touchStartX + 50) {
            prevCard();
        }
    }

    // Start auto-scroll
    startAutoScroll();
});
