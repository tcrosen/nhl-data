'use strict';

var _ = require('lodash');
var PlayerImport = require('./player-import.model');

// Get list of player-imports
exports.index = function(req, res) {
  PlayerImport.find(function (err, playerImports) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(playerImports);
  });
};

// Get a single playerImport
exports.show = function(req, res) {
  PlayerImport.findById(req.params.id, function (err, playerImport) {
    if(err) { return handleError(res, err); }
    if(!playerImport) { return res.status(404).send('Not Found'); }
    return res.json(playerImport);
  });
};

// Creates a new playerImport in the DB.
exports.create = function(req, res) {
  PlayerImport.create(req.body, function(err, playerImport) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(playerImport);
  });
};

// Updates an existing playerImport in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PlayerImport.findById(req.params.id, function (err, playerImport) {
    if (err) { return handleError(res, err); }
    if(!playerImport) { return res.status(404).send('Not Found'); }
    var updated = _.merge(playerImport, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(playerImport);
    });
  });
};

// Deletes a playerImport from the DB.
exports.destroy = function(req, res) {
  PlayerImport.findById(req.params.id, function (err, playerImport) {
    if(err) { return handleError(res, err); }
    if(!playerImport) { return res.status(404).send('Not Found'); }
    playerImport.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
