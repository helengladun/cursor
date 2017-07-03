function UserDecoration( user ) {
  this._user = user;
}

UserDecoration.prototype = {

  getDiscount: function() {
    var SATURDAY_NUMBER = 6;
    var SUNDAY_NUMBER = 0;

    var now = new Date();
    var currentHour = now.getHours();
    var currentDay = now.getDay();
    var result = this._user.getGlobalDiscount();

    if (currentHour >= 23 || currentHour <= 5) {
      result +=  this._user.getNightDiscount();
    }

    if (currentDay === SUNDAY_NUMBER || currentDay === SATURDAY_NUMBER) {
      result += this._user.getWeekendDiscount();
    }

    return result;
  },

  getBonus: function() {
    var MAX_BONUS = 240;
    var ACTIVE_DAYS = 10;

    var lastVisitHours = this._user.getLastVisitDate();
    var now = new Date();
    var hoursTillNow = Math.floor(Math.abs(now - lastVisitHours) / 360000);
    var result = this._user.getUserBonus();
    var activeHours = ACTIVE_DAYS * 24;

    if (hoursTillNow <= activeHours) {
      result += MAX_BONUS - hoursTillNow;
      result += this._user.getOrdersCount();
    }

    return result;
  }
};
