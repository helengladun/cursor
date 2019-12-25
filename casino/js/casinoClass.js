function Casino(quantity, money) {

  var _slotMachinesNumber = quantity;
  var _cash = money;
  var _machinesArr = [];

  this.setMoney = function(money) {
    if (money >= 0) {
      _cash = money;
    }
  };

  this.getMoney = function() {
    return _cash;
  };

  this.getTotalMoney = function() {
    var moneyInMachinesArr = this.curMoneyInMachines();
    var result;

    if (moneyInMachinesArr && moneyInMachinesArr.length > 0) {
      result =  this.curMoneyInMachines().reduce(function(total, curr) {return total + curr;});
    } else {
      this.setMoney(0);
      result = this.getMoney();
    }

    return result;
  };

  this.setQuantitySlotMachines = function(quantity) {
    if (quantity || quantity === 0) {
      _slotMachinesNumber = parseInt(quantity, 10);
    }
  };

  this.getQuantitySlotMachines = function() {
    return _slotMachinesNumber;
  };

  this.getSlotMachineArr = function() {
    return _machinesArr;
  };

  this.setSlotMachineArr = function(machinesArr) {
    if (machinesArr.length > 0) {
      _machinesArr = machinesArr;
    }
  };

  this.curMoneyInMachines = function() {
    var slotMachinesArray = this.getSlotMachineArr();
    var result;
    if (slotMachinesArray.length > 0) {
      result = slotMachinesArray
          .map(function(machine) {return machine.getCurrentMoney()});
    } else {
      result = 0;
    }
    return result;
  };

  this.createSlotMachines();
}

Casino.prototype.addNewSlotMachine = function() {

  var moneyInEachMachineArr = this.curMoneyInMachines();
  var slotMachinesArray = this.getSlotMachineArr();
  var moneyInCasino = this.getTotalMoney();

  if (moneyInCasino > 0) {
    var maxMoneyNumberInMachine = Math.max.apply(null, moneyInEachMachineArr);
    var slotMachine = new SlotMachine();
    var name = 'slotmachine_' + this.getRandName(5);

    slotMachine.setName(name);
    slotMachine.setCurrentMoney(maxMoneyNumberInMachine/2);
    slotMachinesArray.push(slotMachine);

    this.setQuantitySlotMachines(slotMachinesArray.length);

    this.setSlotMachineArr(slotMachinesArray);
  } else {
    alert('You don\'t have any money to create new slot machine');
  }
};

Casino.prototype.removeSlotMachine = function(indexNumber) {

  if (indexNumber) {

    var slotMachinesArray = this.getSlotMachineArr();
    var removedMachine;

    if (slotMachinesArray.length > 0) {
      if (slotMachinesArray.indexOf(slotMachinesArray[indexNumber-1]) > -1) {

        removedMachine = slotMachinesArray[indexNumber-1];
        var moneyInMachine = slotMachinesArray[indexNumber-1].getCurrentMoney();
        slotMachinesArray.splice(indexNumber-1, 1);

        var moneyPerRestMachine = (moneyInMachine/slotMachinesArray.length).toFixed(2);
        slotMachinesArray.map(function(machine) {return machine.setCurrentMoney(machine.getCurrentMoney() + moneyPerRestMachine);});
      } else {
        alert('Not existing machine!');
      }

      this.setQuantitySlotMachines(slotMachinesArray.length);

      this.setSlotMachineArr(slotMachinesArray);

    } else {
      alert('You have removed all of machines');
    }

    return removedMachine;
  }

};

Casino.prototype.createSlotMachines = function() {

  var slotMachinesArray = [];
  var moneyOnMachines = 0;
  var moneyInCasino = this.getMoney();
  var slotMachinesNumber = this.getQuantitySlotMachines();
  var moneyPerMachine = Math.floor(moneyInCasino/slotMachinesNumber);
  var valid = false;

  if (slotMachinesNumber && moneyPerMachine && moneyPerMachine > 10) {
    for (var i = 1; i <= slotMachinesNumber; i++) {
      var slotMachine = new SlotMachine(moneyPerMachine);
      moneyOnMachines += moneyPerMachine;
      var name = '';
      name = 'slotmachine_' + this.getRandName(5);
      slotMachine.setName(name);
      slotMachinesArray.push(slotMachine);
    }

    this.getRandomMachine(slotMachinesArray).setName('lucky');
    var restOfMoney = moneyInCasino - moneyOnMachines;
    if (slotMachinesArray.length > 0 && restOfMoney > 0) {
      var moneyStartOnFirstMachine = slotMachinesArray[0].getCurrentMoney() + restOfMoney;
      slotMachinesArray[0].setCurrentMoney(moneyStartOnFirstMachine);
    }
    valid = true;
  }

  this.setSlotMachineArr(slotMachinesArray);

  if (valid) {
    return slotMachinesArray;
  }
};

Casino.prototype.takeMoneyBackFromMachines = function(number) {

  var moneyBack = number;

  if (moneyBack > 0) {

    var sortedArr = this.getSlotMachineArr()
        .sort(function(a, b) {return b.getCurrentMoney() - a.getCurrentMoney();});

    for (var i = 0; i < sortedArr.length; i++) {
      var currMoney = sortedArr[i].getCurrentMoney();

      if (moneyBack - currMoney > 0) {
        moneyBack -= currMoney;
        sortedArr[i].setCurrentMoney(0);
      } else if (moneyBack - currMoney === 0) {
        sortedArr[i].setCurrentMoney(0);
        break;
      } else {
        sortedArr[i].setCurrentMoney(currMoney - moneyBack);
        break;
      }
    }

  }
  this.setSlotMachineArr(sortedArr);
};

Casino.prototype.getRandomMachine = function(items) {
  var item = items[Math.floor(Math.random()*items.length)];
  return item;
};

Casino.prototype.getRandName = function(num) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < num; i++)
  {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var casino = 0;