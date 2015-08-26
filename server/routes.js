/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/player-imports', require('./api/player-import'));
  app.use('/api/team-imports', require('./api/team-import'));
  app.use('/api/schedule-imports', require('./api/schedule-import'));
  app.use('/api/teams', require('./api/team'));
  app.use('/api/players', require('./api/player'));
  app.use('/api/game-logs-imports', require('./api/game-logs-import'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
