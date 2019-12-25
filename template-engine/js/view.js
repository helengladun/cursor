$table = document.querySelector('.input-data');
$output = document.querySelector('.output');

//capitalize first letter
function jsUcfirst(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderOutputBlock(users, template) {

  users.forEach(function(user) {
    var p = document.createElement('p');
    p.innerHTML = template(user);
    $output.appendChild(p);
  });

}

function renderTable(users) {

  // for names
  var trNames = document.createElement('tr');
  var tdIdKey = document.createElement('th');
  tdIdKey.innerText = 'ID';
  trNames.appendChild(tdIdKey);

  var tdNameKey = document.createElement('th');
  tdNameKey.innerText = 'NAME';
  trNames.appendChild(tdNameKey);

  var tdAgeKey = document.createElement('th');
  tdAgeKey.innerText = 'AGE';
  trNames.appendChild(tdAgeKey);

  var tdCityKey = document.createElement('th');
  tdCityKey.innerText = 'CITY';
  trNames.appendChild(tdCityKey);

  $table.querySelector('thead').appendChild(trNames);

  users.forEach( function(user) {

    // for values
    var trValues = document.createElement('tr');
    var tdIdValue = document.createElement('td');
    tdIdValue.innerText = user.id ? user.id : '\'no info\'';
    trValues.appendChild(tdIdValue);

    var tdNameValue = document.createElement('td');
    tdNameValue.innerText = user.name ? jsUcfirst(user.name) : '\'no info\'';
    trValues.appendChild(tdNameValue);

    var tdAgeValue = document.createElement('td');
    tdAgeValue.innerText = user.age ? user.age: '\'no info\'';
    trValues.appendChild(tdAgeValue);

    var tdCityValue = document.createElement('td');
    tdCityValue.innerText = user.city ? jsUcfirst(user.city) : '\'no info\'';
    trValues.appendChild(tdCityValue);

    $table.querySelector('tbody').appendChild(trValues);
  });

}
