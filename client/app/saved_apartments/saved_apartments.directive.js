'use strict';

angular.module('rentmapmeNodeApp')
  .directive('savedApartments', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the savedApartments directive');
      }
    };
  });