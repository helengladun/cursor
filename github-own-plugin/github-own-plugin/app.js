function setHeaders(xhr, headers) {
  if (xhr instanceof XMLHttpRequest && headers) {
    headers.forEach(function(item, i, arr){
      xhr.setRequestHeader(item.key, item.value);
    });
  }
}

var ajax = function(params) {

  if (params.method && params.url) {

    var method = params.method.toUpperCase();
    var url = params.url;
    var methodsArray = ['GET', 'POST', 'PUT', 'HEAD'];
    var headers = params.headers ? params.headers : {};
    var data = params.data ? params.data : {};

    if (methodsArray.indexOf(method) > -1) {
      switch (method) {
        case 'GET':
           return ajax.get(url, headers);
          break;
        case 'POST':
          return ajax.post(url, data, headers);
          break;
        case 'PUT':
          return ajax.put(url, data, headers);
          break;
        case 'HEAD':
          return ajax.head(url, headers);
          break;
      }
    } else {
      alert('Incorrect method name!');
    }
  } else {
    alert('Wrong parameters for ajax request!');
  }
};

Promise.prototype.done = function(onFulfilled) {
  this.then(onFulfilled).catch(function (error) {
    setTimeout(function () {
      if (error.code === 404) {
        alert('Incorrect url!');
      } else {
        // console.log(error);
        alert(error);
      }
    }, 0);
  });
};

ajax.get = function(url, headers) {
  var _headers = headers;

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    setHeaders(xhr, _headers);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.responseText);
      } else {
        var error = new Error(this.statusText);
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

ajax.post = function(url, data, headers) {
  var _headers = headers;
  _headers.push({key: 'Content-Type', value:'application/x-www-form-urlencoded'});
  var _data = data;
  var params = '';

  if (Object.keys(_data).length > 0) {

    params = parseParamsData(_data);

    return new Promise(function(resolve, reject) {

      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);

      setHeaders(xhr, _headers);

      xhr.onload = function() {
        if (this.status == 200) {
          resolve(this.responseText);
        } else {
          var error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };

      xhr.onerror = function() {
        reject(new Error("Network Error"));
      };

      xhr.send(params);
    });
  }
};

ajax.head = function(url, headers) {
  var _headers = headers;
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, true);

    setHeaders(xhr, _headers);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.getAllResponseHeaders());
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

ajax.put = function(url, data, headers) {
  var _headers = headers;
  var _data = data;
  var params = '';

  if (Object.keys(_data).length > 0) {

    params = parseParamsData(_data);

    return new Promise(function(resolve, reject) {

      var xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);

      setHeaders(xhr, _headers);

      xhr.onload = function() {
        if (this.status == 200) {
          resolve(this.responseText);
        } else {
          var error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };

      xhr.onerror = function() {
        reject(new Error("Network Error"));
      };

      xhr.send(params);
    });
  }
};

function parseParamsData(params) {
  var parameters = '';
  var count = 1;

  params.forEach(function(item, i, arr) {
    if (count !== 1) {
      parameters += '&';
    }
    parameters += encodeURIComponent(item.name) + "=" + encodeURIComponent(item.value);
    count++;
  });

  return parameters;
}
