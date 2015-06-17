'use strict';

angular.module('rentmapmeNodeApp')
  .controller('UserCtrl',  ['$scope', 'User', 'Auth', function ($scope, User, Auth) {
    //console.log(User);
    $scope.message = 'Hello';
    $scope.rents = [];

    $scope.getCurrentUser = Auth.getCurrentUser;


    //console.log('current user')


    //$scope.getData();
    //$scope.apartments = []
  }]);
