var express = require('express');
var router = express.Router();

var LegereValue           = require('../models/legere.value');
var LegereIndicator       = require('../models/legere.indicator');
var LegereIndicatorGroup  = require('../models/legere.indicator-group');

// Добавление значения показателя
router.post('/value', function (req, res) {

  var legerevalue = new LegereValue({
    indicatorId:  req.body.indicatorId,
    provinciaId:  req.body.provinciaId,
    value:        req.body.value
  });
  legerevalue.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'При публикации значения показателя возникла ошибка соединения. Проверьте свое интернет-соединение и при необходимости обратитесь к Администратору.',
        error: err
      });
    }
    res.status(201).json({
      message: 'Значение показателя успешно опубликовано',
      obj: result
    });
  });
});

// Получение значений показателей по ID показателя
router.get('/fromindicator/:id', function (req, res) {

  LegereValue.find( { indicatorId: req.params.id }, function (err, legerevalue) {
    if (err) {
      return res.status(500).json({
        title: 'При получении списка <- Значений показателей -> возникла ошибка',
        error: err
      });
    }
    if (!legerevalue) {
      return res.status(404).json({
        title: 'Данные <- Значения показателей -> не найдены',
        error: err
      });
    }
    res.status(200).json({
      message: '<- Значения показателей -> получены',
      obj: legerevalue
    });
  });
});

// Добавление показателя
router.post('/indicator', function (req, res) {

  var legereindicator = new LegereIndicator({
    groupId:  req.body.groupId,
    name:     req.body.name
  });
  legereindicator.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'При публикации показателя возникла ошибка соединения. Проверьте свое интернет-соединение и при необходимости обратитесь к Администратору.',
        error: err
      });
    }
    res.status(201).json({
      message: 'Показатель успешно опубликован',
      obj: result
    });
  });
});

// Получение показателей по ID группы
router.get('/fromgroup/:id', function (req, res) {

  LegereIndicator.find( { groupId: req.params.id }, function (err, legereindicator) {
    if (err) {
      return res.status(500).json({
        title: 'При получении списка <- Показателей -> возникла ошибка',
        error: err
      });
    }
    if (!legereindicator) {
      return res.status(404).json({
        title: 'Данные <- Показателей -> не найдены',
        error: err
      });
    }
    res.status(200).json({
      message: '<- Показатели -> получены',
      obj: legereindicator
    });
  });
});

// Добавление группы показателей
router.post('/indicator-group', function (req, res) {

  var legereindicatorgroup = new LegereIndicatorGroup({
    name: req.body.name
  });
  legereindicatorgroup.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'При публикации группы показателей возникла ошибка соединения. Проверьте свое интернет-соединение и при необходимости обратитесь к Администратору.',
        error: err
      });
    }
    res.status(201).json({
      message: 'Группа показателей успешно опубликована',
      obj: result
    });
  });
});

// Получение групп показателей
router.get('/indicator-group', function (req, res) {
  LegereIndicatorGroup.find( function (err, legereindicatorgroup) {
    if (err) {
      return res.status(500).json({
        title: 'При получении списка <- Групп показателей -> возникла ошибка',
        error: err
      });
    }
    if (!legereindicatorgroup) {
      return res.status(404).json({
        title: 'Данные <- Групп показателей -> не найдены',
        error: err
      });
    }
    res.status(200).json({
      message: '<- Группы показателей -> получены',
      obj: legereindicatorgroup
    });
  });
});

module.exports = router;
