var $currBalance = document.querySelector('#opened-casino-block .curr-balance .value');
var $currQuantity = document.querySelector('#opened-casino-block .curr-quantity .value');
var $infoText = document.querySelector('.casino-buttons-block .text-info');
var $infoTextMachine = document.querySelector('.machine-buttons-block .text-info');
var $shownBlock = document.querySelector('.shown-array');

var changeBalanceAndQuant = function() {
  if (casino) {
    $currBalance.innerText = casino.getTotalMoney();
    $currQuantity.innerText  = casino.getQuantitySlotMachines();
  }
};

var showMachinesInConsole = function(casino) {
  if (casino instanceof Casino) {
    var arr = casino.getSlotMachineArr();

    console.clear();
    console.log('----ARRAY OF MACHINES----');
    arr.forEach(function(obj) {
      console.log(obj.getName());
      console.log(obj.getCurrentMoney());
    });
    console.log('----ARRAY OF MACHINES----');
  }
};

document.addEventListener('DOMContentLoaded', function(){
  Typed.new('#typed-text', {
    strings: ["Click on the button below and start your business", "Start your business right now! Click on the button below."],
    typeSpeed: 0
  });
});

document.querySelector('#add-new-machine').addEventListener('click', function() {
  casino.addNewSlotMachine();
  changeBalanceAndQuant();
  $infoText.innerText = 'You\'ve just added new slot machine';
});

document.querySelector('#remove-machine').addEventListener('click', function() {
  if (casino instanceof Casino) {
    var length = casino.getSlotMachineArr().length;
    var number = 0;

    if (length > 0) {
      do {
        number = parseInt(prompt('Enter a number of machine to remove from 1 to ' + length, '2'), 10);
      } while (!number || typeof number !== 'number' || number < 0 || number > length);

      var removed = casino.removeSlotMachine(number);
      $infoText.innerText = 'You\'ve just removed slot machine № ' + removed.getName();
    } else {
      alert('There are no available machines to remove');
    }

    changeBalanceAndQuant();
  }
});

document.querySelector('#take-money-casino').addEventListener('click', function() {
  if (casino instanceof Casino) {
    var currBalance = casino.getTotalMoney();
    var takeBack = 0;

    if (currBalance <= 0) {
      alert('There are no money in casino');
    } else {
      do {
        takeBack = parseInt(prompt(`Enter a number of cash you want to take back\, $ (max ${currBalance})`, '1000'));
      } while (!takeBack || typeof takeBack !== 'number' || takeBack < 0 || takeBack > currBalance);

      casino.takeMoneyBackFromMachines(takeBack);
      $infoText.innerText = 'You\'ve just take back $' + takeBack;
      changeBalanceAndQuant();
    }
  }
});

document.querySelector('#machines-balance').addEventListener('click', function() {
  if (casino instanceof Casino) {
    var arr = casino.getSlotMachineArr();
    var length = arr.length;
    var number = 0;

    if (length > 0) {
      do {
        number = parseInt(prompt('Enter a number of machine from 1 to ' + length + ' to look the balance', '2'), 10);
      } while (!number || typeof number !== 'number' || number < 0 || number > length);

      var balance = arr[number - 1].getCurrentMoney();
      $infoTextMachine.innerText = 'Balance in machine ' + arr[number - 1].getName() + ' is ' + balance;
      changeBalanceAndQuant();
    } else {
      alert('There are no available machines');
    }
  }
});

document.querySelector('#take-money-machine').addEventListener('click', function() {
  if (casino instanceof Casino) {
    var number;
    var arr = casino.getSlotMachineArr();
    var length = arr.length;
    var takeBack = 0;

    if (length > 0) {
      do {
        number = parseInt(prompt('Enter a number of machine from 1 to ' + length + ' to take money.', '2'), 10);
      } while (!number || typeof number !== 'number' || number < 0 || number > length );

      var currBalance = arr[number-1].getCurrentMoney();

      if (currBalance <= 0) {
        alert('You can\'t take any money. This slot machine is empty');
      } else {
        do {
          takeBack = parseInt(prompt(`Enter a number of cash you want to take back\, $ (max ${currBalance})`, '1000'), 10);
        } while (!takeBack || typeof takeBack !== 'number' || takeBack < 0 || takeBack > currBalance);

        arr[number-1].returnMoney(takeBack);
        $infoTextMachine.innerText = 'You\'ve just take back $' + takeBack + ' from ' + arr[number-1].getName();
        changeBalanceAndQuant();
      }
    } else {
      alert('There are no available machines');
    }
  }
});

document.querySelector('#put-money').addEventListener('click', function() {
  if (casino instanceof Casino) {
    var number;
    var arr = casino.getSlotMachineArr();
    var length = arr.length;
    var putInto = 0;

    if (length > 0) {
      do {
        number = parseInt(prompt('Enter a number of machine from 1 to ' + length + ' to put money into.', '2'), 10);
      } while (!number || typeof number !== 'number' || number < 0 || number > length);

      var name = arr[number-1].getName();

      do {
        putInto = parseInt(prompt(`Enter a number of cash you want to put into machine ${name}`, '1000'), 10);
      } while (!putInto || typeof putInto !== 'number' || putInto < 0);

      arr[number-1].putMoney(putInto);
      $infoTextMachine.innerText = 'You\'ve just put $' + putInto + ' into ' + arr[number-1].getName();
      changeBalanceAndQuant();
    } else {
      alert('There are no available machines');
    }
  }
});

document.querySelector('#play').addEventListener('click', function() {
  if (casino instanceof Casino) {
    var number;
    var arr = casino.getSlotMachineArr();
    var length = arr.length;
    var putInto;
    var result;

    if (length > 0) {
      do {
        number = parseInt(prompt('Enter a number of machine from 1 to ' + length + ' to play on.', '2'), 10);
      } while (!number || typeof number !== 'number' || number < 0 || number > length);

      var name = arr[number - 1].getName();

      do {
        putInto = parseInt(prompt(`Enter a number of cash you want to put into machine ${name} to play`, '1000'), 10);
      } while (!putInto || typeof putInto !== 'number' || putInto < 0);

      result = arr[number - 1].play(putInto);
      $infoTextMachine.innerText = `Your number is ${result[0].number}, ${result[0].text}. Your gain is $ ${result[0].money}`;
      changeBalanceAndQuant();
    } else {
      alert('There are no available machines');
    }
  }
});

document.querySelector('#show-arr-machines').addEventListener('click', function() {

  var arr = casino.getSlotMachineArr();

  if (arr.length) {

    while ($shownBlock.hasChildNodes()) {
      $shownBlock.removeChild($shownBlock.lastChild);
    }

    arr.forEach(function(obj) {
      var myDiv = document.createElement('div');
      myDiv.innerHTML = '<span>' + obj.getName() + '</span> <span> $' + obj.getCurrentMoney() + '</span>';
      $shownBlock.appendChild(myDiv);
    });

    $shownBlock.classList.remove('hidden');
    $shownBlock.classList.add('visible');

    showMachinesInConsole(casino);
  } else {
    alert('There are no available machines');
  }

});
