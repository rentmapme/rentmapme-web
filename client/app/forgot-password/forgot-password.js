'use strict';

angular.module('rentmapmeNodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/forgot-password', {
        templateUrl: 'app/forgot-password/forgot-password.html',
        controller: 'ForgotPasswordCtrl'
      });
  });
