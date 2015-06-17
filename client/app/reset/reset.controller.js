'use strict';

angular.module('rentmapmeNodeApp')
  .controller('ResetCtrl', function ($scope, $routeParams, $location, Reset) {
    $scope.message = 'Hello';

    $scope.isTokenValid = false;
    $scope.newPassword = "";
    $scope.model = {
      token : $routeParams.token
    }

    $scope.showAlert = false;

    $scope.alert = {
    }

    //closes the alert
    $scope.closeAlert = function() {
      console.log('closealert');
      $scope.showAlert = false;

    }
    //console.log($scope.model);

    $scope.forgotPassword = function() {
      Reset.getResetPage($scope.model.token).then(function(data){
        //console.log(data);
        if (data.type=="success") {
          $scope.isTokenValid = true;
        } else {
          $scope.showAlert = true;
          $scope.alert = data;

          //$scope.longMessage = $scope.alert.msg + '. Reset your password to login ' + '<a href="/forgot-password">here</a>'
          console.log(data);
        }

      })
    }

    $scope.changePassword = function(){
      console.log('changePassword')
      Reset.postNewPassword($scope.model.token, {password: $scope.newPassword} ).then(function(data){
        console.log(data);
        if (data.type=="info") {
          console.log('here');
          $scope.isTokenValid = false;
          $scope.showAlert = true;
          $scope.alert = data;
          $scope.longMessage = $scope.alert.msg + "Proceed to login <a><href='/login'/> here</a>"


          //$location.path("/login");
        }
      })
    }
    $scope.forgotPassword();
  });
