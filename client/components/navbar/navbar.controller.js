'use strict';

angular.module('rentmapmeNodeApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    //$scope.menu = [{
    //  'title': 'Home',
    //  'link': '/'
    //}];

    //$scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    //$scope.searchIconClicked = (function(e) {
    //  e.preventDefault();
    //  $('.mobile-search').addClass('active');
    //  $('.mobile-search form input.form-control').focus();
    //});
    //
    //$(document).mouseup(function (e) {
    //  var container = $('.mobile-search');
    //
    //  if (!container.is(e.target) // if the target of the click isn't the container...
    //    && container.has(e.target).length === 0) // ... nor a descendant of the container
    //  {
    //    container.removeClass('active');
    //  }
    //});
  });
