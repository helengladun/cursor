var users = [];

function SuperUser() {
  this.isDataVisibile = true;
}

SuperUser.prototype.changeDataVisibility = function() {
  this.isDataVisibile = !(this.isDataVisibile);
};

function User() {
  SuperUser.call(this);

  var that = this;
  var _name = '';
  var _sex = '';
  var _birth = '';
  var _address = '';
  var _phone = '';
  var _email = '';

  this.setName = function(name) {
    if (name) {
      _name = name;
    }
  };

  this.getName = function() {
    return _name;
  };

  this.setSex = function(sex) {
    if (sex !== 'male' || sex !== 'female') {
      _sex = sex;
    }
  };

  this.getSex = function() {
    return _sex;
  };

  this.setBirth = function(birth) {
    if (birth) {
      _birth = birth;
    }
  };

  this.getBirth = function() {
    return _birth;
  };

  this.setAddress = function(address) {
    if (address) {
      _address = address;
    }
  };

  this.getAddress = function() {
    return _address;
  };

  this.setPhone = function(phone) {
    if (phone) {
      _phone = phone;
    }
  };

  this.isUserExists = function(userEmail) {
    var exists = false;
      if (users.length) {
        for (var key in users) {
          if (users[key].getEmail() === userEmail) {
            exists = true;
          }
        }
      }

    return exists;
  };

  this.getPhone = function() {
    return _phone;
  };

  this.setEmail = function(email) {
    if (email) {
      _email = email;
    }
  };

  this.getEmail = function() {
    return _email;
  };

  this.save = function() {
    that.generateUniqueId();
  };

  this.generateUniqueId = function() {
    that.id = Math.random();
  };

  this.isValid = function(fieldsArray) {

    var validationArray = [];

    if (fieldsArray) {
      for (var key in fieldsArray) {
        var name = key;
        var inputValue = fieldsArray[key].value.trim();
        var valid = false;
        var errorMessage = '';

        if (inputValue) {

          switch(name) {
            case 'name' :
              var regexpName = new RegExp('^[a-zA-Zа-яА-Я\' ]+$');
              valid = regexpName.test(inputValue);

              if (!valid) {
                errorMessage = `Incorrect data in field 'name'`;
              }

              break;

            case 'sex' :
              valid = (inputValue.toLowerCase() === 'male' || inputValue.toLowerCase() === 'female');
              if (!valid) {
                errorMessage = `Incorrect data. Should be 'male' or 'female'`;
              }

              break;

            case 'phone' :
              var regexpPhone = new RegExp('^[\+][1-9]{1}[0-9]{11}$');
              valid = regexpPhone.test(inputValue);

              if (!valid) {
                errorMessage = `Incorrect data. Should be in format +999999999999`;
              }

              break;

            case 'email' :
              var regexpEmail = new RegExp('^[-a-z0-9!#$%&\'*+\/=?^_`{|}~]+(\.[-a-z0-9!#$%&\'*+\/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$');
              valid = regexpEmail.test(inputValue);

              if (!valid) {
                errorMessage = `Incorrect data in field 'email'.`;
              }

              break;

            default:
              valid = !!(inputValue);
          }
        } else {
          errorMessage = `Field '${name}' shouldn't be empty`;
        }
        var resultObj = {name: name, value: inputValue, valid: valid, message: errorMessage};

        validationArray.push(resultObj);
      }
    } else {
      alert('Incorrect data');
    }

    return validationArray;
  };
}

User.prototype = new SuperUser();


