'use strict';
(function () {
  var adForm = document.querySelector('.ad-form'); // Это потом уйдет в модуль element, уточнить как записать
  var fieldsets = adForm.querySelectorAll('fieldset'); // Это потом уйдет в модуль element, уточнить как записать
  var mapFilters = document.querySelector('.map__filters'); // Это потом уйдет в модуль element, уточнить как записать

  // Функция активации карты
  var activateMap = function (evt) {
    evt.stopPropagation();
    window.element.mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
    mapFilters.removeAttribute('disabled');
    window.backend.load(function (response) {
      window.data.ads = response;
      window.map.renderPins();
    }, function (message) {
      console.error(message); // Это я еще не успела()
    }
    );
    window.validation.validateCapacity(evt);
  };
  window.main = {
    adForm: adForm,
    activateMap: activateMap,
  };
})();
