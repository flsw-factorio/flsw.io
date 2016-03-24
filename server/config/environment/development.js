'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/flswio-dev'
  },

  // Secret for session, this should be an env var in production
  secrets: {
    session: "this-be-secret"
  },
  // Seed database on startup
  seedDB: true

};
