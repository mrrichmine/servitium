var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  valueID:      {type: Array}, // ID значений показателя
  name:         {type: String}, // Имя показателя
  lastUpdated:  {type: Date, default: Date.now()} // Время последнего обновления
});

module.exports = mongoose.model('LegereIndicator', schema);
