document.querySelector('button.add-name').addEventListener('click', function(){
  var name = prompt('Enter your name');

  changeH2(name);
});
