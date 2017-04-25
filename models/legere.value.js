var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  indicatorId:  {type: Schema.Types.ObjectId, ref: 'LegereIndicator'}, // ID показателя
  value:        {type: Schema.Types.Mixed, required: true}, // Значение показателя
  date:         {type: Date, default: Date.now()} // Время отправки
});

module.exports = mongoose.model('LegereValue', schema);
