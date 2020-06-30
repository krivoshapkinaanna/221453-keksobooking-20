'use strict';
(function () {

  // Перевод форм в неактивный режим
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', true);
  }
  var mapFilters = document.querySelector('.map__filters');
  mapFilters.setAttribute('disabled', true);
  document.querySelector('#address').value = window.pin.locationX + ', ' + window.pin.locationY;

  // Функция активации карты
  var activateMap = function () {
    window.data.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
    mapFilters.removeAttribute('disabled');
    var onSuccess = function (response) {
      window.data.ads = response;
      window.map.renderPins();
    };
    var onError = function (message) {
      console.error(message);
    };
    window.load.load(URL, onSuccess, onError);
    window.validation.validateCapacity();
  };
  window.main = {
    adForm: adForm,
    activateMap: activateMap,
  };
})();
