var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  indicatorId:  {type: Schema.Types.ObjectId, ref: 'LegereIndicator'}, // ID показателя
  provinciaId:  {type: String}, // ID филиала
  value:        {type: Schema.Types.Mixed, required: true}, // Значение показателя
  date:         {type: Date, default: Date.now()} // Время отправки
});

module.exports = mongoose.model('LegereValue', schema);
