'use strict';

angular.module('rentmapmeNodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/apartment', {
        templateUrl: 'app/apartment/apartment.html',
        controller: 'ApartmentCtrl'
      });
  });
