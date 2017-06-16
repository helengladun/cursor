var $form = document.querySelector('.get-images-form');

var get = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== xhr.DONE) return;

    var status = xhr.status;
    var headers = xhr.getAllResponseHeaders();
    var text = xhr.responseText;

    callback(status, headers, text);
  };

  xhr.send();
};

var appendImage = function (url) {
  var imgEl = document.createElement('img');
  // <img />

  imgEl.src = url;
  // <img src="{url}" />

  imgEl.classList.add('image');
  imgEl.classList.add('img-rounded');

  imgEl.onerror = function () {
    // when image loading failed
    // imgEl.src = 'img/not-avail.jpg';
    imgEl.classList.add('hidden');
    // alert(1);
  };

  document.getElementById('images').appendChild(imgEl);
};

// getImages({limit: 5})
// getImages({})
// getImages() -- by default should take 100 images

// getImages({limit: 5, category: "cats"})
// getImages({category: "cats"})
// getImages()

// "S"OLID, S -> Single Responsibility
var getImages = function(params) {

  var limit;
  var cat;

  if (params.limit && params.category) {
    limit = params.limit;
    cat = params.category;
  } else {
    limit = 100;
    cat = 'cats';
  }

  // var url = 'https://www.reddit.com/r/pics.json';
  var url = 'https://www.reddit.com/r/pics/search.json?q=' + cat;
  url += '&limit=' + limit;

  get(url, function (status, headers, body) {
    var response = JSON.parse(body);

    _.each(response.data.children, function (child) {
      var url = child.data.url;

      appendImage(url);

      // console.log('ITEM!', child.data.url);
    });

  });

};

var params = {};

$form.onsubmit = function(e) {
  e.preventDefault();
  clearImagesBlock();
  var $inputCatName = this.querySelector('#imgCatName');
  var $inputLimit = this.querySelector('#imgLimit');

  if ($inputCatName.value === '' && $inputLimit.value === '') {
    var params = {'category': 'cats', 'limit' : 100};
    $form.classList.remove('centered');
    getImages(params);
  } else if (isValid($inputCatName) && isValid($inputLimit) ) {
    var params = {'category': $inputCatName.value, 'limit' : $inputLimit.value};
    $form.classList.remove('centered');
    getImages(params);
  } else {
    if (!isValid($inputLimit)) {
      alert('Incorrect limit, should be only digits!')
    } else if (!isValid($inputCatName)) {
      alert('Incorrect limit, should be only letters!');
    }
  }

};

function clearImagesBlock() {
  document.querySelector('#images').innerHTML = '';
  document.querySelector('.failed-info').innerHTML = '';
 }

function isValid(el) {
  var pattern = null;
  var regex = null;
  var validStatus = false;
  var inputName = el.name;
  var inputValue = el.value;

  if (inputName) {
    switch (inputName) {
      case "category":
        regex = '^[a-zA-Z- ]*$';
        break;
      case "limit":
        regex = '^[1-9][0-9]*$';
        break;
    }
  }

  if (regex) {
    pattern = new RegExp(regex);
    validStatus = !!(pattern.test(inputValue));
  }

  return validStatus;
}