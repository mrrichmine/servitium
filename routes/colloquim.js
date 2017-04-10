var express = require('express');
var router = express.Router();

var ColloquimMessage = require('../models/colloquim.message');

// Добавление сообщения
router.post('/post', function (req, res) {
  var colloquimmessage = new ColloquimMessage({
    creator:  req.body.creator,
    text:     req.body.text,
    room:     req.body.room
  });
  colloquimmessage.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'При публикации сообщения возникла ошибка соединения. Проверьте свое интернет-соединение и при необходимости обратитесь к Администратору.',
        error: err
      });
    }
    res.status(201).json({
      message: 'Сообщение успешно опубликовано',
      obj: result
    });
  });
});

router.get('/get/:room', function (req, res) {
  console.log(req.params.room);
  ColloquimMessage.find({ room: req.params.room }).limit( 12 ).sort( '-_id' ).exec( function (err, colloquimmessages) {
    if (err) {
      return res.status(500).json({
        title: 'При получении списка <- Сообщений -> возникла ошибка',
        error: err
      });
    }
    if (!colloquimmessages) {
      return res.status(404).json({
        title: 'Данные <- Сообщений -> не найдены',
        error: err
      });
    }
    res.status(200).json({
      message: '<- Сообщения -> получены',
      obj: colloquimmessages
    });
  });
});


module.exports = router;
