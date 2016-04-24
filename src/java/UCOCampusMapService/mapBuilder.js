/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      

      function initMap() {
              
        var origin_place_id = null;
        var destination_place_id = null;
        var travel_mode = google.maps.TravelMode.WALKING;
        var map = new google.maps.Map(document.getElementById('map'), {
          mapTypeControl: false,
          mapTypeId: google.maps.MapTypeId.SATELLITE, 
          center: {lat: 35.6580019, lng: -97.4713744},
          zoom: 16
        });
        var myLatLng = {lat: 35.6580019, lng: -97.4713744};
          var marker = new google.maps.Marker({
   map: map,
              
              title: 'h',
              position: myLatLng
  });  
             var campusOutline = [
          {lat: 35.652837, lng: -97.474999},
          {lat: 35.661338, lng: -97.475010},
          {lat: 35.661511, lng: -97.474977},
          {lat: 35.661718, lng: -97.474914},
          {lat: 35.661958, lng: -97.474806},
          {lat: 35.662676, lng: -97.474312},
          {lat: 35.663012, lng: -97.474024},
          {lat: 35.663329, lng: -97.473548},
          {lat: 35.663430, lng: -97.473318},
          {lat: 35.663554, lng: -97.472871},
          {lat: 35.663609, lng: -97.472330},
          {lat: 35.663622, lng: -97.469486},
          {lat: 35.658804, lng: -97.469499},
          {lat: 35.658591, lng: -97.468980},
          {lat: 35.658568, lng: -97.468458},
          {lat: 35.658556, lng: -97.466955},
          {lat: 35.652797, lng: -97.466935},
          {lat: 35.652839, lng: -97.474999}
        ];
        var UCO = new google.maps.Polyline({
          path: campusOutline,
          geodesic: true,
          strokeColor: '#002e63',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        UCO.setMap(map);
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);

        var origin_input = document.getElementById('origin-input');
        var destination_input = document.getElementById('destination-input');
        var modes = document.getElementById('mode-selector');

        map.controls[google.maps.ControlPosition.TOP_CENTER].push(origin_input);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(destination_input);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(modes);

        var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
        origin_autocomplete.bindTo('bounds', map);
        var destination_autocomplete =
            new google.maps.places.Autocomplete(destination_input);
        destination_autocomplete.bindTo('bounds', map);

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, mode) {
          var radioButton = document.getElementById(id);
          radioButton.addEventListener('click', function() {
            travel_mode = mode;
          });
        }
        setupClickListener('changemode-walking', google.maps.TravelMode.WALKING);
        

        function expandViewportToFitPlace(map, place) {
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
            
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
        }

        origin_autocomplete.addListener('place_changed', function() {
          var place = origin_autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }
          expandViewportToFitPlace(map, place);

          // If the place has a geometry, store its place ID and route if we have
          // the other place ID
          origin_place_id = place.place_id;
          route(origin_place_id, destination_place_id, travel_mode,
                directionsService, directionsDisplay);
                
        });

        destination_autocomplete.addListener('place_changed', function() {
          var place = destination_autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
          }
          expandViewportToFitPlace(map, place);

          // If the place has a geometry, store its place ID and route if we have
          // the other place ID
          destination_place_id = place.place_id;
          route(origin_place_id, destination_place_id, travel_mode,
                directionsService, directionsDisplay);
        });

        function route(origin_place_id, destination_place_id, travel_mode,
                       directionsService, directionsDisplay) {
          if (!origin_place_id || !destination_place_id) {
            return;
          }
          directionsService.route({
            origin: {'placeId': origin_place_id},
            destination: {'placeId': destination_place_id},
            travelMode: travel_mode
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
            
          });
         
   
    }
 }