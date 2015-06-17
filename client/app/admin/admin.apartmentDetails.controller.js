'use strict';

angular.module('rentmapmeNodeApp')
  .controller('AdminApartmentDetailsCtrl', function ($scope, $http, $routeParams, Admin) {

    console.log($routeParams.apartmentId);
    $scope.getApartmentDetails =  function(id) {
      Admin.getApartmentsById( id).then(function (data){
        console.log(data);
        $scope.apartment = data;
      });
    }

    $scope.getApartmentDetails($routeParams.apartmentId);


    $scope.saveApartment = function(form) {
      console.log('saving form');
      $scope.apartment.updateTime = new Date();
      console.log($scope.apartment);
      Admin.saveApartment($scope.apartment, $routeParams.apartmentId).then(function(data){
        console.log(data);
        console.log('apartment saved');

        //$scope.rents.push(data);
        //$scope.toggleRentForm();
      })

    }

  });
