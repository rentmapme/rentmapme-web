'use strict';

//factory for the classs...

angular.module('rentmapmeNodeApp')
  .factory('Apartment', function ($resource, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var apartmentRestFactory = {};

    apartmentRestFactory.getApartmentDetails = function(id){
      console.log('id ' + id);
      var url = '/api/v1/apartments/' + id;
      console.log('url ' + url);
      return $http.get(url);
    }


    return apartmentRestFactory;
  });
