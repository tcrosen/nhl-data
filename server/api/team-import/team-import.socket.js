/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var TeamImport = require('./team-import.model');

exports.register = function(socket) {
  TeamImport.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  TeamImport.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('team-import:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('team-import:remove', doc);
}