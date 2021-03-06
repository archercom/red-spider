var $ = require('jquery');
var foundation = require('foundation');
var cheet = require('cheet');
var smoothstate = require('smoothstate');
var typedjs = require('typedjs');
var scrollMonitor = require('scrollMonitor');
var hideOnScroll = require('hide-on-scroll');


var $body = $('html,body');

/**
 * scrollTo an element using jQuery
 * @param  {jQuery object} $obj
 */
function scrollTo ($obj) {
  $body.animate({
    scrollTop: $obj.offset().top
  }, 1000);
}

/**
 * event handler for anything with (data-smooth-scroll)
 */
function smoothScrollHandler () {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var $target = $(this.hash);
    $target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
    if ($target.length) {
      scrollTo($target);
      return false;
    }
  }
}



var archer = {
  init: function () {
    /**
     * smooth scroll to a section of the page, original source below:
     * http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links
    */
    $('a[data-smooth-scroll]').on('click.smooth_scroll', smoothScrollHandler);


    // konami
    var konamiKeys = $('#konami').children().toArray();
    cheet('↑ ↑ ↓ ↓ ← → ← → b a', {
      next: function (str, key, num, seq) {
        konamiKeys[num].className = 'pressed';
      },
      fail: function () {
        for (var i = 0; i < konamiKeys.length; i++) {
          konamiKeys[i].removeAttribute('class');
        }
      },
      done: function () {
        for (var i = 0; i < konamiKeys.length; i++) {
          konamiKeys[i].removeAttribute('class');
        }
        alert('yo');
      }
    });


    // typed.js
    var $animatedText = $('#animated-text');
    if ($animatedText.length) {
      $animatedText.typed({
        strings: ['', 'web', 'print', 'branding', 'advertising', 'full-service'],
        typeSpeed: 100,
        startDelay: 1500,
        backDelay: 1750,
        callback: function () {
          $('.typed-cursor').addClass('off');
        }
      });
    }

    // nice headers thanks to scrollMonitor + hideOnScroll
    var $globalHeader = $('#global-header');
    var watcher = scrollMonitor.create($globalHeader);
        watcher.lock(); // ensure that we're always watching the place the element originally was
        watcher.exitViewport( function()  {$globalHeader.addClass('detached'); });
        watcher.enterViewport( function() {$globalHeader.removeClass('detached'); });

    hideOnScroll({
      navbarSelector: '#global-header',
      hidingClass: 'hidden'
    });

    // slick reveal of the footer
    $('#main').css('margin-bottom', $('#global-footer').css('height'));
  }
}



// initialize the things
$(document).ready(function () {

  // foundation
  $(document).foundation();

  // smooth scrolls and other page things
  archer.init();

  // smoothstate
  $('#container').smoothState({
    onAfter: function($container, $newContent) {
      // reinitialize foundation + our stuff
      $newContent.foundation();
      archer.init();
    }
  });
});
