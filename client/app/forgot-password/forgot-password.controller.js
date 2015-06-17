'use strict';

angular.module('rentmapmeNodeApp')
  .controller('ForgotPasswordCtrl', function ($scope, ForgotPassword) {
    $scope.message = 'Hello';
    //$scope.body = {
    //  email
    //};

    $scope.email = ''

    $scope.showAlert = false;

    $scope.alert = {
        //type: '',
        //msg: ''
    }

    //closes the alert
    $scope.closeAlert = function() {
      console.log('closealert');
      $scope.showAlert = false;

    }

    $scope.forgotPassword = function(form) {
      console.log('forgotPassword');
      if($scope.form.$valid) {
        console.log('isValid');
        ForgotPassword.resetPassword({email: $scope.email}).then(function (data) {
          console.log('password reset request send');

          $scope.alert = data;
          //$scope.alert.msg = data.msg;
          $scope.showAlert = true;
          //console.log(data);
          //console.log($scope.alert);
        })
        } else {
          console.log('not valid');
        }
      }
    }
  );
