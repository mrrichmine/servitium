var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name:         {type: String} // Имя группы показателей
});

module.exports = mongoose.model('LegereIndicatorGroup', schema);
