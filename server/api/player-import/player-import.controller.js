'use strict';

var _ = require('lodash');
var PlayerImport = require('./player-import.model');

// Get list of player-imports
exports.index = function(req, res) {
  PlayerImport.find(function (err, player-imports) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(player-imports);
  });
};

// Get a single player-import
exports.show = function(req, res) {
  PlayerImport.findById(req.params.id, function (err, player-import) {
    if(err) { return handleError(res, err); }
    if(!player-import) { return res.status(404).send('Not Found'); }
    return res.json(player-import);
  });
};

// Creates a new player-import in the DB.
exports.create = function(req, res) {
  PlayerImport.create(req.body, function(err, player-import) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(player-import);
  });
};

// Updates an existing player-import in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PlayerImport.findById(req.params.id, function (err, player-import) {
    if (err) { return handleError(res, err); }
    if(!player-import) { return res.status(404).send('Not Found'); }
    var updated = _.merge(player-import, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(player-import);
    });
  });
};

// Deletes a player-import from the DB.
exports.destroy = function(req, res) {
  PlayerImport.findById(req.params.id, function (err, player-import) {
    if(err) { return handleError(res, err); }
    if(!player-import) { return res.status(404).send('Not Found'); }
    player-import.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}