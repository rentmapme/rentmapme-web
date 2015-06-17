'use strict';

angular.module('rentmapmeNodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/coming_soon', {
        templateUrl: 'app/coming_soon/coming_soon.html',
        controller: 'ComingSoonCtrl'
      });
  });
