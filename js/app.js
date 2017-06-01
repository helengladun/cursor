var form = document.querySelector('form[name="added-form"]');
var elements = form.elements;
var limit = getLimit();
var employeeKeys = getEmployeesNumberArr();
var avgSalary = getAverageSalary();

renderEmployeeList();

document.querySelector('form[name="set-limit"] input[name="limit"]').value = getLimit();

document.querySelector('.addEmployee').addEventListener('click', function() {
 form.style.display = 'block';
});

document.querySelector('form[name="set-limit"]').onsubmit = function(e) {
  e.preventDefault();
  var el = this.elements['limit'];
  limit = el.value;
  localStorage.setItem('employee-limit', limit);
};

document.querySelector('#employee-info .employee-count span').innerText = (employeeKeys && employeeKeys.length > 0) ? employeeKeys.length : '' ;
document.querySelector('#employee-info .employee-average span').innerText = avgSalary ? avgSalary : '';

onSubmitEvent();

function onSubmitEvent() {
  form.onsubmit = function(e) {
    e.preventDefault();
    var invalidArr = [];
    var validationArr = [];
    employeeKeys = getEmployeesNumberArr();
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

    if (invalidArr && invalidArr.length) {
      alert('Your data is invalid\n ' +
        'Input \'First name\' has to contain only letters\n ' +
        'Input \'Last name\' has to contain only letters\n ' +
        'Input \'Salary\' has to contain only digits\n ' +
        'Input \'Position\' has to contain only letters');
    } else if ( employeeKeys && employeeKeys.length >= limit ) {
      alert('You employee list is full. You can\'t add new employee');
    } else if (avgSalary && avgSalary > 2000) {
      alert('You can\'t add new employee because avg. salary reaches $ 2000');
    } else {
      if (localStorage) {
        var employeeObj = [];
        var number = null;

        if (employeeKeys === null) {   // if no one in list
          employeeKeys = [];
          number = 1;
          employeeKeys.push(1);
        } else if (employeeKeys && employeeKeys.length > 0 && employeeKeys.length < limit) {
          number = employeeKeys.length + 1;
          employeeKeys.push(number);
        }

        if (employeeKeys && employeeKeys.length) {
          for (var j = 0; j < employeeKeys.length; j++) {
            var key = employeeKeys[j];
            var _employeeArr = JSON.parse(localStorage.getItem('employee-' + key));
            var existingFirstName,
                existingLastName;

            // check if exists block
            if (_employeeArr && _employeeArr.length) {
              for (var key in _employeeArr) {
                if (_employeeArr[key].firstname) {
                  existingFirstName = _employeeArr[key].firstname;
                }
                if (_employeeArr[key].lastname) {
                  existingLastName = _employeeArr[key].lastname;
                }
              }
              if (elements.firstname.value.trim().toLowerCase() === existingFirstName.trim().toLowerCase()
                  && elements.lastname.value.trim().toLowerCase() === existingLastName.trim().toLowerCase()) {
                alert('The employee is already exists');
                return false;
              }
            }
          }
        }

        localStorage.setItem('employee-keys', JSON.stringify(employeeKeys));

        if (number) {
          employeeObj.push({'employee-id' : number});

          if (elements.firstname) {
            employeeObj.push({'firstname' : elements.firstname.value});
          }
          if (elements.lastname) {
            employeeObj.push({'lastname' : elements.lastname.value});
          }
          if (elements.salary) {
            employeeObj.push({'salary' : elements.salary.value});
          }
          if (elements.position) {
            employeeObj.push({'position' : elements.position.value});
          }

          employeeObj = JSON.stringify(employeeObj);
          localStorage.setItem('employee-' + number, employeeObj);

          avgSalary = getAverageSalary();

          document.querySelector('#employee-info .employee-count span').innerText = employeeKeys.length;
          document.querySelector('#employee-info .employee-average span').innerText = avgSalary;

          form.style.display = 'none';

          renderEmployeeList();

        } else {
          alert('Your list is full (limit - 10 employees)');
        }
      }
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
      case "firstname":
      case "lastname":
      case "position":
        regex = '^([a-zA-Z])*$';
        break;
      case "salary":
        regex = '^[1-9][0-9]*$';
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

function getEmployeesNumberArr() {
  if (localStorage) {
    var arr = JSON.parse(localStorage.getItem('employee-keys'));
  }
  return arr;
}

function renderEmployeeList() {
  var keys = employeeKeys;

  if (keys && keys.length) {
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
      var _employeeArr = JSON.parse(localStorage.getItem('employee-' + key));

      var elFirstName = document.createElement('span');
      elFirstName.className = 'employeeFirstName';
      var elLastName = document.createElement('span');
      elLastName.className = 'employeeLastName';
      var elSalary = document.createElement('span');
      elSalary.className = 'employeeSalary';
      var elPosition = document.createElement('span');
      elPosition.className = 'employeePosition';

      for (var key in _employeeArr) {
        if (_employeeArr[key].firstname) {
          elFirstName.innerText = _employeeArr[key].firstname + ' ';
        }
        if (_employeeArr[key].lastname){
          elLastName.innerText = _employeeArr[key].lastname  + ' ';
        }
        if (_employeeArr[key].salary) {
          elSalary.innerText = '$ ' +_employeeArr[key].salary  + ' ';
        }
        if (_employeeArr[key].position) {
          elPosition.innerText = _employeeArr[key].position;
        }
      }

      var li = document.createElement('li');
      li.appendChild(elFirstName);
      li.appendChild(elLastName);
      li.appendChild(elSalary);
      li.appendChild(elPosition);

      document.querySelector('.employeeList').appendChild(li);
    }
  }
}

function getAverageSalary() {

  var keys = employeeKeys;
  var salarySum = 0;

  if (localStorage) {
    if (keys && keys.length) {
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var employeeArr = JSON.parse(localStorage.getItem('employee-' + key));

        salarySum += employeeArr
            .map(function(el) {if(el.salary) {return parseInt(el.salary)}})
            .filter(function(el) {return el;})[0];
      }
      return parseInt(salarySum/keys.length);
    }
  }
}

function getLimit() {
  limit = localStorage.getItem('employee-limit');
  if (!limit) {
    limit = 10;
    localStorage.setItem('employee-limit', limit);
  }
  return limit;
}