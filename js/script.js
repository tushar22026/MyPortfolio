// Custom JavaScript for Nahidur Rahman Tushar's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // 1. Typed.js for Home Section Subtitle
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: [
                "ICT Student",
                "Tech Enthusiast",
                "Project Maker",
                "Web Developer",
                "Competitive Programmer"
            ],
            typeSpeed: 70,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }

    // 2. Active Navbar Link on Scroll
    // Using IntersectionObserver for better performance than scroll event
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.7 // Highlight when 70% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to the corresponding nav link
                const currentSectionId = entry.target.id;
                const correspondingLink = document.querySelector(`.navbar-nav .nav-link[href="#${currentSectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Handle smooth scroll for nav links (Bootstrap handles this for data-bs-target)
    // This custom part is mainly for ensuring the active state logic works with observers.
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });


    // 3. Reveal Elements on Scroll (IntersectionObserver)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the item is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Back to Top Button visibility
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Bootstrap's scrollspy handles smooth scroll for the link itself.
        // No extra JS needed for #home link if href="#home" is used.
    }
});
