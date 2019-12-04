var applyLanguage = function (lang) {
  alert('now language is: ' + lang);
};

var getCurrentLanguage = function () {
  var defaultLanguage = 'ua';
  var savedLanguage = localStorage.getItem('lang');

  if (localStorage && savedLanguage) {
    defaultLanguage = savedLanguage;
  }

  return defaultLanguage;
};

var currentLang = getCurrentLanguage();

displayText(currentLang);

function displayText(lang) {
  var langEls = document.getElementsByClassName('lang-' + lang);

  makeLangInputChecked(lang);

  for (var i=0; i<langEls.length; i++) {
    var langEl = langEls[i];

    langEl.classList.add('visible');
  }
}


var $save = document.querySelector('html body button#save');

$save.addEventListener('click', function(){
  var checkedInput = document
    .querySelector('#languages input[name="lang"]:checked')
    .parentNode;

  if (checkedInput) {
    var language = checkedInput
      .innerText
      .trim()
      .toLowerCase();
    if (localStorage) {
      localStorage.setItem('lang', language);
    }

    applyLanguage(language);

    var allVisibleEl = document.querySelectorAll('.lang.visible');

    if (allVisibleEl) {
      [].forEach.call(allVisibleEl, function(el) {
        el.classList.remove('visible');
      });
    }

    displayText(language);
  }
});

function makeLangInputChecked(lang) {
  var langInputs = document.querySelectorAll('#languages input[name="lang"]');

  for (var i = 0; i < langInputs.length; i++) {
      langInputs[i].removeAttribute('checked');
    if (langInputs[i].parentNode.innerText.trim().toLowerCase() === lang) {
      langInputs[i].setAttribute('checked', 'checked');
      console.log(langInputs[i]);
    }
  }
}