function createForm() {
  var form = document.createElement('form'),
    ageInput = document.createElement('input'),
    usernameInput = document.createElement('input'),
    dateInput = document.createElement('input'),
    submitInput = document.createElement('input');

  form.setAttribute('name', 'login');
  form.setAttribute('action', 'google.com.ua');
  form.className = 'login-form';
  ageInput.setAttribute('type', 'text');
  ageInput.setAttribute('name', 'age');
  ageInput.setAttribute('placeholder', 'age');
  usernameInput.setAttribute('type', 'text');
  usernameInput.setAttribute('name', 'username');
  usernameInput.setAttribute('placeholder', 'username');
  dateInput.setAttribute('type', 'text');
  dateInput.setAttribute('name', 'date');
  dateInput.setAttribute('placeholder', 'date');
  submitInput.setAttribute('type', 'submit');
  submitInput.setAttribute('value', 'Validate Me');

  form.appendChild(ageInput);
  form.appendChild(usernameInput);
  form.appendChild(dateInput);
  form.appendChild(submitInput);

  return form;
}

document.querySelector('body').appendChild(createForm());

var form = document.querySelector('.login-form');
onSubmitEvent();

function onSubmitEvent() {
  var elements = form.elements;

  form.onsubmit = function(e) {
    e.preventDefault();
    var invalidArr = [];
    var validationArr = [];
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var validStatus = checkOnValid(el);

      validationArr.push({'inputName': el.getAttribute('name'), 'validStatus': validStatus});
    }

    if (validationArr.length) {
        invalidArr = validationArr.filter(function (currEl) {
        return currEl.validStatus === 'invalid';
      });
    }

    if (invalidArr && invalidArr.length)
    {
      alert('Your data is invalid');
    } else {
      alert('Your data is valid');
    }
    return false;
  };
}

function checkOnValid(el) {
  var pattern = null;
  var regex = null;
  var validStatus = 'invalid';
  var inputName = el.getAttribute('name');
  var inputValue = el.value;

  if (inputName) {
    switch (inputName) {
      case "age":
        regex = '^[0-9]+$';
        break;
      case "username":
        regex = '^user_(.+)';
        break;
      case "date":
        regex = '(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[012])/((19|20)\\d\\d)';
        break;
    }
  } else {
    return;
  }

  if (regex) {
    pattern = new RegExp(regex);
    validStatus = pattern.test(inputValue) ? 'valid' : 'invalid';
  }

  return validStatus;
}







