/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var GameLogsImport = require('./game-logs-import.model');

exports.register = function(socket) {
  GameLogsImport.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  GameLogsImport.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('game-logs-import:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('game-logs-import:remove', doc);
}