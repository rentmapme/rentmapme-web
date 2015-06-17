'use strict';

describe('Service: reset', function () {

  // load the service's module
  beforeEach(module('rentmapmeNodeApp'));

  // instantiate service
  var reset;
  beforeEach(inject(function (_reset_) {
    reset = _reset_;
  }));

  it('should do something', function () {
    expect(!!reset).toBe(true);
  });

});
