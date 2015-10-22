export default function() {
  var evt;
  var slides = document.querySelectorAll('.slide');
  var breakpoints = [];

  window.addEventListener('resize', event => {
    breakpoints = [].map.call(slides, elem => {
      return elem.offsetTop;
    });

    window.trigger('scroll');
  });

  window.addEventListener('scroll', event => {
    console.log(event);
  });

  window.trigger('resize');

  return slides;
}

window.trigger = function(type, canBubble, cancelable, view, detail) {
  var event = window.document.createEvent('UIEvents');

  canBubble = canBubble || true;
  cancelable = cancelable || false;
  view = view || window;
  detail = detail || 0;

  event.initUIEvent(type, canBubble, cancelable, view, detail);
  window.dispatchEvent(event);
};
