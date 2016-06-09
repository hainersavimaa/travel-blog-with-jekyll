---
---

$(document).ready(function(){
   //var position = $('.slider-item').css("left");
   var position = 0;
   var move= 100;
   $('.prev').click(function(){
      console.log("prev");
      if(position>=100){
         move= position-move
         $('.post-slider').css('left', '-'+move+'%');
         position-=100;
         move=100;
      }
      console.log('prev move: '+move);
   });
   $('.next').click(function(){
      console.log("next");
      if(position<=100){
         move= position+move
         $('.post-slider').css('left', '-'+move+'%');
         position+=100;
         move=100;
      }
      console.log('next move: '+move);
   });
   $('.post-aside-cta').click(function(){
      $('.post-block').toggleClass('post-aside-open');
      if($('.post-block').hasClass('post-aside-open')){
         $('.post-aside-cta').text("Hide posts");
         $('.post-aside-cta').addClass('cta-open');
         $('.categories-list span:first-child').addClass('active-category')
         $('.post-aside').scroll(function(){
            var ScrollTop = parseInt($('.post-aside').scrollTop());
            if(ScrollTop > 40){
               $('.post-aside-cta').fadeOut();
            } else{
               $('.post-aside-cta').fadeIn();
            }
         });
         $('.post-block').click(function(){
            $('.post-block').removeClass('post-aside-open');
         });
      }
      else{
         $('.post-aside-cta').text("All posts");
         $('.post-aside-cta').removeClass('cta-open');
      }
      $('.PageNavigation').toggleClass('post-aside-open-hidden');
   });
   //Cover image fade-in over placeholder background
   $('.container').each(function () {
      var $wrapper = $(this);
      var img = $wrapper.find('#coverImage')[0];

      var tempImg = new Image();
      tempImg.src = img.src;
      tempImg.onload = function () {
       $wrapper.addClass('loaded');
      };
  });
});
