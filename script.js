// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Common variables
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar.offsetHeight;
  
  // Navbar scroll effect with throttling
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      navbar.classList.toggle('fully-scrolled', window.scrollY > 200);
    } else {
      navbar.classList.remove('scrolled', 'fully-scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });

  // Enhanced smooth scrolling for all anchor links
  function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    history.pushState(null, null, targetId);
    window.scrollTo({
      top: targetElement.offsetTop - navbarHeight + 1,
      behavior: 'smooth'
    });
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === targetId);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScrollTo(this.getAttribute('href'));
    });
  });

  // Initialize AOS animation
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: 'ease-in-out-quad',
      mirror: false
    });
  }

  // Initialize Typed.js
  if (document.getElementById('typing-text') && typeof Typed !== 'undefined') {
    try {
      new Typed('#typing-text', {
        strings: [
          "MERN Fullstack Developer", 
          "Freelancer", 
          "Web Application Specialist", 
          "JavaScript Expert",
          "Problem Solver"
        ],
        typeSpeed: 45,
        backSpeed: 25,
        startDelay: 300,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
      });
    } catch (e) {
      console.error('Typed.js initialization error:', e);
    }
  }

  // Set current year in footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      backToTopButton.classList.toggle('show', window.scrollY > 300);
    });
    
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Counter animation for stats section
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const statsSection = document.querySelector('#stats');
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const speed = 200;
        
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const increment = target / speed;
          let count = 0;
          
          const updateCounter = () => {
            count = Math.min(count + increment, target);
            counter.textContent = Math.floor(count);
            
            if (count < target) {
              requestAnimationFrame(updateCounter);
            } else if (counter.nextElementSibling?.textContent === 'K+') {
              counter.textContent = target;
            }
          };
          
          updateCounter();
        });
        
        observer.unobserve(statsSection);
      }
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }

  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const submitText = submitBtn.querySelector('.submit-text');
      const spinner = submitBtn.querySelector('.spinner-border');
      
      submitText.textContent = 'Sending...';
      spinner.classList.remove('d-none');
      submitBtn.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        submitText.textContent = 'Message Sent!';
        spinner.classList.add('d-none');
        submitBtn.classList.replace('btn-primary', 'btn-success');
        
        setTimeout(() => {
          this.reset();
          submitBtn.classList.replace('btn-success', 'btn-primary');
          submitText.textContent = 'Send Message';
          submitBtn.disabled = false;
          
          if (typeof Swal !== 'undefined') {
            Swal.fire({
              icon: 'success',
              title: 'Message Sent!',
              text: 'Thank you for reaching out. I will get back to you soon.',
              confirmButtonColor: '#0d6efd'
            });
          }
        }, 3000);
      }, 2000);
    });
  }

  // footer section
  
  // Initialize tooltips
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
});

// Set current year
document.getElementById('currentYear').textContent = new Date().getFullYear();
  
// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    console.log('Subscribed email:', emailInput.value);
    
    // Show success message (requires SweetAlert library)
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Subscribed!',
        text: 'Thank you for subscribing to our newsletter.',
        confirmButtonColor: '#6c63ff'
      });
    }
    
    emailInput.value = '';
  });
}