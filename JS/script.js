$(document).ready(function(){
  // ========== Dark Mode Toggle ==========
  const darkModeToggle = $('#darkModeToggle');
  const sunIcon = $('#sunIcon');
  const moonIcon = $('#moonIcon');
  const html = $('html');
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    html.attr('data-theme', 'dark');
    sunIcon.show();
    moonIcon.hide();
  } else {
    html.attr('data-theme', 'light');
    sunIcon.hide();
    moonIcon.show();
  }

  // Toggle dark mode
  darkModeToggle.on('click', function() {
    const currentTheme = html.attr('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.attr('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animate icon transition
    if (newTheme === 'dark') {
      moonIcon.fadeOut(200, function() {
        sunIcon.fadeIn(200);
      });
    } else {
      sunIcon.fadeOut(200, function() {
        moonIcon.fadeIn(200);
      });
    }
  });

  // ========== Enhanced Skills Section Animation ==========
  function isHalfInViewport(element) {
    const elementTop = $(element).offset().top;
    const elementHeight = $(element).outerHeight();
    const elementMid = elementTop + elementHeight / 2;
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    return elementMid > viewportTop && elementMid < viewportBottom;
  }

  const $section = $('#skills-section');
  let triggered = false;

  $(window).on('scroll load', function() {
    if (!triggered && isHalfInViewport($section)) {
      // Enhanced animation with stagger effect
      $section.find('.card').each(function(index) {
        const $card = $(this);
        const $img = $card.find('img');
        const $collapse = $card.find('.collapse');
        
        // Initial state
        $card.css({
          opacity: 0,
          transform: 'translateY(50px) scale(0.9)',
          transition: 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        });
        
        if ($img.length) {
          $img.css({
            opacity: 0,
            transform: 'translateX(-40px) scale(0.85)',
            transition: 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          });
        }

        // Animate card entrance with stagger
        setTimeout(() => {
          $card.css({
            opacity: 1,
            transform: 'translateY(0) scale(1)'
          }).addClass('animate-in');
          
          // Animate image with slight delay
          if ($img.length) {
            setTimeout(() => {
              $img.css({
                opacity: 1,
                transform: 'translateX(0) scale(1)'
              });
            }, 150);
          }
          
          // Show collapse content with delay
          if ($collapse.length) {
            setTimeout(() => {
              const collapseEl = new bootstrap.Collapse($collapse[0], {toggle: false});
              collapseEl.show();
            }, 300);
          }
        }, index * 250);
      });

      triggered = true;
    }
  });

  // ========== Smooth Scroll Enhancement ==========
  $('a[href^="#"]').on('click', function(e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 70
      }, 1000, 'easeInOutCubic');
    }
  });

  // Custom easing function for smoother scroll
  $.easing.easeInOutCubic = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  };

  // ========== Intersection Observer for Fade-in Animations ==========
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for multiple sections
        setTimeout(() => {
          $(entry.target).css({
            opacity: 1,
            transform: 'translateY(0)'
          });
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all full-page sections
  $('.full-page').each(function() {
    const $section = $(this);
    $section.css({
      opacity: 0,
      transform: 'translateY(40px)',
      transition: 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
    observer.observe(this);
  });
});
