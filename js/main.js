'use strict';
(function () {
  var adForm = document.querySelector('.ad-form'); // Это потом уйдет в модуль element, уточнить как записать
  var fieldsets = adForm.querySelectorAll('fieldset'); // Это потом уйдет в модуль element, уточнить как записать
  var mapFilters = document.querySelector('.map__filters'); // Это потом уйдет в модуль element, уточнить как записать
  // Функция активации карты
  var activateMap = function () {
    window.data.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
    mapFilters.removeAttribute('disabled');
    var onSuccess = function (response) {
      window.data.ads = response;
      window.map.renderPins();
    };
    var onError = function (message) {
      console.error(message); // Пока закрыт доступ к заданию 6.2, поэтому не прописано сообщение
    };
    window.load.load(URL, onSuccess, onError);
    window.validation.validateCapacity();
  };
  window.main = {
    adForm: adForm,
    activateMap: activateMap,
  };
})();
