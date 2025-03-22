// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute('href'); // Get the target section ID
    const targetSection = document.querySelector(targetId); // Find the target section

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth', // Smooth scroll
        block: 'start' // Align to the top of the section
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled'); // Add 'scrolled' class when scrolled past 50px
  } else {
    navbar.classList.remove('scrolled'); // Remove 'scrolled' class when at the top
  }
});

// Add fade-in animations to sections on scroll
const sections = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Add 'visible' class when section is in view
      observer.unobserve(entry.target); // Stop observing once the section is visible
    }
  });
}, {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 0.1 // Trigger when 10% of the section is visible
});

// Observe all sections with the 'fade-in' class
sections.forEach(section => {
  observer.observe(section);
});



