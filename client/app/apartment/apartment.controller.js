'use strict';

angular.module('rentmapmeNodeApp')
  .controller('ApartmentCtrl', function ($scope, $routeParams, Apartment) {
    //$scope.
    $scope.maxRent = 0;
    $scope.maxBedrooms =0;
    $scope.minRent = 100000;
    $scope.minBedrooms = 100000;


    $scope.buildingAmenities={}
    $scope.apartmentAmenities={}
    // get the details for the apartments
    $scope.getApartmentDetails = function() {
      console.log('getApartmentDetails');
      Apartment.getApartmentDetails($routeParams.id).success(function (apartment) {
        $scope.apartment = apartment;
        $scope.buildingAmenities = $scope.apartment.buildingAmenities;
        $scope.apartmentAmenities = $scope.apartment.apartmentAmenities;
        //console.log($scope.apartment)
        //console.log()

        _.each($scope.apartment.rents, function(rent){
          console.log(rent.rentAmount);
          $scope.maxRent = Math.max($scope.maxRent, rent.rentAmount);

          $scope.minRent = Math.min($scope.minRent, rent.rentAmount);


          $scope.minBedrooms = Math.min($scope.minBedrooms, rent.numBedrooms);


          $scope.maxBedrooms = Math.max($scope.maxBedrooms, rent.numBedrooms);
        })
      })
    }

    $scope.zoom = 18;

    $scope.getApartmentDetails();


    // add class to the check mark
    $scope.isActive = function(value) {
      if (value) {
        return 'active';
      } else {
        return 'default'
      }
    }

    // converts the lease start date and lease end date to formatted date.
    $scope.getDate = function(date) {
      //console.log('getDate');
      var formattedDate = new Date(date);
      //console.log(formattedDate + " time " + formattedDate.getTime());
      if (formattedDate.getTime()<=0) {
        return "Present"
      }
      return formattedDate.getFullYear() + "/" + (formattedDate.getMonth()+1)  + "/" + formattedDate.getDate();
    }

  });
