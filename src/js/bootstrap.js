import ImageLoader from './lib/ImageLoader';
import StylesSwitcher from './lib/StylesSwitcher';
import Slides from './lib/Slides';

var openNewTab = function(event) {
  event.preventDefault();
  window.open(event.target.getAttribute('href'));
};

export function run() {
  var about;
  var body;
  var loadingQueue = [];
  var slides;
  var stylesSwitcher;

  // Get body element
  body = document.querySelector('body');

  // Remove `loaded` class
  body.classList.remove('loaded');

  // Print some info for curious
  about = document.querySelector('html').childNodes[0];

  if (about.nodeType === 8) {
    console.info(about.nodeValue);
  }

  // Load slide backgrounds first
  slides = new Slides();

  slides.forEach(elem => {
    let style = elem.currentStyle || window.getComputedStyle(elem, false);

    if (style.backgroundImage.slice(0, 3) === 'url') {
      style = style.backgroundImage.slice(4, -1);

      if (style[0] === '\'' || style[0] === '"') {
        style = style.slice(1, -1);
      }

      style = new ImageLoader(style);
      loadingQueue.push(style.promise);
    }
  });

  // Load all images, then set class `loaded` to the body
  Promise.all(loadingQueue).then(value => {
    body.classList.add('loaded');
  });

  // Open all `nofollow` links in the new tab
  document.querySelectorAll('a[rel="nofollow"]').forEach(elem => {
    elem.addEventListener('click', openNewTab);
  });

  // Initialize stylesSwitcher
  stylesSwitcher = new StylesSwitcher();

  window.setMarkdownMode = status => {
    let styleName = status ? 'markdown' : 'default';
    stylesSwitcher.setStyle(styleName);
  };
}

NodeList.prototype.forEach = Array.prototype.forEach;

/**
 * Force trigger window event.
 *
 * @param  {String}    typeArg    defining the name of event.
 * @param  {EventInit} eventInit  dictionary, having the following fields:
 *                                - "bubbles", optional and defaulting to false,
 *                                  of type Boolean, indicating if the event
 *                                  bubbles or not.
 *                                - "cancelable", optional and defaulting to
 *                                  false, of type Boolean, indicating if the
 *                                  event can be canceled or not.
 */
window.trigger = function(typeArg, eventInit) {
  var event = new Event(typeArg, eventInit);
  var canceled = !window.dispatchEvent(event);

  return canceled;
};

