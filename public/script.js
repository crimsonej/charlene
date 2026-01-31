// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  initHeaderScroll();
  initSmoothScroll();
  initArtistModals();
  initContactForm();
  initMobileMenu();
  initCounterAnimation();
  initScrollAnimations();
});

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  const navLogo = document.querySelector('.nav-logo');
  const heroLogo = document.querySelector('.hero-logo');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    // Add scrolled class to header
    if (scrollPosition > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Scale hero logo as user scrolls
    if (heroLogo) {
      const scale = Math.max(0.4, 1 - (scrollPosition / heroHeight * 0.6));
      const opacity = Math.max(0, 1 - (scrollPosition / heroHeight * 2));
      
      heroLogo.style.transform = `scale(${scale})`;
      heroLogo.style.opacity = opacity;
    }
    
    // Show nav logo after scrolling past hero
    if (scrollPosition > heroHeight * 0.7) {
      navLogo.style.opacity = '1';
      navLogo.style.transform = 'translateY(0)';
    } else {
      navLogo.style.opacity = '0';
      navLogo.style.transform = 'translateY(-20px)';
    }
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate header height
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active nav link
        updateActiveNavLink(targetId);
      }
    });
  });
  
  function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
  }
}

// Artist modals
function initArtistModals() {
  const artistCards = document.querySelectorAll('.artist-card, .artist-button');
  const modals = document.querySelectorAll('.artist-modal');
  const closeButtons = document.querySelectorAll('.modal-close');
  
  // Open modal
  artistCards.forEach(element => {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const artistId = this.getAttribute('data-artist');
      const modal = document.getElementById(`artistModal${artistId}`);
      
      if (modal) {
        openModal(modal);
      }
    });
  });
  
  // Close modal
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.artist-modal');
      closeModal(modal);
    });
  });
  
  // Close on overlay click
  modals.forEach(modal => {
    modal.querySelector('.modal-overlay').addEventListener('click', function() {
      closeModal(modal);
    });
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });
  
  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add animation class to modal container
    setTimeout(() => {
      modal.querySelector('.modal-container').style.transform = 'translate(-50%, -50%) scale(1)';
      modal.querySelector('.modal-container').style.opacity = '1';
    }, 10);
  }
  
  function closeModal(modal) {
    modal.querySelector('.modal-container').style.transform = 'translate(-50%, -50%) scale(0.9)';
    modal.querySelector('.modal-container').style.opacity = '0';
    
    setTimeout(() => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }, 400);
  }
}

// Contact form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      // In production, this would be an actual API call
      // For demo purposes, we'll simulate success
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo
      
      if (isSuccess) {
        // Success feedback
        formFeedback.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
        formFeedback.className = 'form-feedback success';
        
        // Clear form
        contactForm.reset();
        
        // Log data (in production, this would go to your server)
        console.log('Contact form data received:', data);
        console.log(`
          DATA RECEPTION SOLUTION:
          -------------------------
          To handle form submissions in production:
          1. Create a server endpoint (e.g., /api/contact)
          2. Send data via fetch/axios
          3. Store in database and/or forward to email
          4. Recommended services: Formspree, Netlify Forms, or custom backend
          
          Example using Formspree:
          - Change form action to: action="https://formspree.io/f/YOUR_FORM_ID"
          - Add method="POST"
          - Formspree will forward submissions to your email
        `);
      } else {
        // Error feedback
        formFeedback.textContent = 'Something went wrong. Please try again or contact us directly at african-georgianhouse@gmail.com';
        formFeedback.className = 'form-feedback error';
      }
      
      // Reset button
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      
      // Hide feedback after 5 seconds
      setTimeout(() => {
        formFeedback.style.opacity = '0';
        setTimeout(() => {
          formFeedback.className = 'form-feedback';
          formFeedback.style.opacity = '1';
          formFeedback.textContent = '';
        }, 500);
      }, 5000);
    }, 1500);
  });
}

// Mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (!mobileMenuBtn || !navLinks) return;
  
  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Animated counter
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length === 0) return;
  
  let hasAnimated = false;
  
  function startCounters() {
    if (hasAnimated) return;
    hasAnimated = true;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const increment = target / (duration / 16);
      
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }
  
  // Start when stats come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        startCounters();
      }
    });
  }, { threshold: 0.5 });
  
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

// Scroll animations for sections
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  // Observe all cards for animation
  document.querySelectorAll('.about-card, .service-card, .coffee-highlight, .artist-card, .mission-card').forEach(card => {
    observer.observe(card);
  });
}

