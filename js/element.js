'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin');
  var pinElement = pinTemplate.content.querySelector('.map__pin');

  window.element = {
    mapElement: mapElement,
    mapPins: mapPins,
    pinElement: pinElement,
  };
})();
