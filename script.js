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

    // 5. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 6. Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-row');

    if (filterBtns.length > 0 && workItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                workItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'flex';
                        // Re-trigger animation if needed
                        item.classList.remove('active');
                        setTimeout(() => item.classList.add('active'), 10);
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'flex';
                            item.classList.remove('active');
                            setTimeout(() => item.classList.add('active'), 10);
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});
