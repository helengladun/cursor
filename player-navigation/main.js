
document.getElementById('player').style.top = '50px';
document.getElementById('player').style.left = '50px';

var bulletDirection = 'right';
var numberOfBull = 0;

document.body.onkeydown = function (e) {
  var el = document.getElementById('player');

  var KEYCODE_LEFT = 37;
  var KEYCODE_RIGHT = 39;
  var KEYCODE_UP = 38;
  var KEYCODE_DOWN = 40;
  var KEYCODE_SPACE = 32;
  var start;
  var end;
  var rule;

  if (e.keyCode == KEYCODE_LEFT) {
    el.style.left = (parseInt(el.style.left) - 10) + 'px';
    bulletDirection = 'left';
  }
  else if (e.keyCode == KEYCODE_RIGHT) {
    el.style.left = (parseInt(el.style.left) + 10) + 'px';
    bulletDirection = 'right';
  }
  else if (e.keyCode == KEYCODE_UP) {
    el.style.top = (parseInt(el.style.top) - 10) + 'px';
    bulletDirection = 'up';
  }
  else if (e.keyCode == KEYCODE_DOWN) {
    el.style.top = (parseInt(el.style.top) + 10) + 'px';
    bulletDirection = 'down';
  }

  if (e.keyCode == KEYCODE_SPACE) {

    var positionTop = parseInt(el.style.top, 10);
    var positionLeft = parseInt(el.style.left, 10);

    var bulletTop = positionTop + 5 + 'px';
    var bulletLeft = positionLeft + el.offsetWidth + 5 + 'px';

    if (bulletDirection === 'right') {
      rule = 'from { left: '+ bulletLeft + '}' + 'to { left: '+ document.documentElement.clientWidth + 'px}';
    }
    if (bulletDirection === 'left') {
      bulletLeft = positionLeft - el.offsetWidth + 5 + 'px';
      rule = 'from { left: '+ bulletLeft + '}' + 'to { left: '+ 0  + 'px}';
    }
    if (bulletDirection === 'up') {
      bulletTop = positionTop - 5;
      bulletTop = bulletTop + 'px';
      bulletLeft = positionLeft + parseInt(el.offsetWidth/2, 10) + 'px';
      rule = 'from { top: '+ bulletTop + '}' + 'to { top: '+ 0  + 'px}'
    }
    if (bulletDirection === 'down') {
      bulletTop = positionTop + el.offsetHeight + 5 + 'px';
      bulletLeft = positionLeft + parseInt(el.offsetWidth/2 - 2, 10) + 'px';
      rule = 'from { top: '+ bulletTop + '}' + 'to { top: '+ document.documentElement.clientHeight  + 'px}'
    }

    var bullet = document.createElement('div');
    numberOfBull++;
    bullet.style.top = bulletTop;
    bullet.style.left = bulletLeft;
    console.log(numberOfBull);
    bullet.style.animation = 'shoot-'+ numberOfBull +' 1.75s linear 1 none';
    bullet.classList.remove('right');
    bullet.classList.remove('left');
    bullet.classList.remove('up');
    bullet.classList.remove('down');
    bullet.className = 'bullet' + ' ' + bulletDirection;
    document.body.appendChild(bullet);

    var styleTag = document.createElement('style');

    console.log(numberOfBull);
    var createRules = document
      .createTextNode(`@keyframes shoot-${numberOfBull} { ${rule} }`);
    styleTag.appendChild(createRules);
    document.head.appendChild(styleTag);

    bullet.addEventListener('webkitAnimationEnd',function( event ) {
      bullet.remove();
      styleTag.remove();
    });
  }

};