function User() {
  var _lastVisitDate,
      _globalDiscount,
      _nightDiscount,
      _weekendDiscount,
      _ordersCount,
      _ordersTotalPrice,
      _bonus;

  this.setLastVisitDate = function(date) {
    if ( date instanceof Date ) {
      _lastVisitDate = date;
    }
  };

  this.getLastVisitDate = function() {
    return _lastVisitDate;
  };

  this.setGlobalDiscount = function(globalDiscount) {
    if ( globalDiscount >= 0 ) {
      _globalDiscount = globalDiscount;
    }
  };

  this.getGlobalDiscount = function() {
    return _globalDiscount;
  };

  this.setNightDiscount = function(nightDiscount) {
    if ( nightDiscount >= 0 )
    _nightDiscount = nightDiscount;
  };

  this.getNightDiscount = function() {
    return _nightDiscount;
  };

  this.setWeekendDiscount = function(weekendDiscount) {
    if ( weekendDiscount ) {
      _weekendDiscount = weekendDiscount;
    }
  };

  this.getWeekendDiscount = function() {
    return _weekendDiscount;
  };

  this.setOrdersCount = function(orderCount) {
    if ( orderCount >= 0 ) {
      _ordersCount = orderCount;
    }
  };

  this.getOrdersCount = function() {
    return _ordersCount;
  };

  this.setOrdersTotalPrice = function(ordersTotalPrice) {
    if ( ordersTotalPrice >= 0 ) {
      _ordersTotalPrice = ordersTotalPrice;
    }
  };

  this.getOrdersTotalPrice = function() {
    return _ordersTotalPrice;
  };

  this.setUserBonus = function(bonus) {
    if ( bonus >= 0 ) {
      _bonus = bonus;
    }
  };

  this.getUserBonus = function() {
    return _bonus;
  };

  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  function randomNumber(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }


  this.init = function() {
    var start = new Date('06-01-2017');

    //generating random values
    var randLastVisit = randomDate(start, new Date());
    var randGlobalDiscount = randomNumber(1, 10);
    var randNightDiscount = randomNumber(10, 25);
    var randWeekendDiscount = randomNumber(5, 20);
    var randOrdersCount = randomNumber(1, 100);
    var randOrdersTotalPrice = randOrdersCount * randomNumber(10, 10000);
    var randBonus = randomNumber(5, 15);

    this.setLastVisitDate(randLastVisit);
    this.setGlobalDiscount(randGlobalDiscount);
    this.setNightDiscount(randNightDiscount);
    this.setWeekendDiscount(randWeekendDiscount);
    this.setOrdersCount(randOrdersCount);
    this.setOrdersTotalPrice(randOrdersTotalPrice);
    this.setUserBonus(randBonus);

  };

  this.init();

  return this;

}
