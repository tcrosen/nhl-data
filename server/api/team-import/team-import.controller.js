'use strict';

var _ = require('lodash');
var TeamImport = require('./team-import.model');

// Get list of team-imports
exports.index = function(req, res) {
  TeamImport.find(function (err, team-imports) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(team-imports);
  });
};

// Get a single team-import
exports.show = function(req, res) {
  TeamImport.findById(req.params.id, function (err, team-import) {
    if(err) { return handleError(res, err); }
    if(!team-import) { return res.status(404).send('Not Found'); }
    return res.json(team-import);
  });
};

// Creates a new team-import in the DB.
exports.create = function(req, res) {
  TeamImport.create(req.body, function(err, team-import) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(team-import);
  });
};

// Updates an existing team-import in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TeamImport.findById(req.params.id, function (err, team-import) {
    if (err) { return handleError(res, err); }
    if(!team-import) { return res.status(404).send('Not Found'); }
    var updated = _.merge(team-import, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(team-import);
    });
  });
};

// Deletes a team-import from the DB.
exports.destroy = function(req, res) {
  TeamImport.findById(req.params.id, function (err, team-import) {
    if(err) { return handleError(res, err); }
    if(!team-import) { return res.status(404).send('Not Found'); }
    team-import.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}