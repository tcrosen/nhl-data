'use strict';

var _ = require('lodash');
var GameLogsImport = require('./game-logs-import.model');

// Get list of game-logs-imports
exports.index = function(req, res) {
  GameLogsImport.find(function (err, gameLogsImports) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(gameLogsImports);
  });
};

// Get a single gameLogsImport
exports.show = function(req, res) {
  GameLogsImport.findById(req.params.id, function (err, gameLogsImport) {
    if(err) { return handleError(res, err); }
    if(!gameLogsImport) { return res.status(404).send('Not Found'); }
    return res.json(gameLogsImport);
  });
};

// Creates a new gameLogsImport in the DB.
exports.create = function(req, res) {
  GameLogsImport.create(req.body, function(err, gameLogsImport) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(gameLogsImport);
  });
};

// Updates an existing gameLogsImport in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  GameLogsImport.findById(req.params.id, function (err, gameLogsImport) {
    if (err) { return handleError(res, err); }
    if(!gameLogsImport) { return res.status(404).send('Not Found'); }
    var updated = _.merge(gameLogsImport, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(gameLogsImport);
    });
  });
};

// Deletes a gameLogsImport from the DB.
exports.destroy = function(req, res) {
  GameLogsImport.findById(req.params.id, function (err, gameLogsImport) {
    if(err) { return handleError(res, err); }
    if(!gameLogsImport) { return res.status(404).send('Not Found'); }
    gameLogsImport.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
