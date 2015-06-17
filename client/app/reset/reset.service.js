'use strict';

angular.module('rentmapmeNodeApp')
  .factory('Reset', function ($http) {


    var restFactory = {};

    restFactory.getResetPage = function (token) {

      console.log('resetPassword');
      //console.log('id ' + id);
      //console.log(rentModel);
      return $http.get('/api/v1/reset/' + token)
        .then(function (result) {
          return result.data;
        });
    }

    restFactory.postNewPassword = function(token, body){
      return $http.post('/api/v1/reset/' + token, body)
        .then(function (result) {
          return result.data;
        });
    }



    return restFactory;

  });
