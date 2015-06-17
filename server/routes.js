/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/admin', require('./api/admin'));
  app.use('/api/v1/reset', require('./api/reset'));
  app.use('/api/v1/forgot', require('./api/forgot'));
  app.use('/api/v1/rents', require('./api/rent'));
  app.use('/api/v1/apartments', require('./api/apartment'));
  app.use('/api/apartments', require('./api/apartment'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
