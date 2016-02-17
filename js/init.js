var $ = require('jquery');
var foundation = require('foundation');
var cheet = require('cheet');
var smoothstate = require('smoothstate');
var typedjs = require('typedjs');

var archer = {
  init: function () {
    /**
     * smooth scroll to a section of the page, original source below:
     * http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links
    */
    var $body = $('html,body');
    $('a[data-smooth-scroll]').on('click.smooth_scroll', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $body.animate({
            scrollTop: target.offset().top
          }, 1000);

          return false;
        }
      }
    });


    // typed.js
    $("#animated-text").typed({
        strings: ['', 'web', 'print', 'branding', 'advertising', 'full-service'],
        typeSpeed: 100,
        startDelay: 1500,
        backDelay: 1750,
        callback: function () {
          $('.typed-cursor').addClass('off');
        }
      });
    }
}

// initialize the things
$(document).ready(function () {

  // foundation
  $(document).foundation();

  // smooth scrolls and othe page things
  archer.init();

  // smoothstate
  $('#container').smoothState({
    onAfter: function($container, $newContent) {
      // reinitialize foundation + our stuff
      $newContent.foundation();
      archer.init();
    }
  });

  // konami
  cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () { alert('Voilà!'); });

});
