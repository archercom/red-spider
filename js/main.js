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
        // original sources:
        // http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links
        // http://stackoverflow.com/questions/7717527/jquery-smooth-scrolling-when-clicking-an-anchor-link
        var $root = $('html, body');
        $('a[data-smooth-scroll]').on('click.smooth_scroll', function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $root.animate({
                scrollTop: target.offset().top
              }, 1000, function () {
                  window.location.hash = target.selector;
              });

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

    var $body = $(document.body);
    // initialize smmothstate
    $('#container').smoothState({
      // onStart: {
      //   // How long this animation takes
      //   duration: 2000,
      //   // A function that dictates the animations that take place
      //   render: function ($container) {
      //     console.log($container);
      //     // $body.animate({
      //     //   scrollTop: 0
      //     // });
      //   }
      // },
      // // Runs when a link has been activated
      // onStart: {
      //   duration: 250, // Duration of our animation
      //   render: function (url, $container) {
      //     console.log(url, $container);
      //     // toggleAnimationClass() is a public method
      //     // for restarting css animations with a class
      //     // content.toggleAnimationClass('is-exiting');
      //     // Scroll user to the top
      //     $body.animate({
      //       scrollTop: 0
      //     });
      //   }
      // },
      onAfter: function($container, $newContent) {
        $newContent.foundation();  // initialize foundation on the new content
        Archer.init();  // reinitilize our stuff (animations, smooth scrolls)
      }
    });

    // konami /* play sound effect */
    var easter_egg = new Konami(Archer.utils.konami);

    // account for sticky menu
    $('#main').css('padding-top', $('#global-header').height());
  });

}($ || jQuery, window, window.document));

//# sourceMappingURL=main.js.map