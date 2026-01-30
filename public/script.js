// ===== Welcome Overlay =====
document.addEventListener('DOMContentLoaded', function() {
  const welcomeOverlay = document.getElementById('welcomeOverlay');
  const enterButton = document.getElementById('enterSite');
  const mainContent = document.getElementById('mainContent');
  const header = document.getElementById('header');
  
  // Hide main content initially
  if (mainContent) {
    mainContent.style.opacity = '0';
  }
  if (header) {
    header.style.opacity = '0';
  }
  
  // Enter site on button click
  enterButton.addEventListener('click', function() {
    welcomeOverlay.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    
    // Fade in main content
    setTimeout(function() {
      if (mainContent) {
        mainContent.style.transition = 'opacity 0.8s ease';
        mainContent.style.opacity = '1';
      }
      if (header) {
        header.style.transition = 'opacity 0.6s ease';
        header.style.opacity = '1';
      }
      
      // Trigger initial reveal animations
      setTimeout(revealElements, 300);
      
      // Start counting animation
      animateCounters();
    }, 400);
  });
  
  // Allow pressing Enter to enter site
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !welcomeOverlay.classList.contains('hidden')) {
      enterButton.click();
    }
  });
  
  // Set initial state
  document.body.classList.add('no-scroll');
});

// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(function(section) {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinksAll.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Scroll Reveal Animation =====
function revealElements() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const windowHeight = window.innerHeight;
  
  reveals.forEach(function(element) {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealElements);

// ===== Counter Animation =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(function(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    function updateCounter() {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    }
    
    updateCounter();
  });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    formData.forEach(function(value, key) {
      data[key] = value;
    });
    
    // Show success message (you can replace this with actual form submission)
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<span>Message Sent!</span>';
    button.style.background = '#25D366';
    button.disabled = true;
    
    setTimeout(function() {
      button.innerHTML = originalText;
      button.style.background = '';
      button.disabled = false;
      contactForm.reset();
    }, 3000);
    
    console.log('Form submitted:', data);
  });
}

// ===== Image Parallax Effect =====
const heroImage = document.querySelector('.hero-image');

if (heroImage) {
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.3;
    
    if (scrolled < window.innerHeight) {
      heroImage.style.transform = 'scale(1.1) translateY(' + (scrolled * parallaxSpeed) + 'px)';
    }
  });
}

// ===== Service Card Tilt Effect =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', function() {
    card.style.transform = '';
  });
});

// ===== Intersection Observer for lazy animations =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(function(el) {
  observer.observe(el);
});
