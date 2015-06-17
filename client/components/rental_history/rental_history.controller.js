'use strict';

angular.module('rentmapmeNodeApp')
  .controller('RentalHistoryCtrl', function ($scope, Rent, Auth) {
    $scope.errors = {};
    $scope.showAddRent = false;

    $scope.rents = []



    $scope.init = function() {
      $scope.rents = Auth.getCurrentUser().rents;
    }

    $scope.init();

    $scope.getDate = function(date) {
      console.log('getDate');
      var formattedDate = new Date(date);
      console.log(formattedDate + " time " + formattedDate.getTime());
      if (formattedDate.getTime()<=0) {
        return "Present"
      }
      return formattedDate.getFullYear() + "/" + (formattedDate.getMonth()+1)  + "/" + formattedDate.getDate();
    }


    $scope.toggleRentForm = function() {
      console.log('toggleRentForm');
      $scope.showAddRent = !$scope.showAddRent;
    }

    $scope.go = function(){
      console.log('go');
    }

    console.log($scope.rents);

    $scope.deleteRent = function(id){
      console.log('deleteRent' + id);
      Rent.deleteRent(id).then(function(data){
        console.log(data);
        console.log('rent deleted');
        $scope.rents = _.filter($scope.rents, function(rent){
          console.log(rent._id);
          return rent._id !== id;
        })
        console.log($scope.rents);
      })
    }


    $scope.editRent = function(){
      console.log('editRent');
    }




  });
