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
  "image": {{ post.cover | jsonify }},
  "date": {{ post.date | date: '%B %-d, %Y' | jsonify }},
  "category": {{ post.categories | jsonify }},
  "excerpt": {{ post.content | strip_html | truncatewords: 20 | jsonify }}
}{% unless forloop.last %},{% endunless %}{% endfor %}]
// builds search
$(document).ready(function() {
  $('input#search').on('keyup', function () {
     $('.all-posts-wrap').hide();
    var resultdiv = $('#results ul');
    // Get query
    var query = $(this).val();
    // Search for it
    var result = index.search(query);
    // Show results
    resultdiv.empty();
    // Add status
    resultdiv.prepend('<p class="">Found '+result.length+' result(s)</p>');
    // Loop through, match, and add results
    for (var item in result) {
      var ref = result[item].ref;
      var searchitem = '<li class="result"><img src="{{site.baseurl}}/img/'+store[ref].image+'" alt="'+store[ref].title+'" class="result-img"><div class="result-body"><a href="{{site.baseurl}}'+store[ref].link+'" class="post-title">'+store[ref].title+'</a><div class="post-date small">'+store[ref].category+' &times; '+store[ref].date+'</div><p>'+store[ref].excerpt+'</p></li>';
      resultdiv.append(searchitem);
    }
});
//Show posts by category
   $('.categories-list span:not(:first-child)').click(function(){
      $('.all-posts-wrap').hide();
      $('#results').show();
      var resultdiv = $('#results ul');
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
        var searchitem = '<li class="result"><img src="{{site.baseurl}}/img/'+store[ref].image+'" alt="'+store[ref].title+'" class="result-img"><div class="result-body"><a href="{{site.baseurl}}'+store[ref].link+'" class="post-title">'+store[ref].title+'</a><div class="post-date small">'+store[ref].category+' &times; '+store[ref].date+'</div><p>'+store[ref].excerpt+'</p></li>';
        resultdiv.append(searchitem);
   }
      $('.categories-list span').removeClass('active-category')
      $(this).addClass('active-category');
  });
  $('.categories-list span:first-child').click(function(){
     $('#results').hide();
     $('.all-posts-wrap').show();
     $('.categories-list span').removeClass('active-category')
     $(this).addClass('active-category');
  });
});
