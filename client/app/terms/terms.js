'use strict';

angular.module('rentmapmeNodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/terms', {
        templateUrl: 'app/terms/terms.html',
        controller: 'TermsCtrl'
      });
  });
