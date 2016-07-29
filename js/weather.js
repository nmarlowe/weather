loadWeather('23860');

function loadWeather(pos) {
  $.simpleWeather({
    location: pos,
    units: "f",
    success: function(weather) {
      console.log(weather);

      $("#loading").hide();
      $("#location").html("<h2>Current Weather For " + weather.city + ", " + weather.region+'<h2>');
      $("#updated").html("<h6>As of " +weather.updated+ "</h6>");
      $("#current-icon").html('<h2><i class="wi wi-yahoo-' + weather.code +'"></i>&nbsp;' + weather.currently + '&nbsp; | &nbsp;' + weather.temp + '&deg;F </h2><br>');

      changeForecast();

      todayForecast = '<h4>Today: &nbsp;<i class="wi wi-yahoo-'+weather.forecast[0].code+'"></i>&nbsp;'+weather.forecast[0].text+'</h4><br>';
      todayForecast += '<h4><i class="fa fa-arrow-up fa-1x high"></i>&nbsp;'+weather.high+'&nbsp;&nbsp;<i class="fa fa-arrow-down fa-1x low"></i>&nbsp;'+weather.low+'</h4>';

      tomorrowForecast = '<h4>Tomorrow: &nbsp;<i class="wi wi-yahoo-'+weather.forecast[1].code+'"></i>&nbsp;'+weather.forecast[1].text+'</h4><br>';
      tomorrowForecast += '<h4><i class="fa fa-arrow-up fa-1x high"></i>&nbsp;'+weather.forecast[1].high+'&nbsp;&nbsp;<i class="fa fa-arrow-down fa-1x low"></i>&nbsp;'+weather.forecast[1].low+'</h4>';


      var today = true;
      var nIntervId;

      $("#forecast").html(todayForecast);

      function changeForecast() {
        nIntervId = setInterval(forecast, 5000);
      }

      function forecast() {
        if (today) {
          $("#forecast").html(todayForecast);
          today = false;
        } else {
          $("#forecast").html(tomorrowForecast);
          today = true;
        }
      }

    },
    error: function(error) {
      console.log(error);
      html = '<h2>'+error+'</h2>';
      $("#weather").html(html);
    }
  });
}

/*************
Reload page every 60 minutes
*************/

$(document).ready(function() {
    setInterval("location.reload(true)", 3600000);
});
