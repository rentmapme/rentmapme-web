'use strict';

angular.module('rentmapmeNodeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      }).when('/admin/:apartmentId', {
        templateUrl: 'app/admin/apartment_details.html',
        controller: 'AdminApartmentDetailsCtrl'
      })
  });
