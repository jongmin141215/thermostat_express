var thermostat = new Thermostat();

function showTemp() {
  $('#temp').text(thermostat.temperature);
};

function displayEnergyUse() {
  if (thermostat.energyUsage() == 'Green') {
    $('#energy').removeClass('yellow red');
    $('#energy').addClass('green');
  } else if (thermostat.energyUsage() == 'Yellow') {
    $('#energy').removeClass('red');
    $('#energy').addClass('yellow');
  } else {
    $('#energy').addClass('red');
  }
}

$(function() {
  showTemp();
  displayEnergyUse();

  $('#increase').click(function() {
    thermostat.increaseTemp();
    showTemp();
    displayEnergyUse();
  })

  $('#decrease').click(function() {
    thermostat.decreaseTemp();
    showTemp();
    displayEnergyUse();
  })

  $('#reset').click(function() {
    thermostat.reset();
    showTemp();
    displayEnergyUse();
  })

  $('#powerSaving :checkbox').change(function() {
    if ($(this).is(':checked')) {
      thermostat.powerSavingOn();
    } else {
      thermostat.powerSavingOff();
    } showTemp();
    displayEnergyUse();
  })

  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q='
  var cityName = 'London';

  $.ajax(weatherUrl + cityName, {
    success: function(data) {
      $('#currentTemp').text(cityName + ': ' + (Math.round(data.main.temp - 273.15)) + "ºC/ " + data.weather[0].description);
    },
    error: function() {
      $('#currentTemp').text('The service is currently unavailable.\
        Please try in 5 minutes')
    }
  })

  $('#searchButton').click(function(form) {
    $('#anotherCity').text($('#city').val());

    var cityName = $('#city').val();
    $.ajax(weatherUrl + cityName, {
      success: function(data) {
        $('#anotherTemp').text(cityName + ': ' + (Math.round(data.main.temp - 273.15)) + "ºC/ " + data.weather[0].description);
      },
      error: function() {
        $('#anotherTemp').text('The service is currently unavailable.\
          Please try in 5 minutes')
      }
    })

  });

});
