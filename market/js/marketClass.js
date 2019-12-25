function Market() {
  this.placesArr = [];
}

Market.prototype.setPlacesArr = function(placesArr) {
  if (typeof placesArr !== 'undefined' && placesArr.length > 0) {
    this.placesArr = placesArr;
  }
};

Market.prototype.getPlacesArr = function () {
  return this.placesArr;
};