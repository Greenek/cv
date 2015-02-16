/* Watch window resize */
var windowOnResize = function(event, elem) {
  $('.fit').height($(window).height());
};

$(window).on('resize', windowOnResize);

var app = function($) {
  $(window).trigger('resize');
};

Zepto(app);
