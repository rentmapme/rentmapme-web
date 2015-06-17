'use strict';

angular.module('rentmapmeNodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      //.when('/reset', {
      //  templateUrl: 'app/reset/reset.html',
      //  controller: 'ResetCtrl'
      //})
      .when('/reset/:token', {
        templateUrl: 'app/reset/reset.html',
        controller: 'ResetCtrl'
      });
  });
