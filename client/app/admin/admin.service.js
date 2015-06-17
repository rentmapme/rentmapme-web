'use strict';

angular.module('rentmapmeNodeApp')
  .factory('Admin', function ($http) {

    var restFactory = {};

    restFactory.getApartments = function(limit, offset){
      //console.log('id ' + id);
      var limit = limit===undefined?1: limit;
      var offset = offset===undefined?0: offset;
      return $http.get('/api/admin?' + "limit=" + limit + "&offset=" + offset)
        .then(function(result){
          return result.data;
        });
    }


    restFactory.getApartmentsById = function(id){
      //console.log('id ' + id);
      return $http.get('/api/admin/' + id)
        .then(function(result){
          return result.data;
        });
    }

    restFactory.saveApartment = function(apartment, id) {
      return $http.put('/api/admin/' + id, apartment).then(function (result){
        return result.data;
      })
    }

    return restFactory;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
