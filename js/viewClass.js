function View() {

  var that = this;
  var $billTable = document.querySelector('.items-bill');
  var $itemsTableNode = document.querySelector('.items-table');
  var manager = new Manager();
  var itemsArr = manager.createItems();

  this.renderItemsTable = function() {

    manager.marketSectorization(this.marketSectors);

    var tableBody = document.createElement('tbody');

    itemsArr.forEach(function(itemObj) {

      var tr = document.createElement('tr');
      var tdName = document.createElement('td');
      tdName.innerText = itemObj.getName();
      tdName.setAttribute('data-name', 'name');
      tr.appendChild(tdName);

      var tdPrice = document.createElement('td');
      tdPrice.innerText = itemObj.getPrice();
      tdPrice.setAttribute('data-name', 'price');
      tr.appendChild(tdPrice);

      var tdUnits = document.createElement('td');
      tdUnits.innerHTML = itemObj.getUnits();
      tdPrice.setAttribute('data-name', 'price');
      tr.appendChild(tdUnits);

      var tdPlaces = document.createElement('td');
      tdPlaces.innerHTML = itemObj.getPlace();
      tdPlaces.setAttribute('data-name', 'place');
      tr.appendChild(tdPlaces);

      var tdQuantity = document.createElement('td');
      tdQuantity.innerHTML = '<input type="text" name="quantity" placeholder="0"/>';
      tdQuantity.setAttribute('data-name', 'quantity');
      tr.appendChild(tdQuantity);

      var buyCheckbox = document.createElement('td');
      buyCheckbox.innerHTML = '<input type="checkbox"/>';
      buyCheckbox.setAttribute('data-name', 'buy-checkbox');
      tr.appendChild(buyCheckbox);

      tableBody.appendChild(tr);
    });

    return tableBody;
  };

  this.clearTable = function(table) {
    table.innerHTML = '';
  };

  this.appendItemsTable = function() {
    var itemsTableContent = this.renderItemsTable();

    $itemsTableNode.appendChild(itemsTableContent);
  };

  this.bindEvents = function() {
    var $buyButton = document.getElementById('buy');

    $buyButton.addEventListener(
        'click', this.onBuyButtonClick);
  };

  this.onBuyButtonClick = function() {

    var checkedItems = document.querySelectorAll('.items-table input:checked');
    var validFieldsArr = [].slice.call(document
      .querySelectorAll('.items-table tr td[data-name="quantity"] input'))
      .map(function(item) {return that.returnCorrectNumberFormInput(item);})
      .filter(function(item) {return !!item; });

    if (
      checkedItems && checkedItems.length &&
      validFieldsArr && validFieldsArr.length
    ) {

      that.clearTable($billTable.querySelector('tbody'));
      that.clearTable($billTable.querySelector('tfoot'));

      if (checkedItems.length === validFieldsArr.length) {

        checkedItems.forEach(function(input) {
          var tableTr = input.parentNode.parentNode;
          var name = tableTr.querySelector('td[data-name="name"]').innerText;
          var itemObj = that.getItemObjectByName(name);
          var weight = that.returnCorrectNumberFormInput(tableTr.querySelector('td[data-name="quantity"] input[name="quantity"]'));

          itemObj.setWeight(weight);

          var itemBill = that.renderItemBill(itemObj);

          $billTable.querySelector('tbody').appendChild(itemBill);
        });

        var totalBill = that.getSummary(itemsArr);
        var $billTableFooter = $billTable.querySelector('tfoot');
        var trFoot = document.createElement('tr');
        trFoot.classList.add('summary');

        var tdFoot = document.createElement('td');
        tdFoot.setAttribute('colspan', '2');
        tdFoot.innerText = 'Summary';
        trFoot.appendChild(tdFoot);

        var tdSummary = document.createElement('td');
        tdSummary.innerText = '$ ' + totalBill;
        trFoot.appendChild(tdSummary);
        $billTableFooter.appendChild(trFoot);

        if (document.querySelector('.items-bill').classList.contains('hidden'))
        {
          document.querySelector('.items-bill').classList.remove('hidden');
          document.querySelector('.thanks').classList.remove('hidden');
        }

      } else if (checkedItems.length > validFieldsArr.length) {
        alert('Your input type is wrong, please write a number');
        document.querySelector('.items-bill').classList.add('hidden');
        document.querySelector('.thanks').classList.add('hidden');
      }
    } else {

      if (checkedItems.length === 0) {
        alert('You didn\'t check any item');
      } else if (validFieldsArr.length === 0) {
        alert('Your input type is wrong, please write a number');
      } else {
        alert('Something wrong, please refresh the page!');
      }
    }
  };

  this.getItemObjectByName = function(name) {
    var objByNameArr;

    if (name) {
      objByNameArr = itemsArr.filter(function(obj){return obj.getName() === name});
    }
    return objByNameArr.length > 0 ? objByNameArr[0] : null;
  };

  this.renderItemBill =  function(itemObj) {
    var itemBlock = document.createElement('tr');
    var units = (itemObj.getUnits() === 'piece') ? 'pieces' : 'kg';

    if (itemObj instanceof Item) {
      var itemName = document.createElement('td');
      var itemWeight = document.createElement('td');
      var itemPrice = document.createElement('td');

      itemName.innerText = itemObj.getName();
      itemWeight.innerText = itemObj.getWeight() + ' ' + units;
      itemPrice.innerText = '$ ' + itemObj.getWeight() * itemObj.getPrice() ;
      itemBlock.appendChild(itemName);
      itemBlock.appendChild(itemWeight);
      itemBlock.appendChild(itemPrice);
    }

    return itemBlock;
  };

  this.getSummary = function(objArray) {
    var total = 0;

    if (objArray && objArray.length) {
      for (var i = 0; i < objArray.length; i++) {
        total += objArray[i].getPrice() * objArray[i].getWeight();
      }
    }
    return total;
  };

  this.returnCorrectNumberFormInput = function(inputNode) {
    var textNode = inputNode.value.replace(/,/g, ".");

    return parseFloat(Number(textNode).toFixed(2));
  }
}

var view = new View();
view.appendItemsTable();
view.bindEvents();


