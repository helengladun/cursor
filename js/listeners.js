/**
 * Created by helengladun on 25.05.17.
 */

addListenersToResetButton();

document.querySelector('#task1 .buttons-block .btn-success').addEventListener('click', function () {
  var startEl = document.querySelector('#task1 #num11');
  var endEl = document.querySelector('#task1 #num12');
  var el = document.querySelector('#task1 .task-result .form-group');

  if ( startEl && endEl ) {
    var result = sum(startEl.value, endEl.value);
  }

  removeStatusClassFromResult(el, '1');
  displayResult(result, '1');
});

document.querySelector('#task31 .buttons-block .btn-success').addEventListener('click', function () {
  var startEl = document.querySelector('#task31 #num311');
  var endEl = document.querySelector('#task31 #num312');
  var el = document.querySelector('#task31 .task-result .form-group');

  if ( startEl && endEl ) {
    var result = displayEvenNumbersWithContinue(startEl.value, endEl.value);
  }

  removeStatusClassFromResult (el, '31');
  displayResult(result, '31');
});

document.querySelector('#task32 .buttons-block .btn-success').addEventListener('click', function () {
  var startEl = document.querySelector('#task32 #num321');
  var endEl = document.querySelector('#task32 #num322');
  var el = document.querySelector('#task32 .task-result .form-group');

  if ( startEl && endEl ) {
    var result = displayEvenNumbersWithoutContinue(startEl.value, endEl.value);
  }

  removeStatusClassFromResult (el, '32');
  displayResult(result, '32');
});

document.querySelector('#task4 .buttons-block .btn-success').addEventListener('click', function () {
  var startEl = document.querySelector('#task4 #num41');
  var endEl = document.querySelector('#task4 #num42');
  var el = document.querySelector('#task4 .task-result .form-group');

  if ( startEl && endEl ) {
    var result = displayOddNumbers(startEl.value, endEl.value);
  }

  removeStatusClassFromResult (el, '4');
  displayResult(result, '4');
});

document.querySelector('#task5 .buttons-block .btn-success').addEventListener('click', function () {
  var startEl = document.querySelector('#task5 #num51');
  var endEl = document.querySelector('#task5 #num52');
  var untilEl = document.querySelector('#task5 #num53');
  var el = document.querySelector('#task5 .task-result .form-group');

  if ( startEl && endEl && untilEl.value) {
    var result = displayNumbersUntil(startEl.value, endEl.value, untilEl.value);
  }

  removeStatusClassFromResult (el, '5');
  displayResult(result, '5');
});

document.querySelector('#task6 .buttons-block .btn-success').addEventListener('click', function () {
  var startEl = document.querySelector('#task6 #num61');
  var endEl = document.querySelector('#task6 #num62');
  var el = document.querySelector('#task6 .task-result .form-group');

  if ( startEl && endEl ) {
    var result = usingWhile(startEl.value, endEl.value);
  }

  removeStatusClassFromResult (el, '6');
  displayResult(result, '6');
});

document.querySelector('#task71 .buttons-block .btn-primary').addEventListener('click', function () {
  var el = document.querySelector('#task71 .task-result .form-group');
  var result = promptRepeatWithWhile();

  removeStatusClassFromResult (el, '71');
  displayResult(result, '71');
});

document.querySelector('#task72 .buttons-block .btn-primary').addEventListener('click', function () {
  var el = document.querySelector('#task72 .task-result .form-group');
  var result = promptRepeatWithDoWhile();

  removeStatusClassFromResult (el, '72');
  displayResult(result, '72');
});

document.querySelector('#task8 .buttons-block .btn-success').addEventListener('click', function () {
  var numberEl = document.querySelector('#task8 #num81');
  var el = document.querySelector('#task8 .task-result .form-group');

  if ( numberEl) {
    var result = displayHash(numberEl.value);
  }

  removeStatusClassFromResult (el, '8');
  displayResult(result, '8');
});
