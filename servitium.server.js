var express = require('express');
var servitium = express();

var config = require('./config/config');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Mongoose => MongoDB connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.mongodbHost + ':' + config.mongodbPort + '/' + config.mongodbDatabase);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to ' + config.mongodbDatabase + ' on ' + config.mongodbHost + ':' + config.mongodbPort)
});

var colloquim = require('./routes/colloquim');
var legere = require('./routes/legere');
var index = require('./routes/index');

// Задаем папку, доступную из фронтенда
servitium.use(express.static(path.join(__dirname, 'public')));
// Иконка приложения
servitium.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

servitium.use(logger('dev'));
servitium.use(bodyParser.json());
servitium.use(bodyParser.urlencoded({ extended: false }));
servitium.use(cookieParser());


// Задаем заголовки для данных из ответов(response)
servitium.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

servitium.use('/colloquim', colloquim);
servitium.use('/legere', legere);
servitium.use('/', index);

// catch 404 and forward to error handler
servitium.use(function(req, res, next) {
  var err = new Error('Страница на найдена');
  err.status = 404;
  next(err);
});

// error handler
servitium.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.servitium.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = servitium;
