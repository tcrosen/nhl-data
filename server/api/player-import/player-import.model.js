'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerImportSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('PlayerImport', PlayerImportSchema);