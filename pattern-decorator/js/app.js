var user = new User();
var userDecorator = new UserDecoration(user);
var dataTable = document.querySelector('table.data-table tbody');
var resultTable = document.querySelector('table.result-table tbody');

var totalPrice = user.getOrdersTotalPrice();
var discount = userDecorator.getDiscount();
var bonus = userDecorator.getBonus();

var renderDataTable = function() {

  var trLastVisit = dataTable.querySelector('tr[data-name="last-visit"]');
  var date = user.getLastVisitDate();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var tdLastVisit = document.createElement('td');
  tdLastVisit.innerText = day + '/' + month + '/' + year;
  trLastVisit.appendChild(tdLastVisit);

  var trGlobalDiscount = dataTable.querySelector('tr[data-name="global-discount"]');
  var tdGlobalDiscount = document.createElement('td');
  tdGlobalDiscount.innerText = user.getGlobalDiscount() + ' %';
  trGlobalDiscount.appendChild(tdGlobalDiscount);

  var trNightDiscount = dataTable.querySelector('tr[data-name="night-discount"]');
  var tdNightDiscount = document.createElement('td');
  tdNightDiscount.innerText = user.getNightDiscount() + ' %';
  trNightDiscount.appendChild(tdNightDiscount);

  var trWeekendDiscount = dataTable.querySelector('tr[data-name="weekend-discount"]');
  var tdWeekendDiscount = document.createElement('td');
  tdWeekendDiscount.innerText = user.getWeekendDiscount() + ' %';
  trWeekendDiscount.appendChild(tdWeekendDiscount);

  var trOrdersCount = dataTable.querySelector('tr[data-name="orders-count"]');
  var tdOrdersCount = document.createElement('td');
  tdOrdersCount.innerText = user.getOrdersCount();
  trOrdersCount.appendChild(tdOrdersCount);

  var trOrdersTotalPrice = dataTable.querySelector('tr[data-name="orders-total-price"]');
  var tdOrdersTotalPrice = document.createElement('td');
  tdOrdersTotalPrice.innerText = '$ ' + totalPrice;
  trOrdersTotalPrice.appendChild(tdOrdersTotalPrice);

  var trUserBonus = dataTable.querySelector('tr[data-name="user-bonus"]');
  var tdUserBonus = document.createElement('td');
  tdUserBonus.innerText = '$ ' + user.getUserBonus();
  trUserBonus.appendChild(tdUserBonus);

  var trDiscountResult = resultTable.querySelector('tr[data-name="discount-result"]');
  var tdDiscountResult = document.createElement('td');
  tdDiscountResult.innerText = discount + ' %';
  trDiscountResult.appendChild(tdDiscountResult);

  var trBonusResult = resultTable.querySelector('tr[data-name="bonus-result"]');
  var tdBonusResult = document.createElement('td');
  tdBonusResult.innerText = '$ ' + userDecorator.getBonus();
  trBonusResult.appendChild(tdBonusResult);

  var trTotalBonus = resultTable.querySelector('tr[data-name="total-bonus"]');
  var tdTotalBonus = document.createElement('td');
  tdTotalBonus.innerText = '$ ' + (totalPrice * discount / 100 + bonus).toFixed(2);
  trTotalBonus.appendChild(tdTotalBonus);

  var trTotalResult = resultTable.querySelector('tr[data-name="total-result"]');
  var discountPercent = 1 - userDecorator.getDiscount() / 100;
  var tdTotalResult = document.createElement('td');
  tdTotalResult.innerText = '$ ' + (totalPrice * discountPercent - bonus).toFixed(2);
  trTotalResult.appendChild(tdTotalResult)

};

renderDataTable();