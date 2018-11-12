    // my default access token, switch later pk.eyJ1IjoiZGlsbGFuY2Fycm9sbCIsImEiOiJjam5qa3VmbGYxMGt5M3JxcnlkcHV5cWd2In0.5wFSKLV2-KEUH1-l0YqnXA
    mapboxgl.accessToken = 'pk.eyJ1IjoidHJpZ2VucGFuaW5pIiwiYSI6ImNqbDV0NXU3NjJxZTAzcnF0aWdlc3B3ZG4ifQ.emMb8nYj7XXUg70EaBVZ7g';
    var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/trigenpanini/cjl5yll0308l82qqktmirrjcy',
    center: [-74.50, 40], // starting position
    zoom: 9 // starting zoom
  });
  
  map.on('mousemove', function (e) {
    document.getElementById('info').innerHTML =
    // e.point is the x, y coordinates of the mousemove event relative
    // to the top-left corner of the map
    JSON.stringify(e.point) + '<br />' +
    // e.lngLat is the longitude, latitude geographical position of the event
    JSON.stringify(e.lngLat);
  });

  map.on('click', function (e) { 
    document.getElementById('setCoordinates').innerHTML =
    JSON.stringify(e.point) +
    JSON.stringify(e.lngLat);
  });

  // define a lookup for what text should be displayed for each value in your range
  var $range = $(".js-range-slider");
  var $result = $(".js-result");
  
  var rangeValues = [0, 100, 200, 300, 999];
  var rangeValues_p = ["Slideshow 1", "1900", "1901", "1902", "1903"];
  
  $range.ionRangeSlider({
      type: "single",
      min: 1850,
      max: 2010,
      step: 1,
      grid: true,
      values: rangeValues,
      prettify: function (n) {
        var ind = rangeValues.indexOf(n);
        return rangeValues_p[ind];
      },
      onStart: function(data) {
      $result.text(data.from_value);
      },
      onChange: function(data) {
      $result.text(data.from_value);
      }
  });

  //Test, recieve coordinates for slide
  const dataAccess = require(__dirname + '/data_access')

  dataAccess.getCoordinates(req.body,() =>{
    $result

    })

  // <---- button script ---->           button(onclick='something()') Click
  // var something = function() {
  //   console.log('something')
  // }

  