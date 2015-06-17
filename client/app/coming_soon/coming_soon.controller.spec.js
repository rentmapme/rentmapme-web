'use strict';

describe('Controller: ComingSoonCtrl', function () {

  // load the controller's module
  beforeEach(module('rentmapmeNodeApp'));

  var ComingSoonCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComingSoonCtrl = $controller('ComingSoonCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
