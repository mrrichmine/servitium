var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  value:    {type: Any, required: true}, // Значение показателя
  date:     {type: Date, default: Date.now()} // Время отправки
});

module.exports = mongoose.model('LegereValue', schema);
