'use strict';

angular.module('rentmapmeNodeApp')
  .factory('Rent', function ($resource,$http) {
    var rentFactory = {};

    rentFactory.addRent = function (rentModel) {
      //console.log('id ' + id);
      console.log(rentModel);
      return $http.post('/api/v1/rents', rentModel)
        .then(function (result) {
          return result.data;
        });
    }

    rentFactory.deleteRent = function(rentId) {
      console.log(rentId);
      return $http.delete('/api/v1/rents/' + rentId)
        .then(function (result){
          return result.data;
        })
    }

    return rentFactory;
  })



