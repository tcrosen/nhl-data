'use strict';

var _ = require('lodash');
var GameLogsImport = require('./game-logs-import.model');

// Get list of game-logs-imports
exports.index = function(req, res) {
  GameLogsImport.find(function (err, game-logs-imports) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(game-logs-imports);
  });
};

// Get a single game-logs-import
exports.show = function(req, res) {
  GameLogsImport.findById(req.params.id, function (err, game-logs-import) {
    if(err) { return handleError(res, err); }
    if(!game-logs-import) { return res.status(404).send('Not Found'); }
    return res.json(game-logs-import);
  });
};

// Creates a new game-logs-import in the DB.
exports.create = function(req, res) {
  GameLogsImport.create(req.body, function(err, game-logs-import) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(game-logs-import);
  });
};

// Updates an existing game-logs-import in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  GameLogsImport.findById(req.params.id, function (err, game-logs-import) {
    if (err) { return handleError(res, err); }
    if(!game-logs-import) { return res.status(404).send('Not Found'); }
    var updated = _.merge(game-logs-import, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(game-logs-import);
    });
  });
};

// Deletes a game-logs-import from the DB.
exports.destroy = function(req, res) {
  GameLogsImport.findById(req.params.id, function (err, game-logs-import) {
    if(err) { return handleError(res, err); }
    if(!game-logs-import) { return res.status(404).send('Not Found'); }
    game-logs-import.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}