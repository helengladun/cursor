var $form = document.querySelector('.get-info');
var url = 'https://api.github.com';
var $resultBlock  = document.querySelector('.result-block .result');
var $headersBlock  = document.querySelector('.result-block .headers');
var headers = [];
headers.push({key: 'Content-Type', value: 'text/html; charset=utf-8'}); //show hot it works headers
// headers.push({key:'Access-Control-Expose-Headers', value: 'X-Uid, X-Authentication'}); //add new headers
// var data = {'description':'Created via API','public':'true'};
var number = 1;
var paramsArr = [];

var appendResult = function(text) {
  var resultText = '<h3>Result data</h3>' + text;
  $resultBlock.innerHTML = resultText;
};

var appendHeaders = function(headers) {
  $headersBlock.innerHTML = headers;
};

var getRequestMethod = function() {
  return document.querySelector('.request-method option:checked').text.toLowerCase();
};

var renderData = function(data) {
  var text = '</ul>';
  for (var key in data) {
    text += '<li>' + key + ':' + data[key] + '</li>';
  }
  text += '</ul>';

  return text;
};

var cb = function(data) {

  var resultText = data.data ? renderData(data.data) : null;

  var metaText = '<h3>Meta data</h3>';
  metaText += renderData(data.meta);

  appendResult(resultText);
  appendHeaders(metaText);
};

function jsonpRequest(url, cb) {
  var _url = url;
  var script = document.createElement('script');
  script.src = _url + '/?callback=cb';

  document.body.appendChild(script);
}

var getInfo = function(url, method) {
  var parameters = {'url': url, 'method': method, 'headers': headers, 'data': paramsArr};

  if ((method === 'post' || method === 'put') && paramsArr.length < 1) {
    alert('Add parameters for this request');
  } else {
    try {
      ajax(parameters).done(function(result) {
        $resultBlock.classList.remove('hidden');
        // $headersBlock.classList.remove('hidden');
        appendResult(result);
        // jsonpRequest(url, cb);
      });
    } catch (error) {
      alert(error);
    }
  }

};

$form.onsubmit = function(e) {
  e.preventDefault();
  var $requestMethod = getRequestMethod();
  $resultBlock.classList.add('hidden');
  $headersBlock.classList.add('hidden');
  clearResultBlock();
  var $inputUrl = this.querySelector('#url');
  var $inputUrlVal = this.querySelector('#url').value.trim();

  if ($inputUrlVal === '') {
    getInfo(url, $requestMethod);
  } else if (isValid($inputUrl)) {
    var newUrl = url + '/' + $inputUrlVal;
    getInfo(newUrl, $requestMethod);
  } else {
    if (!isValid($inputUrl)) {
      alert('Incorrect format of url!')
    }
  }

};

document.querySelector('#addData').addEventListener('click', function(e) {
  e.preventDefault();
  var $requestMethod = getRequestMethod();

  if ($requestMethod === 'post' || $requestMethod === 'put') {
    var name = prompt('Enter the name of parameter');
    var value = prompt('Enter the value of parameter');
    if (name && value) {
      var obj = {name : name, value: value, number: number};
      paramsArr.push(obj);
      addToDom(obj);
      number++;
    } else {
      alert('Parameters shouldn\'t be 0!');
    }
  } else {
    alert('To use this option, you need to check POST or PUT method!');
  }
});


document.querySelector('#clearData').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.params div').innerHTML = '';
  document.querySelector('.params').classList.add('hidden');
  paramsArr = [];
  number = 1;
});

var addToDom = function(arr) {
  var p = document.createElement('p');
  p.innerText = `Parameter №${arr.number} ${arr.name}  ${arr.value}`;
  document.querySelector('.params div').appendChild(p);
  document.querySelector('.params').classList.remove('hidden');
};

function clearResultBlock() {
  $resultBlock.innerHTML = '';
}

function isValid(el) {
  var pattern = null;
  var regex = null;
  var validStatus = false;
  var inputName = el.name;
  var inputValue = el.value;

  if (inputName) {
    switch (inputName) {
      case "url":
        regex = '^[a-z0-9-.\/]*$';
        break;
    }
  }

  if (regex) {
    pattern = new RegExp(regex);
    validStatus = !!(pattern.test(inputValue));
  }

  return validStatus;
}

getInfo(url, getRequestMethod());
