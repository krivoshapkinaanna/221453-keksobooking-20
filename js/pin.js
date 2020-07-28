'use strict';

(function () {
  var FULL_MAP_PIN_HEIGHT = 84;
  var MAP_PIN_HEIGHT = 62;
  var MAP_PIN_WIDTH = 62;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_POS_X = 570;
  var MAIN_PIN_POS_Y = 375;
  var MAX_PINS_AMOUNT = 5;
  var MIN_PINS_AMOUNT = 0;
  var mapPinsElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinMainElement = document.querySelector('.map__pin--main');

  var createPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.style.left = (ad.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (ad.location.y - PIN_HEIGHT) + 'px';
    return pinElement;
  };
  var renderPins = function (data) {
    var pinsFragment = new DocumentFragment();
    data.slice(MIN_PINS_AMOUNT, MAX_PINS_AMOUNT).forEach(function (ad) {
      pinsFragment.appendChild(createPin(ad));
    });
    mapPinsElement.appendChild(pinsFragment);
  };
  var removePins = function () {
    var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsCollection.forEach(function (item) {
      item.remove();
    });
  };
  var removeActive = function () {
    var pinsCollection = document.querySelectorAll('.map__pin');
    pinsCollection.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };
  var setDeactiveMapPinMain = function () {
    mapPinMainElement.style.left = MAIN_PIN_POS_X + 'px';
    mapPinMainElement.style.top = MAIN_PIN_POS_Y + 'px';
    window.form.setAddress(MAIN_PIN_POS_X, MAIN_PIN_POS_Y);
  };
  window.pin = {
    fullMapPinHeight: FULL_MAP_PIN_HEIGHT,
    mapPinHeight: MAP_PIN_HEIGHT,
    mapPinWidth: MAP_PIN_WIDTH,
    renderPins: renderPins,
    removePins: removePins,
    removeActive: removeActive,
    setDeactiveMapPinMain: setDeactiveMapPinMain,
  };
})();
