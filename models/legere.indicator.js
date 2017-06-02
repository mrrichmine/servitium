var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  groupId:      {type: Schema.Types.ObjectId}, // ID группы показателей
  name:         {type: String}, // Имя показателя
  lastUpdated:  {type: Date, default: Date.now()} // Время последнего обновления
});

module.exports = mongoose.model('LegereIndicator', schema);
