/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PlayerImport = require('./player-import.model');

exports.register = function(socket) {
  PlayerImport.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  PlayerImport.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('player-import:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('player-import:remove', doc);
}