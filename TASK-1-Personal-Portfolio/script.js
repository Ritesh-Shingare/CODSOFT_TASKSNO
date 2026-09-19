const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".right");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }
});

const navLinks = document.querySelectorAll(".right a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    document.querySelector("#form-status").textContent = "";

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    const errorMessages = document.querySelectorAll(".error-message");

    errorMessages.forEach((error) => {
        error.textContent = "";
    });

    let isValid = true;

    if (name.value.trim() === "") {
        name.nextElementSibling.textContent = "Please enter your name.";
        isValid = false;
    }
    if (email.value.trim() === "") {
        email.nextElementSibling.textContent = "Please enter your email.";
        isValid = false;
    } else if (!email.value.includes("@")) {
        email.nextElementSibling.textContent = "Please enter valid email.";
        isValid = false;
    }
    if (message.value.trim() === "") {
        message.nextElementSibling.textContent = "Please enter your message.";
        isValid = false;
    } else if (message.value.trim().length < 10) {
        message.nextElementSibling.textContent = 
        "Message must be at least 10 characters.";
        isValid = false;
    }
    if (isValid) {
        document.querySelector("#form-status").textContent = 
        "Message submitted successfully";

        contactForm.reset();
    }
});

const scrollTopBtn = document.querySelector("#scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = "block";
    }else{
        scrollTopBtn.style.display = "none";
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
