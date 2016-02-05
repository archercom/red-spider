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

      // say hello
      if (console !== undefined) console.log(this.tag);

      // add smooth scroll
      this.utils.smooth_scroll();

      // konami /* play sound effect */
      var easter_egg = new Konami(this.utils.konami);

      // ==================================================

      // var $header = $('#global-header'),
      //     headerHeight = $header.height();
      //     // $header.addClass('sticky');
      //     // $header.css('width', '100%');
      //     $('#main').css('padding-top', headerHeight);


      // v1
      $('#container').smoothState({
        debug: true
      });

      var $article = $('.type-article');
      if ($article.length) $article.find('p').selectionSharer();



      var typesOfService = [
        {
          word: 'web',
          time: 0.4
        },
        {
          word: 'print',
          time: 0.55
        },
        {
          word: 'branding',
          time: 1
        },
        {
          word: 'advertising',
          time: 1.2
        },
        {
          word: 'full-service',
          time: 1.15
        }
      ];

      console.log(typesOfService);

      // var tl = new TimelineLite,

      //     mySplitText = new SplitText("#animated-text", {type:"chars"}),
      //     // mySplitText = new SplitText("#marquee", {type:"words,chars"}),
      //     chars = mySplitText.chars; //an array of all the divs that wrap each character

      // // TweenLite.set("#animated-text", {perspective:400});
      TweenLite.set("#marquee", {perspective:400});

      // // tl.staggerFrom(chars, 0.8, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, 0.01, "+=0");


      // //replaces yourElement's text with "This is the new text" over the course of 2 seconds
      // TweenMax.to("#animated-text", 1, {text:{value:"web"}});


      var animatedText = document.getElementById('#animated-text');
      var tl = new TimelineLite({
        delay: 0.7
      });
      // console.log('test');
      for (var i = 0; i < typesOfService.length; i++) {
        tl.add(TweenLite.to('#animated-text',
          1, {
            text: {value: ' ' },
            delay: 1.1,
            ease: Sine.easeIn
          })
        );
        tl.add(TweenLite.to('#animated-text',
          typesOfService[i].time, {
            text: {value: typesOfService[i].word },
            delay: 0.125,
            ease: Sine.easeIn
          })
        );
      }


      // var message = $("#message"),
      //     tl = new TimelineMax({repeat:8, repeatDelay:2, yoyo:true, delay:1});

      // TweenLite.set("#content", {perspective:1200});

      // tl.to(message, 1, {rotationX:-90}, "+=1")
      //   .set(message, {text:"TWEENING!"})
      //   .fromTo(message, 1, {rotationX:90}, {rotationX:0, immediateRender:false})

      //   .to(message, 1, {rotationX:-90}, "+=0.5")
      //   .set(message, {text:"WITH LOVE,"})
      //   .fromTo(message, 1, {rotationX:90}, {rotationX:0, immediateRender:false})

      //   .to(message, 1, {rotationX:-90}, "+=0.5")
      //   .set(message, {text:"GreenSock ;)"})
      //   .fromTo(message, 1, {rotationX:90}, {rotationX:0, immediateRender:false})

      //   .to(message, tl.duration()+ 1, {left:600, ease:Power1.easeInOut}, 0);


      // tl.timeScale(3.5);


          // tl.add( TweenMax.to(animatedText, 1, {top:50}) );
          // tl.add( TweenMax.to(animatedText, 1, {opacity:0}) );



      // document.getElementById("animate").onclick = function() {
      //   tl.restart();
      // }






    }

  };



  // initialize the things
  $(document).ready(function () {
    $(document).foundation();
    Archer.init();
  });

}($ || jQuery, window, window.document));

//# sourceMappingURL=main.js.map