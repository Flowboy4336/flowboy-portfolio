document.addEventListener("DOMContentLoaded", () => {
    
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");
    const modal = document.getElementById("lead-capture-modal");
    const leadForm = document.getElementById("lead-form");

    // --- 1. INITIAL LOAD LOGIC ---
    // If they already unlocked it, show logo then site. 
    // If they haven't, show the form immediately.
    if (localStorage.getItem("flowboy_unlocked") === "true") {
        // Returning user: Show logo, then site
        setTimeout(() => {
            preloader.classList.add("hidden");
            mainContent.classList.add("show");
            setTimeout(initAnimations, 500); 
        }, 2000);
    } else {
        // New user: Hide preloader immediately, show form
        preloader.classList.add("hidden");
        modal.classList.remove("hidden"); 
    }

    // --- 2. SUBMIT FORM LOGIC ---
    leadForm.addEventListener("submit", function(e) {
        e.preventDefault(); 
        
        // 1. Hide the form instantly
        modal.classList.add("hidden");

        // 2. Show the glowing logo preloader
        preloader.classList.remove("hidden");

        // 3. Send the email silently in the background
        const formData = new FormData(leadForm);
        fetch("https://formsubmit.co/ajax/yumarfaruq81@gmail.com", {
            method: "POST",
            body: formData
        }).catch(error => console.log("Email sent in background."));

        // 4. Wait 2 seconds for the logo, THEN show the portfolio
        setTimeout(() => {
            preloader.classList.add("hidden");
            mainContent.classList.add("show");
            localStorage.setItem("flowboy_unlocked", "true"); // Remember them for next time
            initAnimations(); // Start the scroll animations
        }, 2000); 
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