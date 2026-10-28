document.addEventListener("DOMContentLoaded", () => {
    
    const modal = document.getElementById("lead-capture-modal");
    const leadForm = document.getElementById("lead-form");
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");

    // --- 1. LEAD CAPTURE & FAST UNLOCK LOGIC ---
    
    // Function to unlock the site instantly
    function unlockSite() {
        modal.classList.add("hidden"); // Hide form instantly
        localStorage.setItem("flowboy_unlocked", "true"); // Remember them
        
        // Start the glowing logo preloader ONLY AFTER they unlock
        setTimeout(() => {
            preloader.classList.add("hidden");
            mainContent.classList.add("show");
            setTimeout(initAnimations, 500); 
        }, 2000); // 2 seconds for the logo to pulse
    }

    // Check if they already unlocked it in the past
    if (localStorage.getItem("flowboy_unlocked") === "true") {
        modal.classList.add("hidden");
        // If already unlocked, just show the preloader and site normally
        setTimeout(() => {
            preloader.classList.add("hidden");
            mainContent.classList.add("show");
            setTimeout(initAnimations, 500); 
        }, 2000);
    }

    // When they click Submit
    leadForm.addEventListener("submit", function(e) {
        e.preventDefault(); 
        
        // 1. UNLOCK THE SITE IMMEDIATELY (No waiting!)
        unlockSite();

        // 2. SEND THE EMAIL IN THE BACKGROUND
        const formData = new FormData(leadForm);
        fetch("https://formsubmit.co/ajax/yumarfaruq81@gmail.com", {
            method: "POST",
            body: formData
        }).catch(error => console.log("Email sending failed in background"));
    });


    // --- 2. TYPEWRITER EFFECT ---
    const typewriterElement = document.querySelector(".typewriter-text");
    const phrases = ["Web Developer. ", "UI/UX Designer. ", "Flowboy 😎. ", "Problem Solver. "];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if(!typewriterElement) return; // Safety check
        
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

    // --- 3. SCROLL ANIMATIONS ---
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