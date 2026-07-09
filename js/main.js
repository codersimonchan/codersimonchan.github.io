$(document).ready(function() {

  function collapseCoverPanel() {
    $('.main-post-list').removeClass('hidden');
    if (!$('.panel-cover').hasClass('panel-cover--collapsed')) {
      currentWidth = $('.panel-cover').width();
      if (currentWidth < 2000) {
        $('.panel-cover').addClass('panel-cover--collapsed');
      } else {
        $('.panel-cover').css('max-width', currentWidth);
        $('.panel-cover').animate({'max-width': '320px', 'width': '22%'}, 400, swing = 'swing', function() {});
      }
    }
  }

  $('a.blog-button').click(function() {
    // If already in blog, return early without animate overlay panel again.
    if (location.hash && location.hash == "#blog") return;
    collapseCoverPanel();
  });

  if (window.location.hash && window.location.pathname === "/") {
    collapseCoverPanel();
  }

  if (window.location.pathname.substring(0, 5) == "/tag/") {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  $('.btn-mobile-menu__icon').click(function() {
    // 导航按钮被点击
    // this.style.backgroundColor = '#fff'; 设置颜色后会自动消失
    var href = $(this).attr('href');
    if (href && href.indexOf('/#') === 0) {
      collapseCoverPanel();
    }
  });  

  $('.navigation__item a').click(function() {
    var href = $(this).attr('href');
    if (href && href.indexOf('/#') === 0) {
      collapseCoverPanel();
    }
  });

  $('a[href^="/#"]').click(function(e) {
    var href = $(this).attr('href');
    if (!href || href.length < 3) return;
    var targetId = href.substring(2);
    var $target = $('#' + targetId);
    if ($target.length === 0) return;
    e.preventDefault();
    collapseCoverPanel();
    $('html, body').animate({ scrollTop: $target.offset().top - 18 }, 420);
    if (history && history.replaceState) {
      history.replaceState(null, '', '/#' + targetId);
    }
  });

  function initRevealOnScroll() {
    var revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window) || revealElements.length === 0) {
      $('.reveal-on-scroll').addClass('is-visible');
      return;
    }

    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function(el, idx) {
      el.style.transitionDelay = Math.min(idx * 40, 220) + 'ms';
      observer.observe(el);
    });
  }

  initRevealOnScroll();
});