const carousel = document.getElementById('testimonialCarousel');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const dotIndicator = document.getElementById('dotIndicator');

const cards = carousel.querySelectorAll('.testimonial-card');
const totalCards = cards.length;

function generateDots() {
    dotIndicator.innerHTML = '';
    
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        dot.dataset.index = i;
        
        dot.addEventListener('click', () => {
            scrollToCard(i);
        });
        
        dotIndicator.appendChild(dot);
    }
}

function scrollToCard(index) {
    const scrollDistance = getScrollDistance();
    const targetScroll = scrollDistance * index;
    
    carousel.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
    });
}

function updateActiveDot() {
    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const scrollDistance = getScrollDistance();
    
    let currentIndex;
    
    if (scrollLeft >= maxScroll - 1) {
        currentIndex = totalCards - 1;
    } else if (scrollLeft <= 1) {
        currentIndex = 0;
    } else {
        currentIndex = Math.round(scrollLeft / scrollDistance);
    }
    
    currentIndex = Math.max(0, Math.min(currentIndex, totalCards - 1));
    
    const dots = dotIndicator.querySelectorAll('.scroll-dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function getScrollDistance() {
    const card = carousel.querySelector('.testimonial-card');
    const cardWidth = card.offsetWidth;
    const gap = 16;
    return cardWidth + gap;
}

btnNext.addEventListener('click', () => {
    const scrollDistance = getScrollDistance();
    carousel.scrollBy({
        left: scrollDistance,
        behavior: 'smooth'
    });
});

btnPrev.addEventListener('click', () => {
    const scrollDistance = getScrollDistance();
    carousel.scrollBy({
        left: -scrollDistance,
        behavior: 'smooth'
    });
});

function updateButtonStates() {
    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    btnPrev.style.opacity = scrollLeft <= 0 ? '0.5' : '1';
    btnPrev.style.cursor = scrollLeft <= 0 ? 'not-allowed' : 'pointer';
    
    btnNext.style.opacity = scrollLeft >= maxScroll - 1 ? '0.5' : '1';
    btnNext.style.cursor = scrollLeft >= maxScroll - 1 ? 'not-allowed' : 'pointer';
}

carousel.addEventListener('scroll', () => {
    updateButtonStates();
    updateActiveDot();
});

generateDots();
updateButtonStates();
updateActiveDot();