document.addEventListener("DOMContentLoaded", () => {
    
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");
    const modal = document.getElementById("lead-capture-modal");
    const leadForm = document.getElementById("lead-form");

    // --- 1. INITIAL LOAD LOGIC ---
    if (localStorage.getItem("flowboy_unlocked") === "true") {
        // Returning user: Show logo, then site
        setTimeout(() => {
            preloader.classList.add("hidden");
            mainContent.classList.add("show");
            setTimeout(initAnimations, 500); 
        }, 2000);
    } else {
        // New user: Hide preloader immediately, show the form
        preloader.classList.add("hidden");
        modal.classList.remove("hidden"); 
    }

    // --- 2. SUBMIT FORM LOGIC (INSTANT UNLOCK) ---
    leadForm.addEventListener("submit", function(e) {
        e.preventDefault(); 
        
        // 1. INSTANTLY Hide the form and show the logo
        modal.classList.add("hidden");
        preloader.classList.remove("hidden");

        // 2. Send the email silently in the background
        const formData = new FormData(leadForm);
        fetch("https://formsubmit.co/ajax/yumarfaruq81@gmail.com", {
            method: "POST",
            body: formData
        }).catch(error => console.log("Email sent in background."));

        // 3. Show the logo for 1.5 seconds (nice smooth transition)
        setTimeout(() => {
            preloader.classList.add("hidden");
            mainContent.classList.add("show");
            localStorage.setItem("flowboy_unlocked", "true"); // Remember them
            initAnimations(); // Start scroll animations
        }, 1500); // Reduced to 1.5 seconds for speed
    });

    // --- 3. TYPEWRITER EFFECT ---
    const typewriterElement = document.querySelector(".typewriter-text");
    const phrases = ["Web Developer. ", "UI/UX Designer. ", "Flowboy 😎. ", "Problem Solver. "];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if(!typewriterElement) return; 
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
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 2500);

    // --- 4. SCROLL ANIMATIONS ---
    function initAnimations() {
        const faders = document.querySelectorAll('.fade-in');
        const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);
        faders.forEach(fader => appearOnScroll.observe(fader));
    }
});