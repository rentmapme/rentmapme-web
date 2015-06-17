'use strict';

angular.module('rentmapmeNodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/how_it_works', {
        templateUrl: 'app/howitworks/howitworks.html',
        controller: 'HowitworksCtrl'
      });
  });
