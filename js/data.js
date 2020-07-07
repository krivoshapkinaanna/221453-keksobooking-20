'use strict';

(function () {
  // var TYPES_TRANSCRIPTION = {
  //   palace: 'Дворец',
  //   flat: 'Квартира',
  //   house: 'Дом',
  //   bungalo: 'Бунгало'
  // };
  // var HALF_MAP_PIN_WIDTH = MAP_PIN_WIDTH / 2;
  var FULL_MAP_PIN_HEIGHT = 84; // высотка метки с указателем
  var MAP_PIN_HEIGHT = 62;
  var MAP_PIN_WIDTH = 62;
  var LEFT_PIN_BORDER = ((window.element.mapElement.clientLeft) - MAP_PIN_WIDTH / 2);
  var RIGHT_PIN_BORDER = ((window.element.mapElement.clientWidth) - MAP_PIN_WIDTH / 2);
  var VALIDATE_TITLE_MESSAGE = {
    TOO_SHORT: 'Заголовок должен состоять минимум из 30 символов',
    TOO_LONG: 'Заголовок не должен превышать 100 символов',
    VALUE_MISSING: 'Обязательное поле',
  };

  window.data = {
    ads: [],
    FULL_MAP_PIN_HEIGHT: FULL_MAP_PIN_HEIGHT,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    LEFT_PIN_BORDER: LEFT_PIN_BORDER,
    RIGHT_PIN_BORDER: RIGHT_PIN_BORDER,
    VALIDATE_TITLE_MESSAGE: VALIDATE_TITLE_MESSAGE,
  };
})();

