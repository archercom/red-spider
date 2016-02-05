/*!
 * archer v0.1.0 (https://lab.luisrosar.io/archer)
 * Copyright 2014-2016 luis rosario //zapo
 */

(function ($, window, document, undefined) {

  'use strict';



  window.Archer = {

    tag: 'Archer',

    settings: {},

    modules: {},



    utils: {

      /**
       * smooth scroll to a section of the page
       * @return {N/A}
       */
      smooth_scroll: function () {
        // smooth scroll - original source below
        // http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links
        $('a[data-smooth-scroll]').on('click.smooth_scroll', function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top
              }, 1000);

              return false;
            }
          }
        });
      },

      /**
       * Easter egg
       * @return {N/A}
       */
      konami: function () {

        // file urls
        var mp3s = [
          '/misc/internet.mp3',
          '/misc/mario.mp3',
          '/misc/seinfeld.mp3'
        ];

        // load Howler
        if (Archer.sound === undefined) {
          Archer.sound = new Howl({
            urls: [mp3s[Math.floor(Math.random() * 3)]]
          }).play();
        } else {
          // play new sound. stop other one
          Archer.sound.unload();
          Archer.sound = new Howl({
            urls: [mp3s[Math.floor(Math.random() * 3)]]
          }).play();
        }

      }
    },



    init: function() {

      // add smooth scroll
      this.utils.smooth_scroll();

      // ==================================================

      // var $header = $('#global-header'),
      //     headerHeight = $header.height();
      //     // $header.addClass('sticky');
      //     // $header.css('width', '100%');
      //     $('#main').css('padding-top', headerHeight);


      var $article = $('.type-article');
      if ($article.length) $article.find('p').selectionSharer();


      if ($('#marquee').length) {
        var typesOfService = [
          {word: 'web', time: 0.4 },
          {word: 'print', time: 0.55 },
          {word: 'branding', time: 1 },
          {word: 'advertising', time: 1.2 },
          {word: 'full-service', time: 1.15 }
        ];

        TweenLite.set('#marquee', {perspective:400});

        var animatedText = document.getElementById('#animated-text');
        var tl = new TimelineLite({
            delay: 0
            // delay: 0.4
          });

        for (var i = 0; i < typesOfService.length; i++) {
          tl.add(TweenLite.to('#animated-text', 1, {text: {value: ' ' }, delay: 1, ease: Sine.easeIn }) );
          tl.add(TweenLite.to('#animated-text', typesOfService[i].time, {text: {value: typesOfService[i].word }, delay: 0.125, ease: Sine.easeIn }) );
        }
      }
    }

  };



  // initialize the things
  $(document).ready(function () {
    // say hello
    if (console !== undefined) console.log(Archer.tag);

    // business time
    $(document).foundation();
    Archer.init();

    // initialize smmothstate
    $('#container').smoothState({
      onAfter: function($container, $newContent) {
        $newContent.foundation();  // initialize foundation on the new content
        Archer.init();  // reinitilize our stuff (animations, smooth scrolls)
      }
    });

    // konami /* play sound effect */
    var easter_egg = new Konami(Archer.utils.konami);
  });

}($ || jQuery, window, window.document));

//# sourceMappingURL=main.js.map