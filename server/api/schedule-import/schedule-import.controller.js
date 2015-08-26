'use strict';

var _ = require('lodash');
var ScheduleImport = require('./schedule-import.model');

// Get list of schedule-imports
exports.index = function(req, res) {
  ScheduleImport.find(function (err, scheduleImports) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(scheduleImports);
  });
};

// Get a single scheduleImport
exports.show = function(req, res) {
  ScheduleImport.findById(req.params.id, function (err, scheduleImport) {
    if(err) { return handleError(res, err); }
    if(!scheduleImport) { return res.status(404).send('Not Found'); }
    return res.json(scheduleImport);
  });
};

// Creates a new scheduleImport in the DB.
exports.create = function(req, res) {
  ScheduleImport.create(req.body, function(err, scheduleImport) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(scheduleImport);
  });
};

// Updates an existing scheduleImport in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ScheduleImport.findById(req.params.id, function (err, scheduleImport) {
    if (err) { return handleError(res, err); }
    if(!scheduleImport) { return res.status(404).send('Not Found'); }
    var updated = _.merge(scheduleImport, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(scheduleImport);
    });
  });
};

// Deletes a scheduleImport from the DB.
exports.destroy = function(req, res) {
  ScheduleImport.findById(req.params.id, function (err, scheduleImport) {
    if(err) { return handleError(res, err); }
    if(!scheduleImport) { return res.status(404).send('Not Found'); }
    scheduleImport.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
