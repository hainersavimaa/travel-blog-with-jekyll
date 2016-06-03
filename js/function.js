---
---

$(document).ready(function(){
   $('.post-aside-cta').click(function(){
      $('.post-block').toggleClass('post-aside-open');
      if($('.post-block').hasClass('post-aside-open')){
         $('.post-aside-cta').text("Hide posts");
         $('.post-block').click(function(){
            $('.post-block').removeClass('post-aside-open');
         });
      }
      else{
         $('.post-aside-cta').text("All posts");
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
