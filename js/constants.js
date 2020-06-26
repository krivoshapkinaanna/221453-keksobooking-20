'use strict';

(function () {
  var TYPES_TRANSCRIPTION = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  window.constants = {
    CARDS_AMOUNT: 8,
    TYPES: [TYPES_TRANSCRIPTION.palace, TYPES_TRANSCRIPTION.flat, TYPES_TRANSCRIPTION.house, TYPES_TRANSCRIPTION.bungalo],
    TIMES: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    FULL_MAP_PIN_HEIGHT: 80, // высотка метки с указателем
    MAP_PIN_HEIGHT: 62,
    MAP_PIN_WIDTH: 62,
  };
})();