// Initialize everything
console.log('African-Georgian House website initialized successfully!');

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  initHeaderScroll();
  initSmoothScroll();
  initArtistModals();
  initContactForm();
  initMobileMenu();
  initCounterAnimation();
  initScrollAnimations();
});

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  const navLogo = document.querySelector('.nav-logo');
  const heroLogo = document.querySelector('.hero-logo');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    // Add scrolled class to header
    if (scrollPosition > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Scale hero logo as user scrolls
    if (heroLogo) {
      const scale = Math.max(0.4, 1 - (scrollPosition / heroHeight * 0.6));
      const opacity = Math.max(0, 1 - (scrollPosition / heroHeight * 2));
      
      heroLogo.style.transform = `scale(${scale})`;
      heroLogo.style.opacity = opacity;
    }
    
    // Show nav logo after scrolling past hero
    if (scrollPosition > heroHeight * 0.7) {
      navLogo.style.opacity = '1';
      navLogo.style.transform = 'translateY(0)';
    } else {
      navLogo.style.opacity = '0';
      navLogo.style.transform = 'translateY(-20px)';
    }
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate header height
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active nav link
        updateActiveNavLink(targetId);
      }
    });
  });
  
  function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
  }
}

// Artist modals
function initArtistModals() {
  const artistCards = document.querySelectorAll('.artist-card, .artist-button');
  const modals = document.querySelectorAll('.artist-modal');
  const closeButtons = document.querySelectorAll('.modal-close');
  
  // Open modal
  artistCards.forEach(element => {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const artistId = this.getAttribute('data-artist');
      const modal = document.getElementById(`artistModal${artistId}`);
      
      if (modal) {
        openModal(modal);
      }
    });
  });
  
  // Close modal
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.artist-modal');
      closeModal(modal);
    });
  });
  
  // Close on overlay click
  modals.forEach(modal => {
    modal.querySelector('.modal-overlay').addEventListener('click', function() {
      closeModal(modal);
    });
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });
  
  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add animation class to modal container
    setTimeout(() => {
      modal.querySelector('.modal-container').style.transform = 'translate(-50%, -50%) scale(1)';
      modal.querySelector('.modal-container').style.opacity = '1';
    }, 10);
  }
  
  function closeModal(modal) {
    modal.querySelector('.modal-container').style.transform = 'translate(-50%, -50%) scale(0.9)';
    modal.querySelector('.modal-container').style.opacity = '0';
    
    setTimeout(() => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }, 400);
  }
}

// Contact form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      // In production, this would be an actual API call
      // For demo purposes, we'll simulate success
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo
      
      if (isSuccess) {
        // Success feedback
        formFeedback.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
        formFeedback.className = 'form-feedback success';
        
        // Clear form
        contactForm.reset();
        
        // Log data (in production, this would go to your server)
        console.log('Contact form data received:', data);
        console.log(`
          DATA RECEPTION SOLUTION:
          -------------------------
          To handle form submissions in production:
          1. Create a server endpoint (e.g., /api/contact)
          2. Send data via fetch/axios
          3. Store in database and/or forward to email
          4. Recommended services: Formspree, Netlify Forms, or custom backend
          
          Example using Formspree:
          - Change form action to: action="https://formspree.io/f/YOUR_FORM_ID"
          - Add method="POST"
          - Formspree will forward submissions to your email
        `);
      } else {
        // Error feedback
        formFeedback.textContent = 'Something went wrong. Please try again or contact us directly at african-georgianhouse@gmail.com';
        formFeedback.className = 'form-feedback error';
      }
      
      // Reset button
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      
      // Hide feedback after 5 seconds
      setTimeout(() => {
        formFeedback.style.opacity = '0';
        setTimeout(() => {
          formFeedback.className = 'form-feedback';
          formFeedback.style.opacity = '1';
          formFeedback.textContent = '';
        }, 500);
      }, 5000);
    }, 1500);
  });
}

// Mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (!mobileMenuBtn || !navLinks) return;
  
  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Animated counter
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length === 0) return;
  
  let hasAnimated = false;
  
  function startCounters() {
    if (hasAnimated) return;
    hasAnimated = true;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const increment = target / (duration / 16);
      
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }
  
  // Start when stats come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        startCounters();
      }
    });
  }, { threshold: 0.5 });
  
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

// Scroll animations for sections
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  // Observe all cards for animation
  document.querySelectorAll('.about-card, .service-card, .coffee-highlight, .artist-card, .mission-card').forEach(card => {
    observer.observe(card);
  });
}

// Initialize everything
console.log('African-Georgian House website initialized successfully!');