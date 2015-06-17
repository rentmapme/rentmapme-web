'use strict';

angular.module('rentmapmeNodeApp')
  .factory('Map', function ($resource,$http) {

    var mapRestFactory = {};

    mapRestFactory.getApartments = function(latitude, longitude, limit, offset){
      //console.log('id ' + id);
      var limit = limit===undefined?8: limit;
      var offset = offset===undefined?0: offset;
      return $http.get('/api/v1/apartments?latitude=' + latitude + "&longitude=" + longitude+"&limit=" + limit + "&offset=" + offset)
        .then(function(result){
          console.log(result.data);
          return result.data;
        });
    }


    return mapRestFactory;
  });
