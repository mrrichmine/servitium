var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name:         {type: String} // Имя филиала
});

module.exports = mongoose.model('LegereProvincia', schema);
