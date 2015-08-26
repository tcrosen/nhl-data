'use strict';

var _ = require('lodash');
var ScheduleImport = require('./schedule-import.model');

// Get list of schedule-imports
exports.index = function(req, res) {
  ScheduleImport.find(function (err, schedule-imports) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(schedule-imports);
  });
};

// Get a single schedule-import
exports.show = function(req, res) {
  ScheduleImport.findById(req.params.id, function (err, schedule-import) {
    if(err) { return handleError(res, err); }
    if(!schedule-import) { return res.status(404).send('Not Found'); }
    return res.json(schedule-import);
  });
};

// Creates a new schedule-import in the DB.
exports.create = function(req, res) {
  ScheduleImport.create(req.body, function(err, schedule-import) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(schedule-import);
  });
};

// Updates an existing schedule-import in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ScheduleImport.findById(req.params.id, function (err, schedule-import) {
    if (err) { return handleError(res, err); }
    if(!schedule-import) { return res.status(404).send('Not Found'); }
    var updated = _.merge(schedule-import, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(schedule-import);
    });
  });
};

// Deletes a schedule-import from the DB.
exports.destroy = function(req, res) {
  ScheduleImport.findById(req.params.id, function (err, schedule-import) {
    if(err) { return handleError(res, err); }
    if(!schedule-import) { return res.status(404).send('Not Found'); }
    schedule-import.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}