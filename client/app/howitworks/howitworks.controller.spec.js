'use strict';

describe('Controller: HowitworksCtrl', function () {

  // load the controller's module
  beforeEach(module('rentmapmeNodeApp'));

  var HowitworksCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HowitworksCtrl = $controller('HowitworksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
