'use strict';

var _ = require('lodash');
var TeamImport = require('./team-import.model');

// Get list of team-imports
exports.index = function(req, res) {
  TeamImport.find(function (err, teamImports) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(teamImports);
  });
};

// Get a single teamImport
exports.show = function(req, res) {
  TeamImport.findById(req.params.id, function (err, teamImport) {
    if(err) { return handleError(res, err); }
    if(!teamImport) { return res.status(404).send('Not Found'); }
    return res.json(teamImport);
  });
};

// Creates a new teamImport in the DB.
exports.create = function(req, res) {
  TeamImport.create(req.body, function(err, teamImport) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(teamImport);
  });
};

// Updates an existing teamImport in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TeamImport.findById(req.params.id, function (err, teamImport) {
    if (err) { return handleError(res, err); }
    if(!teamImport) { return res.status(404).send('Not Found'); }
    var updated = _.merge(teamImport, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(teamImport);
    });
  });
};

// Deletes a teamImport from the DB.
exports.destroy = function(req, res) {
  TeamImport.findById(req.params.id, function (err, teamImport) {
    if(err) { return handleError(res, err); }
    if(!teamImport) { return res.status(404).send('Not Found'); }
    teamImport.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
