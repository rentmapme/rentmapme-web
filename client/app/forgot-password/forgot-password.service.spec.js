'use strict';

describe('Service: forgotPassword', function () {

  // load the service's module
  beforeEach(module('rentmapmeNodeApp'));

  // instantiate service
  var forgotPassword;
  beforeEach(inject(function (_forgotPassword_) {
    forgotPassword = _forgotPassword_;
  }));

  it('should do something', function () {
    expect(!!forgotPassword).toBe(true);
  });

});
