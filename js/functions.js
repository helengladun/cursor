// total sum
function sum(start, end) {
  var sum;
  start = parseInt(start);
  end = parseInt(end);

  if ( (start || start === 0) && end && end >= start ) {
    sum = 0;
    for (var i = start; i <= end; i++)
    {
      sum += i;
    }
  }
  return sum;
}

// Display even numbers by using for loop with continue
function displayEvenNumbersWithContinue(start, end) {
  start = parseInt(start);
  end = parseInt(end);
  var resultArr;

  if ( (start || start === 0) && end && end >= start ) {
    resultArr = [];
    for (var i = start; i <= end; i++) {
      if ( i % 2 || i === 0 ) {
        continue;
      }
      resultArr.push(i);
    }
  }
  return resultArr;
}

// Display even numbers by using for loop without continue
function displayEvenNumbersWithoutContinue(start, end) {
  start = parseInt(start);
  end = parseInt(end);
  var resultArr;

  if ( (start || start === 0) && end && end >= start ) {
    resultArr = [];
    for (var i = start; i <= end; i++) {
      if ( i % 2 === 0 && i !== 0 ) {
        resultArr.push(i);
      }
    }
  }
  return resultArr;
}

//Display odd numbers by using ‘while’ loop
function displayOddNumbers(start, end) {
  start = parseInt(start);
  end = parseInt(end);
  var i = start,
      resultArr;

  if ( (start || start === 0) && end && end >= start ) {
    resultArr = [];
    while (i <= end) {
      if ( i % 2 && i !== 0 ) {
        resultArr.push(i);
      }
      i++;
    }
  }
  return resultArr;
}

/*Display numbers from 1 to 15 using ‘for’ loop,
  once num of iteration is equal the num of month
  of your birthday then stop execution of loop*/
function displayNumbersUntil(start, end, until) {
  start = parseInt(start);
  end = parseInt(end);
  until = parseInt(until);
  var resultArr;

  if ( (start || start === 0) && end && until
      && end >= start
      && until >=1 && until <=12 ) {

    resultArr = [];
    for (var i = start; i < end; i++) {
      if (i === until) {
        break;
      }
      resultArr.push(i);
    }
  }
  return resultArr;
}

//Rewrite code from using ‘for’ to using ‘while’
function usingWhile(start, end) {
  start = parseInt(start);
  end = parseInt(end);
  var i = start,
      resultArr;

  if ( (start || start === 0) && end && end >= start ) {
    resultArr = [];
    while ( i < end ) {
      resultArr.push(`number ${i}`);
      i++;
    }
  }
  return resultArr;
}

//Repeat prompt until user put required number using ‘do while’
function promptRepeatWithWhile() {
  var userNumber = 0;

  while (!userNumber || userNumber <= 100) {
      userNumber = parseInt(prompt('Please put the number greater than 100', '101'));
  }
  return userNumber;
}

//Repeat prompt until user put required number using ‘do while’
function promptRepeatWithDoWhile() {
  var userNumber = 0;

  do {
    userNumber = parseInt(prompt('Please put number greater than 100', '101'));
  } while (!userNumber || userNumber <= 100);
  return userNumber;
}

function displayHash(number) {
  var hashArr;
  number = parseInt(number);

  if ( number && number > 0 ) {
    hashArr = [];
    for (var i = 1; i <= number; i++) {
      hashArr.push('#'.repeat(i));
    }
  }
  return hashArr;
}

//remove 'has-success' and 'has-error' classes from result input
function removeStatusClassFromResult(el, blockId) {
    if ( el.classList.contains('has-success') ) {
      el.classList.remove('has-success');
      document.querySelector(`#task${blockId} .task-result .help-block`).innerHTML = '';
    }

    if ( el.classList.contains('has-error') ) {
      el.classList.remove('has-error');
      document.querySelector(`#task${blockId} .task-result .help-block`).innerHTML = '';
    }
}

//clear result input and help text after reset
function resetButtonEnable(blockId) {
  var el = document.querySelector(`#task${blockId} .task-result .form-group`);
  removeStatusClassFromResult (el, `${blockId}`);
  document.querySelector(`#task${blockId} .task-result #result${blockId}`).value = '';
  document.querySelector(`#task${blockId} .task-result .help-block`).innerHTML = '';
}

//add reset button listener to each of blocks
function addListenersToResetButton() {
  var tasksArr = document.querySelectorAll('.tasks-content > div');
  tasksArr.forEach(function(item, i, tasksArr) {
    var idName = item.id.match(/\d+/)[0];

    if ( idName !== '71' && idName !== '72' ) {
      document.querySelector(`#task${idName} .buttons-block .btn-danger`).addEventListener('click', function () {
        resetButtonEnable(idName);
      });
    }
  });
}

// display result depends on type of output
function displayResult(result, blockId) {
  var el = document.querySelector(`#task${blockId} .task-result .form-group`);

  if ( typeof result === 'number' ) {
    el.classList.remove('has-error');
    if (blockId === '71' || blockId === '72') {
      document.querySelector(`#task${blockId} .task-result #result${blockId}`).innerHTML = `Your number is ${result}`;
    } else {
      document.querySelector(`#task${blockId} .task-result #result${blockId}`).value = result;
    }
    el.classList.add('has-success');
  } else if ( result && typeof result === 'object' ) {
    if ( result.length > 0 )
    {
      el.classList.remove('has-error');
      if ( blockId === '6' || blockId === '8' ) {
        document.querySelector(`#task${blockId} .task-result #result${blockId}`).value = result.join('\n');
      } else {
        document.querySelector(`#task${blockId} .task-result #result${blockId}`).value = result.join(', ');
      }
      el.classList.add('has-success');
    } else if ( result.length === 0 ) {
      el.classList.remove('has-success');
      document.querySelector(`#task${blockId} .task-result #result${blockId}`).value = 'There are no elements, please enter another numbers!';
      el.classList.add('has-error');
    }
  } else {
    el.classList.remove('has-success');
    document.querySelector(`#task${blockId} .task-result #result${blockId}`).value = '';
    document.querySelector(`#task${blockId} .task-result .help-block`).innerHTML = 'Incorrect input data!';
    el.classList.add('has-error');
  }
}

