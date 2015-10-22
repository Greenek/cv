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
  body.setAttribute('class', body.getAttribute('class').replace('loaded', ''));

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
      style = style.backgroundImage.slice(5, -2);
      style = new ImageLoader(style);
      loadingQueue.push(style.promise);
    }
  });

  // Load all images, then set class `loaded` to the body
  Promise.all(loadingQueue).then(value => {
    body.setAttribute('class', (body.getAttribute('class') + ' loaded').trim());
  });

  // Open all `nofollow` links in the new tab
  document.querySelectorAll('a[rel="nofollow"]').forEach(elem => {
    elem.addEventListener('click', openNewTab);
  });

  // Initialize stylesSwitcher
  stylesSwitcher = new StylesSwitcher();

  window.setMarkdownMode = function setMarkdownMode(status) {
    let styleName = status ? 'markdown' : 'default';
    stylesSwitcher.setStyle(styleName);
  };
}

NodeList.prototype.forEach = Array.prototype.forEach;
