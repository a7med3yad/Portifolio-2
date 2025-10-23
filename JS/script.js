$(document).ready(function(){
  function isHalfInViewport(element) {
    const elementTop = $(element).offset().top;
    const elementHeight = $(element).outerHeight();
    const elementMid = elementTop + elementHeight / 2; // منتصف العنصر
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    return elementMid > viewportTop && elementMid < viewportBottom;
  }

  const $section = $('#skills-section');
  let triggered = false; // لمرة واحدة

  $(window).on('scroll load', function() {
    if (!triggered && isHalfInViewport($section)) {
      // Section's half visible - show cards one by one with fade + slide effect
      $section.find('.collapse').each(function(index){
        var collapseEl = new bootstrap.Collapse(this, {toggle: false});
        const $img = $(this).siblings('img'); 
        $img.css({opacity: 0, transform: 'translateX(-20px)'}); // البداية

        setTimeout(() => {
          collapseEl.show(); 
          $img.animate({opacity: 1}, { 
            step: function(now, fx) { 
              $(this).css('transform', `translateX(${(1-now)*-20}px)`);
            }, 
            duration: 500 
          }); 
        }, index * 300);
      });

      triggered = true; // بعد التنفيذ لن يعاد مرة أخرى
    }
  });
});
