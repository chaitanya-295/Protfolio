/**
 * Portfolio V2 Custom JavaScript Logic
 * Powered by Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Dynamic Copyright Year
  const copyrightYear = document.getElementById('copyrightYear');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // 2. Navbar Scroll Behavior (Add shadow & minimize height)
  const navbar = document.querySelector('.custom-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Smooth Scrolling and Auto Collapse Mobile Menu
  const navLinks = document.querySelectorAll('.custom-nav-link, .navbar-brand');
  const navbarCollapse = document.getElementById('navbarNav');
  let bsCollapse = null;
  if (navbarCollapse) {
    bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // If it's a valid anchor link
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 85;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }

        // Close mobile dropdown if open
        if (navbarCollapse && navbarCollapse.classList.contains('show') && bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // 4. Scroll Spying (Highlight active nav link on scroll)
  const sections = document.querySelectorAll('section[data-section-name]');
  const scrollSpy = () => {
    const scrollPos = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}` || link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', scrollSpy);

  // 5. Skills Progress Bar Animation (Triggers when visible)
  const skillsSection = document.getElementById('skills');
  const progressFills = document.querySelectorAll('.progress-bar-fill');
  let animated = false;

  const animateSkills = () => {
    if (!skillsSection) return;
    
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = rect.top <= window.innerHeight - 100 && rect.bottom >= 0;

    if (isVisible && !animated) {
      progressFills.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage;
      });
      animated = true; // Animate only once
    }
  };

  // Run on load and on scroll
  window.addEventListener('scroll', animateSkills);
  animateSkills();

  // 6. Interactive Contact Form Validation and Alert
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameVal = document.getElementById('contactName').value.trim();
      const emailVal = document.getElementById('contactEmail').value.trim();
      const messageVal = document.getElementById('contactMessage').value.trim();

      if (nameVal && emailVal && messageVal) {
        // Create a beautiful premium success feedback alert
        alert(`Thank you, ${nameVal}! Your message has been received. I will contact you shortly at ${emailVal}.`);
        contactForm.reset();
      }
    });
  }

  // 7. Interactive Project Category Filtering
  const filterButtons = document.querySelectorAll('.filter-tabs .btn-filter');
  const projectItems = document.querySelectorAll('.project-grid .project-item');

  if (filterButtons.length > 0 && projectItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const selectedFilter = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');

          // Reset animation classes
          item.classList.remove('fade-in-project');

          if (selectedFilter === 'all' || itemCategory === selectedFilter) {
            item.classList.remove('d-none');
            // Force browser reflow to restart CSS animation
            void item.offsetWidth;
            item.classList.add('fade-in-project');
          } else {
            item.classList.add('d-none');
          }
        });
      });
    });
  }

});