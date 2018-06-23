const locations = {
  scl: {lat: -33.4488897, lng: -70.6692655},
  san: {lat: -33.5922807, lng: -71.60551229999999},
  ccp: {lat: -36.8201352, lng: -73.0443904},
  pmc: {lat: -41.468917, lng: -72.9411364 },
  put: {lat: -18.1969907, lng: -69.55972729999996},
  toc: {lat: -22.0857976, lng: -70.1930064}
}

const weather = {
  'partly-cloudy-night': 'wi-night-partly-cloudy',
	'clear-night': 'wi-night-clear'
}

var map, marker;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: locations.scl.lat, lng: locations.scl.lng },
    zoom: 8
  });

  marker = new google.maps.Marker({
    position: locations.scl,
    map: map
  });
}

function setMap(location) {

  var cors = 'https://cors-anywhere.herokuapp.com/';
  var api_key = 'cfc3cbbf50d657838c62bfc7017c91fb';
  var params = ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto']

  $.ajax({
    url: cors + 'https://api.darksky.net/forecast/'+ api_key +'/' + location.lat + ',' + location.lng + '?' + params[0] + '&' + params[1] + '&' + params[2],
    method: 'GET'
  }).done(function(data) {
    console.log(data);
    map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 8
    });

    marker = new google.maps.Marker({
      position: location,
      map: map
    });

    $('h3.resume').text(data.currently.temperature + 'º ' + data.currently.summary)
    $('.icon i').attr('class', weather[data.currently.icon])
  });

}


/* trigger when page is ready */
$(function (){

  $('#locations').on('change', function(event) {
    setMap( locations[$(this).val()] )
  });

});
