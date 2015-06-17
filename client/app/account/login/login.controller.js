'use strict';

angular.module('rentmapmeNodeApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(loginForm) {
      console.log('login');
      $scope.submitted = true;

      if($scope.loginForm.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then( function() {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch( function(err) {
            console.log(JSON.stringify(err));
            $scope.errors.other = err.message;
          });
      }
    };

    $scope.loginOauth = function(provider) {
      console.log('loginOauth ' + provider);
      $window.location.href = '/auth/' + provider;
    };



  });
