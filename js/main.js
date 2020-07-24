'use strict';
(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
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
    window.data.filtered = window.data.ads = response;
    window.pin.renderPins(window.data.filtered.slice(0, 5));
    window.form.enableMapFilters();
  };

  var onError = function (error) {
    window.dialog.openErrorDialog(error);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activateMap(evt);
      window.move.onMoveListener(evt);
    }
  });
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activateMap(evt);
    }
  });
  window.form.disableForms();
  window.form.setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
  window.main = {
    mapElement: mapElement,
    mapPinMain: mapPinMain
  };
})();
