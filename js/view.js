function View() {
  var that = this;
  var $table = document.querySelector('table tbody');
  var $form = document.querySelector('form[name="management-form"]');
  var $fields = {
    'name': document.querySelector('input[id="name"]'),
    'sex': document.querySelector('select[id="sex"]'),
    'birth': document.querySelector('input[id="birth"]'),
    'address': document.querySelector('input[id="address"]'),
    'phone': document.querySelector('input[id="phone"]'),
    'email': document.querySelector('input[id="email"]')
  };

  this.bindEvents = function() {
    $form.onsubmit = this.onSaveButtonClick;
  };

  this.onSaveButtonClick = function(e) {
    e.preventDefault();

    that.clearErrors();

    var user = new User();

    var validArr = user.isValid($fields);
    var notValidCount = 0;

    if (validArr) {
      for (var key in validArr) {
        var name = validArr[key].name;
        $fields[name].parentNode.classList.remove('has-error');
        $fields[name].parentNode.classList.remove('has-success');

        if (!validArr[key].valid) {
          var spanError = $fields[name].parentNode.parentNode.querySelector('.text-error');

          spanError.innerText = validArr[key].message;
          $fields[name].parentNode.classList.add('has-error');

          notValidCount++;
        } else {
          $fields[name].parentNode.classList.add('has-success');
        }

        // that.clearErrors();
      }

      if (notValidCount === 0) {

        if (user.isUserExists($fields.email.value)) {
          alert('User with such email is already exists!');
        } else {
          user.setName($fields.name.value);
          user.setSex($fields.sex.value);
          user.setBirth($fields.birth.value);
          user.setAddress($fields.address.value);
          user.setPhone($fields.phone.value);
          user.setEmail($fields.email.value);

          user.save();

          users.push(user);

          that.clearForm();
          that.render();
          that.showTable();
        }
      }
    }
  };

  this.clearForm = function() {
    $fields.name.value = '';
    $fields.sex.value = 'Male';
    $fields.birth.value = '';
    $fields.address.value = '';
    $fields.phone.value = '';
    $fields.email.value = '';

    this.clearErrors();
  };

  this.clearErrors = function() {
    for (var key in $fields) {
      var name = $fields[key].name;

      $fields[name].parentNode.classList.remove('has-error');
      $fields[name].parentNode.classList.remove('has-success');

      if ($fields[name].parentNode.parentNode.querySelector('.text-error')) {
        $fields[name].parentNode.parentNode.querySelector('.text-error').innerText='';
      }
    }
  };

  this.render = function() {
    this.clearTable();

    users.forEach(function(user) {
      that.addRow(user);
    });
  };

  this.clearTable = function() {
    $table.innerHTML = '';
  };

  this.showTable = function() {
    if (users.length) {
      $table.parentNode.classList.remove('hidden');
    }
  };

  this.addRow = function(user) {
    var $tr = document.createElement('tr');

    $tr.addEventListener('click', that.onRowClick);

    $tr.setAttribute('data-id', user.id);

    var $tdName = document.createElement('td');
    $tdName.innerHTML = user.getName();
    $tr.appendChild($tdName);

    var $tdSex = document.createElement('td');
    $tdSex.innerHTML = user.getSex();
    $tr.appendChild($tdSex);

    var $tdBirth = document.createElement('td');
    $tdBirth.innerHTML = user.getBirth();
    $tr.appendChild($tdBirth);

    var $tdAddress = document.createElement('td');
    $tdAddress.innerHTML = user.getAddress();
    $tr.appendChild($tdAddress);

    var $tdPhone = document.createElement('td');
    $tdPhone.innerHTML = user.getPhone();
    $tr.appendChild($tdPhone);

    var $tdEmail = document.createElement('td');
    $tdEmail.innerHTML = user.getEmail();
    $tr.appendChild($tdEmail);

    $table.appendChild($tr);
  };

  this.onRowClick = function(e) {

    var $currentRow = e.target.parentNode;
    var userId = $currentRow.getAttribute('data-id');

    var user = users.find( function(user) {
      return user.id == userId;
    });

    if (user) {
      user.changeDataVisibility();
      if (user.isDataVisibile) {
        $currentRow.classList.remove('hidden-row');
      } else {
        $currentRow.classList.add('hidden-row');
      }

    }

  }
}

var table = new View();
table.bindEvents();
table.showTable();