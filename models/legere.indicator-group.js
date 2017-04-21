var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  indicatorID:  {type: Array}, // ID показателей
  name:         {type: String} // Имя группы показателей
});

module.exports = mongoose.model('LegereIndicatorGroup', schema);
