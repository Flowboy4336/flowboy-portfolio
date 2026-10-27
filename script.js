document.addEventListener("DOMContentLoaded", () => {
    
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");

    // 1. LOGO PRELOADER LOGIC
    setTimeout(() => {
        preloader.classList.add("hidden");
        mainContent.classList.add("show");
        
        setTimeout(initAnimations, 500); 
    }, 2000); 

    // 2. TYPEWRITER EFFECT (Endless Loop)
    const typewriterElement = document.querySelector(".typewriter-text");
    
    const phrases = [
        "Web Developer. ", 
        "UI/UX Designer. ", 
        "Flowboy 😎. ", 
        "Problem Solver. "
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } 
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 2500);

    // 3. SCROLL ANIMATION LOGIC
    function initAnimations() {
        const faders = document.querySelectorAll('.fade-in');
        
        const appearOptions = {
            threshold: 0.1, 
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('appear');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }
});