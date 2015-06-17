'use strict';

describe('Service: apartment', function () {

  // load the service's module
  beforeEach(module('rentmapmeNodeApp'));

  // instantiate service
  var apartment;
  beforeEach(inject(function (_apartment_) {
    apartment = _apartment_;
  }));

  it('should do something', function () {
    expect(!!apartment).toBe(true);
  });

});
