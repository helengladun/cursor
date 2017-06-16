var key = '0290750a09f9e4d4702420be115978d6';
var today = new Date();
var nextTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
var prevTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
var myLatitude,
    myLongitude;

Date.prototype.getUnixTime = function() { return this.getTime()/1000 | 0 };

setTimeout(function() {
  renderLocation();
  getDataFromDarkSky(key, myLatitude, myLongitude, today);
}, 3000);

$('#nextbtn').prop('disabled', true);

function getDataFromDarkSky(key, lat, long, time) {
  var myKey = key;
  var myLatitude = lat;
  var myLongitude = long;
  var date = time.getUnixTime();

  if (myKey && myLongitude && myLatitude && time instanceof Date) {
    $.ajax({
      dataType : 'jsonp',
      url: `https://api.darksky.net/forecast/${myKey}/${myLatitude},${myLongitude},${date}`,
      success: function(data){
        renderTable(data);
      },
      error: function(error) {
        alert(error.statusText);
      }
    });
  } else {
    alert('Something wrong with your input data');
  }
}

$('#prevbtn').click(function(){
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
  }
  if (!$(this).hasClass('disabled')) {
    $(this).addClass('disabled');
  }

  $(this).prop('disabled', true);

  $('#nextbtn').prop('disabled', false);
  $('#nextbtn').removeClass('disabled');
  $('#nextbtn').addClass('active');
  getDataFromDarkSky(key, myLatitude, myLongitude, prevTime);
});

$('#nextbtn').click(function(){
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
  }
  if (!$(this).hasClass('disabled')) {
    $(this).addClass('disabled');
  }
  $(this).prop('disabled', true);
  $('#prevbtn').prop('disabled', false);
  $('#prevbtn').removeClass('disabled');
  $('#prevbtn').addClass('active');
  getDataFromDarkSky(key, myLatitude, myLongitude, nextTime);
});

function clearFields() {
  $('#currently').text('');
  $('figure#icons').text('');
  $('.forecast-data .temp').text('');
  $('.forecast-data .wind').text('');
  $('.forecast-data .visibility').text('');
  $('.forecast-data .humidity').text('');
}

function renderTable(data) {
  if (data) {
    clearFields();
    var location = data['timezone'];
    var tempF = data['currently']['temperature'];
    var tempC = Math.round((tempF-32) * 5 / 9);
    var windSpeed = Math.round(data['currently']['windSpeed']);
    var visibility = data['currently']['visibility'];
    var summaryDay = data['currently']['summary'];
    var humidity = (data['currently']['humidity'] * 100).toFixed(0);
    var icon = data['currently']['icon'];
    var tdTemp = tempC ? '<td>Temperature (&deg;C)</td><td>' + tempC + '</td>' : '';
    var tdWind = windSpeed ? '<td>Wind speed (m/s)</td><td>' + windSpeed + '</td>' : '';
    var tdVisibility = visibility ? '<td>Visibility (km)</td><td>' + visibility + '</td>' : '';
    var tdHumidity = humidity ? '<td>Humidity (%)</td><td>' + humidity + '</td>' : '';
    var h2 =  `${tempC}&deg;C ${summaryDay}`;

    if (icon) {
      $('figure.icons').append(`<canvas id="${icon}" width="64" height="64"></canvas>`);
      createIcon(icon);
    }

    if ($('.forecast-data').hasClass('hidden')) {
      $('.forecast-data').removeClass('hidden');
      $('.forecast-data').addClass('visible');
    }
    $('#currently').append(h2);
    $('.forecast-data .temp').append(tdTemp);
    $('.forecast-data .wind').append(tdWind);
    $('.forecast-data .visibility').append(tdVisibility);
    $('.forecast-data .humidity').append(tdHumidity);
  } else {
    $('.forecast-data').text(data);
  }
}

function renderLocation() {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(location) {

      var geolocation = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + myLatitude + '%2C' + myLongitude + '&language=en';

      $.ajax({
        dataType : 'json',
        url: geolocation,
        success: function(location){

          $('div.preloader').hide();
          $('div.preloader').removeClass('preloader');

          myLatitude = location.results[0].geometry.location['lat'];
          myLongitude = location.results[0].geometry.location['lng'];

          var city = location.results[0].address_components[3].long_name;
          var area = location.results[0].address_components[5].long_name;
          var street = location.results[0].address_components[1].long_name;

          // $('#location').text(location.results[0].formatted_address);

          $('#location').text(`${city}, ${area}, ${street}`);

          if ($('.main-container').hasClass('hidden')) {
            $('.main-container').removeClass('hidden');
            $('.main-container').addClass('visible');
          }
        },
        error: function(error) {
          alert(error.statusText);
        }
      });
    });
  } else {
    alert('Something wrong with your location settings.');
  }

  if (!myLatitude && !myLongitude) {
    myLatitude =  49.7961694;
    myLongitude = 24.0516081;
  }
}

function createIcon(name) {
  if (name) {
    var icons = new Skycons({'color': 'black'});

    switch(name) {
      case 'clear-day':
        icons.set('clear-day', Skycons.CLEAR_DAY);
        break;
      case 'clear-night':
        icons.set('clear-night', Skycons.CLEAR_NIGHT);
        break;
      case 'partly-cloudy-day':
        icons.set('partly-cloudy-day', Skycons.PARTLY_CLOUDY_DAY);
        break;
      case 'partly-cloudy-night':
        icons.set('partly-cloudy-day', Skycons.PARTLY_CLOUDY_NIGHT);
        break;
      case 'cloudy':
        icons.set('cloudy', Skycons.CLOUDY);
        break;
      case 'rain':
        icons.set('rain', Skycons.RAIN);
        break;
      case 'sleet':
        icons.set('sleet', Skycons.SLEET);
        break;
      case 'snow':
        icons.set('snow', Skycons.SNOW);
        break;
      case 'wind':
        icons.set('wind', Skycons.WIND);
        break;
      case 'fog':
        icons.set('fog', Skycons.FOG);
        break;
    }
    icons.play();
  }
}
