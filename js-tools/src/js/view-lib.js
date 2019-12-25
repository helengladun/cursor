var changeH2 = function(name) {
  var h2 = document.querySelector('h2');

  if (name) {

    h2.innerText = '';
    var regex = '^([a-zA-Z])*$';
    var pattern = new RegExp(regex);
    var valid = pattern.test(name);

    if (valid) {
      h2.innerText =  'Thank you ' + name + '!';
    } else {
      alert('Not valid name');
    }
  }
};