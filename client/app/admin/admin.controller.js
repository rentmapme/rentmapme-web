'use strict';

angular.module('rentmapmeNodeApp')
  .controller('AdminCtrl', function ($scope, $http, $location, Auth, User, Admin) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.currentPage=0;

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.limit = 25;
    $scope.offset = 0;

    $scope.apartments = []


    $scope.getApartments =  function() {
      Admin.getApartments( $scope.limit, $scope.offset).then(function (data){
        $scope.apartments = data.apartments;
        $scope.totalCount = data.totalCount;
        console.log(data);
      });
    }

    $scope.getApartments();

    $scope.pageChanged = function () {
      console.log('Page changed to: ' + $scope.currentPage);
      $scope.offset = $scope.limit * ($scope.currentPage - 1);
      $scope.getApartments();
    };


    $scope.go = function ( ) {
      console.log('go to /admin/' + this.apartment._id);
      $location.path('/admin/' + this.apartment._id);
    }


  });
