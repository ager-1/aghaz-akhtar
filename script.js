document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navigation Blur Effect
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });


    // 2. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 3. 3D Tilt Effect on Project Cards
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        const inner = card.querySelector('.card-inner');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 15 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            // Apply transform to inner card, not the wrapper to preserve perspective
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            inner.style.boxShadow = `
                ${(x - centerX) / 10 * -1}px 
                ${(y - centerY) / 10 * -1 + 10}px 
                30px rgba(0, 242, 254, 0.2)
            `;
        });

        // Reset transform on mouse leave
        card.addEventListener('mouseleave', () => {
            inner.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            inner.style.boxShadow = `none`;
        });
    });


    // 4. Parallax Background Orbs
    const orbs = document.querySelectorAll('.orb');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 30;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            // Using transform translate instead of left/top for better performance
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});
