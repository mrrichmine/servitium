var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  text:     {type: String, required: true}, // Текст сообщения
  creator:  {type: String, required: true}, // Создатель сообщения
  date:     {type: Date, default: Date.now()}, // Время отправки
  room:     {type: String}
});

module.exports = mongoose.model('ColloquimMessage', schema);
