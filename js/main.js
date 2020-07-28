'use strict';
(function () {

  var MOUSE_LEFT_BUTTON = 0;
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');

  var activateMap = function (evt) {
    evt.stopPropagation();
    if (mapElement.classList.contains('map--faded')) {
      window.backend.load(onSuccess, onError);
      window.form.enableAdForm();
      window.form.preValidateForm();
    }
  };
  var onSuccess = function (response) {
    mapElement.classList.remove('map--faded');
    window.data.pins = response;
    window.data.filtered = window.data.pins.filter(function (ad) {
      return ad.hasOwnProperty('offer');
    });
    window.pin.renderPins(window.data.filtered);
    window.form.setAddress(mapPinMainElement.offsetLeft, mapPinMainElement.offsetTop);
    window.form.enableMapFilters();
  };

  var onError = function (error) {
    window.dialog.openErrorDialog(error);
  };

  mapPinMainElement.addEventListener('mousedown', function (evt) {
    if (evt.button === MOUSE_LEFT_BUTTON) {
      activateMap(evt);
      window.move.onMoveListener(evt);
    }
  });
  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activateMap(evt);
    }
  });
  window.form.disableForms();
  window.form.setAddress(mapPinMainElement.offsetLeft, mapPinMainElement.offsetTop);
})();
