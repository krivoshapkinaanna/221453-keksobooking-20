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
    document.querySelector('#address').value = window.pin.locationX + ', ' + window.pin.activLocationY;
  };
  window.main = {
    activateMap: activateMap,
    adForm: adForm,
  };
})();
