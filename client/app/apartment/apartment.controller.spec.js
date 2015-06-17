'use strict';

describe('Controller: ApartmentCtrl', function () {

  // load the controller's module
  beforeEach(module('rentmapmeNodeApp'));

  var ApartmentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApartmentCtrl = $controller('ApartmentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
