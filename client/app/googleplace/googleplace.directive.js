'use strict';

angular.module('rentmapmeNodeApp')
  .directive('googleplace', function () {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, model) {
        var options = {
          types: [],
          componentRestrictions: {country: 'us'}
        };
        scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
          scope.$apply(function() {
            model.$setViewValue(element.val());
          });

            console.log(scope.gPlace.getPlace());
            scope.rentModel.loc = [scope.gPlace.getPlace().geometry.location.lng(),scope.gPlace.getPlace().geometry.location.lat()]
            console.log(scope.loc);
            scope.rentModel.streetAddress = scope.gPlace.getPlace().formatted_address;
            scope.gPlace.getPlace().address_components.forEach(function (component){

              if (component.types[0]==="neighborhood"){
                console.log("neighorbood is " + component.long_name);
                scope.rentModel.neighborhood = component.long_name;
              }
              if (component.types[0]==="street_number"){
                console.log("street_number is " + component.long_name);
                scope.rentModel.streetNumber = component.long_name;
              }
              if (component.types[0]==="locality"){
                console.log("street_name is " + component.long_name);
                scope.rentModel.city = component.long_name;
              }
              if (component.types[0]==="administrative_area_level_2"){
                console.log("county_name is " + component.long_name);
                scope.rentModel.county = component.long_name;
              }
              if (component.types[0]==="administrative_area_level_1"){
                console.log("state name is " + component.short_name);
                scope.rentModel.state = component.short_name;
              }
              if (component.types[0]==="postal_code"){
                console.log("zip_code is " + component.long_name);
                scope.rentModel.zipCode = component.long_name;
              }

              if (component.types[0]==="route"){
                console.log("streetname  is " + component.long_name);
                scope.rentModel.streetName = component.long_name;

              }

            })
        });
      }
    };
  });
