/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ScheduleImport = require('./schedule-import.model');

exports.register = function(socket) {
  ScheduleImport.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ScheduleImport.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('schedule-import:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('schedule-import:remove', doc);
}