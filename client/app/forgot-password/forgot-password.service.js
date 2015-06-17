'use strict';

angular.module('rentmapmeNodeApp')
  .factory('ForgotPassword', function ($http) {

    var restFactory = {};

    restFactory.resetPassword = function (body) {

      console.log('resetPassword');
      //console.log('id ' + id);
      //console.log(rentModel);
      return $http.post('/api/v1/forgot', body)
        .then(function (result) {
          console.log('result');
          console.log(result);
          return result.data;
        });
    }



    return restFactory;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
