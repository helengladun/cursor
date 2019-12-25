function Manager() {

  var _marketSectors = ['A1','A2','A3','A4','A5','A6','A7','A8',
    'B1','B2','B3','B4','B5','B6','B7','B8',
    'C1','C2','C3','C4','C5','C6','C7','C8',
    'D1','D2','D3','D4','D5','D6','D7','D8',
    'E1','E2','E3','E4','E5','E6','E7','E8'];

  this.createItems = function() {

    var itemsArray = [];
    var bread = new Item('Bread');
    var potatoes = new Item('Potatoes');
    var carrots = new Item('Carrots');
    var milk = new Item('Milk');
    var eggs = new Item('Eggs');
    var pringles = new Item('Pringles');
    var nuts = new Item('Nuts');
    var bananas = new Item('Bananas');
    var onions = new Item('Onions');
    var lays = new Item('Lays');
    var pepsi = new Item('Pepsi');
    var popcorn = new Item('Popcorn');
    var nutella = new Item('Nutella');
    var apples = new Item('Apples');
    var juice = new Item('Juice');

    bread.setUnits('piece');
    itemsArray.push(bread);

    potatoes.setUnits('kg');
    itemsArray.push(potatoes);

    carrots.setUnits('kg');
    itemsArray.push(carrots);

    milk.setUnits('piece');
    itemsArray.push(milk);

    eggs.setUnits('piece');
    itemsArray.push(eggs);

    pringles.setUnits('piece');
    itemsArray.push(pringles);

    nuts.setUnits('kg');
    itemsArray.push(nuts);

    bananas.setUnits('kg');
    itemsArray.push(bananas);

    onions.setUnits('kg');
    itemsArray.push(onions);

    lays.setUnits('piece');
    itemsArray.push(lays);

    pepsi.setUnits('piece');
    itemsArray.push(onions);

    popcorn.setUnits('piece');
    itemsArray.push(popcorn);

    nutella.setUnits('piece');
    itemsArray.push(nutella);

    apples.setUnits('kg');
    itemsArray.push(apples);

    juice.setUnits('piece');
    itemsArray.push(juice);

    var placesArray = _marketSectors;

    itemsArray.forEach(function(item) {
      // get rand place
      var randPlace = placesArray[Math.floor(Math.random() * placesArray.length)];
      var index = placesArray.indexOf(randPlace);
      var randPrice =  item.getRandomPrice(1, 20);
      // set rand place
      item.setPlace(randPlace);
      item.setPrice(randPrice);
      // remove from array to not duplicate places
      placesArray.splice(index, 1);
    });

    return itemsArray;
  };


  this.marketSectorization = function(placesArray) {
    var superMarket = new Market();

    superMarket.setPlacesArr(placesArray);
  }
}
