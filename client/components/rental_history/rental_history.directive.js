/**
 * Created by rorlig on 3/23/15.
 */
angular.module('rentmapmeNodeApp')
  .directive('rentalHistory', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div ng-include="getContentUrl()"></div>',
      link: function (scope, elem, attrs) {
        scope.getContentUrl = function() {
          //console.log(scope.getCurrentUser().rents.length==0)
          //scope.getCurrentUser().then(function (data){
          //  console.log('getCurrentUser()' + data);
          //})
          if (scope.getCurrentUser().rents.length==0) {
            return 'components/rental_history/no_rents.html'
          } else {
            return 'components/rental_history/rental_history.html'
          }
        }

      }
    }
  })
