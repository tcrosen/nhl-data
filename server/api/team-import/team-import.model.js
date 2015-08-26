'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamImportSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('TeamImport', TeamImportSchema);