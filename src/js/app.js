(function($) {
  var _window = $(window);

  var body,
    slides,
    breakpoints,
    windowHeight;

  // Bind onResize event
  _window.on('resize', onResize);

  // Bind onScroll event
  _window.on('scroll', onScroll);

  // Register getBackgroundImage function
  $.extend($.fn, {
    backgroundImage: getBackgroundImage
  });

  /**
   * Initialize page scripts.
   */
  function init() {
    var events;

    // Get body element
    body = $('body');

    // Get all slides
    slides = $('.slide');

    // Trigger window events
    _window
      .trigger('resize')
      .trigger('scroll');

    // Open links in the new window
    body.on('click', 'a[rel="nofollow"]', onNewTab);

    // Load animations
    load();

    return this;
  }

  return init();

  /**
   * Get URL of element's background-image.
   *
   * @return {String} URL
   */
  function getBackgroundImage() {
    var elem;
    var style;
    var url;

    // Get DOM element
    elem = this.get(0);

    // Get calculated style
    style = elem.currentStyle || window.getComputedStyle(elem, false);

    // Get URL
    url = style.backgroundImage.slice(4, -1);

    return url;
  }

  /**
   * Load initial animations.
   */
  function load() {
    var queue = [];
    var loaded;
    var slide;
    var spinner;
    var about;

    // Print some info for curious
    about = document.getElementsByTagName('html')[0].childNodes[0];

    if (about.nodeType === 8) {
      console.info(about.nodeValue);
    }

    // Create body spinner
    spinner = $('<div />', {
      'class': 'spinner'
    }).appendTo(body);

    // Get first slide
    slide = slides.first();

    // Preload images from the top
    queue = queue.concat(
      slide.backgroundImage(),
      slide.find('img').pluck('src')
    );

    // Preloader callback function
    loaded = function() {
      body.addClass('loaded');
      spinner.css('opacity', 0);
    };

    loadQueue(queue, loaded);
  }

  /**
   * Preload image by URL.
   *
   * @param {String} url    URL of image to preload
   * @param {Function} fn   Callback function
   */
  function loadImg(url, fn) {
    var img;

    // Create new Image object
    img = new Image();

    // Set onLoad callback function
    if (typeof fn === 'function') {
      img.onload = fn;
    }

    // Set `src` attribute to begin request
    img.src = url;
  }

  /**
   * Initialize loading all of images from the array and run callback
   * function when done.
   *
   * @param {Array} queue   Array of images URLs
   */
  function loadQueue(queue, fn) {
    var preloaders = [];
    var callbackFn;
    var countLeft;

    // Get number of elements to load
    countLeft = queue.length;

    // Callback function
    callbackFn = function() {
      // If it was the last element to load run callback function
      if (--countLeft === 0 && typeof fn === 'function') {
        return window.setTimeout(fn, 1000);
      }
    };

    for (var i = 0, len = countLeft; i < countLeft; ++i) {
      var deferred;

      deferred = loadImg(queue[i], callbackFn);
      preloaders.push(deferred);
    }
  }

  /**
   * Open link in the new tab.
   */
  function onNewTab(event) {
    event.preventDefault();
    window.open($(this).attr('href'));
  }

  /**
   * Re-align sensitive layout elements after window resize.
   */
  function onResize(event) {
    windowHeight = window.innerHeight;

    // Recount breakpoints of slides
    breakpoints = slides.map(function() {
      return $(this).offset().top + $(this).height();
    });

    // breakpoints.unshift(0);
  }

  /**
   * Set of helpers for parallax effect during scrolling.
   */
  function onScroll(event) {

  }
})(Zepto);
