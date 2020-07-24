'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('.fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var resetButton = document.querySelector('.ad-form__reset');
  var submitButton = document.querySelector('.ad-form__submit');
  var titleInput = document.querySelector('#title');
  var addressInput = document.querySelector('#address');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var ERROR_OUTLINE = '4px solid rgb(255, 99, 71)';
  var ERROR_NONE = 'none';
  var typePrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var disableForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', true);
    }
  };
  var enableForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  };
  var disableForms = function () {
    adForm.classList.add('ad-form--disabled');
    disableForm(adForm);
    disableForm(mapFilters);
  };

  var enableAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    enableForm(adForm);
  };

  var enableMapFilters = function () {
    enableForm(mapFilters);
  };
  var setAddress = function (x, y) {
    if (mapElement.classList.contains('map--faded')) {
      addressInput.value = Math.floor(x + window.pin.mapPinWidth / 2) + ', ' + Math.floor(y + window.pin.mapPinHeight / 2);
    } else if (!mapElement.classList.contains('map--faded')) {
      addressInput.value = Math.floor(x + window.pin.mapPinWidth / 2) + ', ' + Math.floor(y + window.pin.fullMapPinHeight);
    }
  };
  var validateTypePrice = function () {
    priceInput.placeholder = typePrice[typeSelect.value];
    priceInput.min = typePrice[typeSelect.value];
  };
  var validateCapacity = function () {
    var rooms = roomNumberSelect.value;
    var capacity = capacitySelect.value;
    if (rooms === '100' && capacity !== '0') {
      roomNumberSelect.setCustomValidity('Не для гостей');
      capacitySelect.setCustomValidity('');
    } else if (rooms < capacity) {
      roomNumberSelect.setCustomValidity('Нужно больше комнат');
      capacitySelect.setCustomValidity('');
    } else if (rooms !== '100' && capacity === '0') {
      capacitySelect.setCustomValidity('Нужно больше гостей');
      roomNumberSelect.setCustomValidity('');
    } else {
      roomNumberSelect.setCustomValidity('');
      capacitySelect.setCustomValidity('');
    }
  };
  var validateTime = function (evt) {
    timeInSelect.value = evt.target.value;
    timeOutSelect.value = evt.target.value;
  };
  var preValidateForm = function () {
    validateTypePrice();
    validateCapacity();
  };
  var onDeactivatePage = function (evt) {
    evt.preventDefault();
    adForm.reset();
    mapFilters.reset();
    window.pin.removePins();
    window.card.closeCard();
    window.pin.setDeactiveMapPinMain();
    preValidateForm();
    disableForms();
    mapElement.classList.add('map--faded');
  };
  var markInvalidFields = function () {
    titleInput.style.outline = !titleInput.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
    priceInput.style.outline = !priceInput.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
    capacitySelect.style.outline = !capacitySelect.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
    roomNumberSelect.style.outline = !roomNumberSelect.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
  };
  typeSelect.addEventListener('change', function () {
    validateTypePrice();
  });
  timeInSelect.addEventListener('change', function (evt) {
    validateTime(evt);
  });
  timeOutSelect.addEventListener('change', function (evt) {
    validateTime(evt);
  });
  capacitySelect.addEventListener('change', function () {
    validateCapacity();
  });
  roomNumberSelect.addEventListener('change', function () {
    validateCapacity();
  });
  submitButton.addEventListener('click', function () {
    markInvalidFields();
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (adForm.checkValidity()) {
      window.backend.save(new FormData(adForm), function () {
        window.dialog.openSuccessDialog();
        onDeactivatePage(evt);
      }, function (error) {
        window.dialog.openErrorDialog(error);
      });
    }
  });

  resetButton.addEventListener('click', onDeactivatePage);

  window.form = {
    disableForms: disableForms,
    setAddress: setAddress,
    enableAdForm: enableAdForm,
    enableMapFilters: enableMapFilters,
    preValidateForm: preValidateForm,
    addressInput: addressInput,
  };
})();
