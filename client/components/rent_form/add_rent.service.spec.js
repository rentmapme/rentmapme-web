'use strict';

describe('Service: addRent', function () {

  // load the service's module
  beforeEach(module('rentmapmeNodeApp'));

  // instantiate service
  var addRent;
  beforeEach(inject(function (_addRent_) {
    addRent = _addRent_;
  }));

  it('should do something', function () {
    expect(!!addRent).toBe(true);
  });

});
