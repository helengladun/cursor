function SlotMachine(money) {

  var _name = '';
  var _money = money;

  this.setName = function(name) {
    _name = name;
  };

  this.getName = function() {
    return _name;
  };

  this.setCurrentMoney = function(money) {
    if (money && typeof money === 'number' || money === 0) {
      _money = money;
    } else if (money < 0) {
      _money = 0;
    }
  };

  this.getCurrentMoney = function() {
    return _money;
  };

  this.getRandNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

SlotMachine.prototype.returnMoney = function(number) {
  if (number && typeof number === 'number') {
    if (this.getCurrentMoney() - number >= 0) {
      this.setCurrentMoney(this.getCurrentMoney() - number);
    } else {
      alert('You can return only $' + this.getCurrentMoney());
      this.setCurrentMoney(0);
    }
  }
};

SlotMachine.prototype.putMoney = function(number) {
  if (number && typeof number === 'number') {
    this.setCurrentMoney(this.getCurrentMoney() + number);
  }
};

SlotMachine.prototype.play = function(number) {
  if (number && typeof number === 'number') {
    this.setCurrentMoney(this.getCurrentMoney() + number);
    var randNumber = this.getRandNumber(100, 999);
    var moneyToReturn = 0;
    var text = '';
    if (this.getName() === 'lucky' || randNumber === 777) {
      text = 'great! you win all money';
      moneyToReturn = this.getCurrentMoney();
      this.returnMoney();
    } else if (randNumber.toString()[0] === randNumber.toString()[1] ||
        randNumber.toString()[1] === randNumber.toString()[2] ||
        randNumber.toString()[0] === randNumber.toString()[2] ) {
      moneyToReturn = number * 2;
      moneyToReturn = (moneyToReturn >= this.getCurrentMoney()) ? this.getCurrentMoney() : moneyToReturn;
      text = 'great! you win $' +  moneyToReturn;
    } else {
      text = 'You didn\'t win any money, try again!';
    }

    this.setCurrentMoney(this.getCurrentMoney() - moneyToReturn);

    return [{'number' : randNumber, 'text': text, 'money': moneyToReturn}];
  }
};
