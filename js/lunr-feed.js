---
---
// builds lunr
var index = lunr(function () {
  this.field('title')
  this.field('content', {boost: 10})
  this.field('category')
  this.field('tags')
  this.ref('id')
});
{% assign count = 0 %}{% for post in site.posts %}
index.add({
  title: {{post.title | jsonify}},
  category: {{post.categories | jsonify}},
  content: {{post.content | strip_html | jsonify}},
  tags: {{post.tags | jsonify}},
  id: {{count}}
});{% assign count = count | plus: 1 %}{% endfor %}
console.log( jQuery.type(index) );
// builds reference data
var store = [{% for post in site.posts %}{
  "title": {{post.title | jsonify}},
  "link": {{ post.url | jsonify }},
  "image": {{ post.cover-thumb | jsonify }},
  "date": {{ post.date | date: '%B %-d, %Y' | jsonify }},
  "category": {{ post.categories | jsonify }},
  "excerpt": {{ post.content | strip_html | truncatewords: 20 | jsonify }}
}{% unless forloop.last %},{% endunless %}{% endfor %}]
// builds search
$(document).ready(function() {
  $('input#search').on('keyup', function () {
    //$('.all-posts-wrap').hide();
    $('.post-aside .search-area').addClass('search-active');
    if($('.post-aside .search-area').hasClass('search-active')){
      $('.post-aside-cta').hide();
      $('.close-btn').click(function(){
         $('.post-aside .search-area').removeClass('search-active');
         $('.post-aside-cta').show();
         console.log("clicked");
      })
   } else {
      $('.post-aside-cta').show();
   }
    var resultdiv = $('#results ul');
    // Get query
    var query = $(this).val();
    // Search for it
    var result = index.search(query);
    // Show results
    resultdiv.empty();
    // Add status
    $('#results').show();
    resultdiv.prepend('<p class="">Found '+result.length+' result(s)</p>');
    if(result.length==0){
      resultdiv.prepend('<p class="">Try going through the categories above to find what you are looking for</p>');
   }
    // Loop through, match, and add results
    for (var item in result) {
      var ref = result[item].ref;
      var searchitem = '<a href="{{site.baseurl}}'+store[ref].link+'" class="post-title"><li class="result"><div class="thumbnail"><div class="image-wrapper"><img src="{{site.baseurl}}/img/thumbnails/'+store[ref].image+'" alt="'+store[ref].title+'" class="result-img"></div></div><div class="result-body"><p class="post-title">'+store[ref].title+'</p><p class="post-date">'+store[ref].category+' &times; '+store[ref].date+'</p></div></li></a>';
      resultdiv.append(searchitem);
    }
});
//Show posts by category
   $('.categories-list span:not(:first-child)').click(function(){
      $('.all-posts-wrap .post-box').hide();
      $('.all-posts-wrap .post-box-cat').show();
      $('.post-aside .search-area').removeClass('search-active');
      //$('#results').show();
      var resultdiv = $('.all-posts-wrap .post-box-cat');
      // Get query
      var query = $(this).text();
      // Search for it
      var result = index.search(query);
      // Show results
      resultdiv.empty();
      // Add status
      resultdiv.prepend('<p class="">Category has '+result.length+' result(s)</p>');
      // Loop through, match, and add results
      for (var item in result) {
        var ref = result[item].ref;
        var searchitem = '<a href="{{site.baseurl}}'+store[ref].link+'" class="post-title"><li class="result"><div class="thumbnail"><div class="image-wrapper"><img src="{{site.baseurl}}/img/thumbnails/'+store[ref].image+'" alt="'+store[ref].title+'" class="result-img"></div></div><div class="result-body"><p class="post-title">'+store[ref].title+'</p><p class="post-date">'+store[ref].category+' &times; '+store[ref].date+'</p></div></li></a>';
        resultdiv.hide().append(searchitem).fadeIn();
   }
      $('.categories-list span').removeClass('active-category')
      $(this).addClass('active-category');
  });
  $('.categories-list span:first-child').click(function(){
     $('.all-posts-wrap .post-box').fadeIn();
     $('.all-posts-wrap .post-box-cat').hide();
     $('.categories-list span').removeClass('active-category')
     $(this).addClass('active-category');
  });
});
