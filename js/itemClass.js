function Item(name) {

  var _name = name;
  var _place = '';
  var _price = '';
  var _units = '';
  var _weight = '';

  this.getName = function() {
    return _name;
  };

  this.setPlace = function(place) {
    if (place) {
      _place = place;
    }
  };

  this.getPlace = function() {
    return _place;
  };

  this.setPrice = function(price) {
    if (price && typeof price === 'number' && price > 0)
    {
      _price = price;
    }
  };

  this.getPrice = function() {
    return _price;
  };

  this.setUnits = function(units) {
    if (units === 'piece' || units === 'kg') {
      _units = units;
    }
  };

  this.getUnits = function() {
    return _units;
  };

  this.setWeight = function(weight) {
    if (weight && typeof weight === 'number' && weight > 0) {
      _weight = weight;
    }
  };

  this.getWeight = function() {
    return _weight;
  };

}

Item.prototype.getRandomPrice = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};