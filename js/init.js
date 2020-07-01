'use strict';
(function () {
  var init = function () {
    var adForm = document.querySelector('.ad-form');
    var fieldsets = adForm.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', true);
    }
    var mapFilters = document.querySelector('.map__filters');
    mapFilters.setAttribute('disabled', true);
    document.querySelector('#address').value = window.pin.locationX + ', ' + window.pin.locationY;
  };
  init();
})();
