'use strict';

describe('Directive: googleplace', function () {

  // load the directive's module
  beforeEach(module('rentmapmeNodeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<googleplace></googleplace>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the googleplace directive');
  }));
});