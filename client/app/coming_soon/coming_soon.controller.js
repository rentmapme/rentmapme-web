'use strict';

angular.module('rentmapmeNodeApp')
  .controller('ComingSoonCtrl', function ($scope,$routeParams) {
    $scope.message = 'Hello';
    $scope.city= ""
    $scope.cityImage = ""
    $scope.initialize = function() {
        if ($routeParams.city=="sanfrancisco") {
          $scope.city = "San Fransciso"
          $scope.cityImage = "sanfrancisco_wallpaper.jpg"
          $scope.cityUrl = "https://docs.google.com/forms/d/130WOO9QvkW7I6e5EE3PsX07GxyVvN_Xggc_8GyX9Rxk/viewform"
        } else {
          $scope.city = "New York"
          $scope.cityImage = "nyc_wallpaper.jpg"
          $scope.cityUrl = "https://docs.google.com/forms/d/1c25C8DDs_C9xoCwnVw2rIQtflBa-Hx5wHP4sayVm150/viewform"

        }
    };

    $scope.initialize()

  });
