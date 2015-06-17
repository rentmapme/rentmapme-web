'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/rentmapmenode-dev'
  },

  seedDB: false,
  port:    
// process.env.OPENSHIFT_NODEJS_PORT ||
  //          process.env.PORT ||
        8080 
};
