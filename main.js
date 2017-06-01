
document.getElementById('player').style.top = '50px';
document.getElementById('player').style.left = '50px';


document.body.onkeydown = function (e) {
  var el = document.getElementById('player');

  var KEYCODE_LEFT = 37;
  var KEYCODE_RIGHT = 39;
  var KEYCODE_UP = 38;
  var KEYCODE_DOWN = 40;
  var KEYCODE_SPACE = 32;

  if (e.keyCode == KEYCODE_LEFT) {
    el.style.left = (parseInt(el.style.left) - 10) + 'px';
  }
  else if (e.keyCode == KEYCODE_RIGHT) {
    el.style.left = (parseInt(el.style.left) + 10) + 'px';
  }
  else if (e.keyCode == KEYCODE_UP) {
    el.style.top = (parseInt(el.style.top) - 10) + 'px';
  }
  else if (e.keyCode == KEYCODE_DOWN) {
    el.style.top = (parseInt(el.style.top) + 10) + 'px';
  }

  if (e.keyCode == KEYCODE_SPACE) {
    var positionTop = parseInt(el.style.top, 10);
    var positionLeft = parseInt(el.style.left, 10);

    var bullet = document.createElement('div');
    var bulletTop = positionTop + 5 + 'px';
    var bulletLeft = positionLeft + el.offsetWidth + 5 + 'px';
    bullet.style.top = bulletTop;
    bullet.style.left = bulletLeft;
    bullet.className = 'bullet';
    document.body.appendChild(bullet);

    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    var rules = document
      .createTextNode('@keyframes shoot {'+
      'from { left: '+ bulletLeft + '}' +
      'to { left: '+ document.documentElement.clientWidth + 'px}');
    styleTag.appendChild(rules);
    document.head.appendChild(styleTag);

    bullet.addEventListener('webkitAnimationEnd',function( event ) {
      bullet.remove();
    });
  }

};