export default function() {
  var slides = document.querySelectorAll('.slide');
  var breakpoints = [];
  var breakpointIndex = 0;

  window.addEventListener('resize', onResize);
  window.trigger('resize');

  return slides;

  function onResize(event) {
    // Get breakpoints, when next slide is showing up
    breakpoints = [].map.call(slides, elem => {
      return elem.offsetTop - window.innerHeight;
    });

    // Bind onScroll event
    window.addEventListener('scroll', onScroll);

    // `onScroll` event is triggered only when scrollY is not 0
    if (window.scrollY === 0) {
      window.trigger('scroll');
    }
  }

  function onScroll(event) {
    while (breakpoints[breakpointIndex + 1] < window.scrollY) {
      slides[breakpointIndex].classList.add('slide-enter-end', 'slide-enter');

      if (++breakpointIndex === breakpoints.length) {
        window.removeEventListener('scroll', onScroll);
        break;
      }
    }

    if (breakpoints[breakpointIndex] < window.scrollY) {
      slides[breakpointIndex].classList.add('slide-enter');
    }
  }
}
