var $parallax = document.getElementById('parallax');
var $content1 = document.querySelector('.content-1');
var $content2 = document.querySelector('.content-2');

window.addEventListener('scroll', function (e) {

  var ypos = window.pageYOffset;
  var parallaxTop = ypos* .4;
  $parallax.style.backgroundPosition = '50%' + parallaxTop + '%';

});
