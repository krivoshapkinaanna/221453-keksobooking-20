'use strict';

(function () {
  var ERROR_OUTLINE = '4px solid rgb(255, 99, 71)';
  var ERROR_NONE = 'none';
  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var resetButton = document.querySelector('.ad-form__reset');
  var submitButton = document.querySelector('.ad-form__submit');
  var titleInputElement = document.querySelector('#title');
  var addressInputElement = document.querySelector('#address');
  var typeSelectElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');
  var timeInSelectElement = document.querySelector('#timein');
  var timeOutSelectElement = document.querySelector('#timeout');
  var roomNumberSelectElement = document.querySelector('#room_number');
  var capacitySelectElement = document.querySelector('#capacity');
  var typePrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };
  var disableForm = function (form) {
    [].slice.call(form.children).forEach(function (fieldsetElement) {
      fieldsetElement.setAttribute('disabled', true);
    });
  };

  var enableForm = function (form) {
    [].slice.call(form.children).forEach(function (fieldsetElement) {
      fieldsetElement.removeAttribute('disabled');
    });
  };

  var disableForms = function () {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    disableForm(adForm);
    disableForm(mapFilters);
  };

  var enableAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    enableForm(adForm);
  };

  var enableMapFilters = function () {
    mapFilters.classList.remove('map__filters--disabled');
    enableForm(mapFilters);
  };
  var setAddress = function (x, y) {
    if (mapElement.classList.contains('map--faded')) {
      addressInputElement.value = Math.floor(x + window.pin.mapPinWidth / 2) + ', ' + Math.floor(y + window.pin.mapPinHeight / 2);
    } else if (!mapElement.classList.contains('map--faded')) {
      addressInputElement.value = Math.floor(x + window.pin.mapPinWidth / 2) + ', ' + Math.floor(y + window.pin.fullMapPinHeight);
    }
  };
  var validateTypePrice = function () {
    priceInputElement.placeholder = typePrice[typeSelectElement.value];
    priceInputElement.min = typePrice[typeSelectElement.value];
  };
  var validateCapacity = function () {
    var rooms = roomNumberSelectElement.value;
    var capacity = capacitySelectElement.value;
    if (rooms === '100' && capacity !== '0') {
      roomNumberSelectElement.setCustomValidity('Не для гостей');
      capacitySelectElement.setCustomValidity('');
    } else if (rooms < capacity) {
      roomNumberSelectElement.setCustomValidity('Нужно больше комнат');
      capacitySelectElement.setCustomValidity('');
    } else if (rooms !== '100' && capacity === '0') {
      capacitySelectElement.setCustomValidity('Нужно больше гостей');
      roomNumberSelectElement.setCustomValidity('');
    } else {
      roomNumberSelectElement.setCustomValidity('');
      capacitySelectElement.setCustomValidity('');
    }
  };
  var validateTime = function (evt) {
    timeInSelectElement.value = evt.target.value;
    timeOutSelectElement.value = evt.target.value;
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
    preValidateForm();
    disableForms();
    mapElement.classList.add('map--faded');
    window.pin.setDeactiveMapPinMain();
  };
  var markInvalidFields = function () {
    titleInputElement.style.outline = !titleInputElement.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
    priceInputElement.style.outline = !priceInputElement.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
    capacitySelectElement.style.outline = !capacitySelectElement.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
    roomNumberSelectElement.style.outline = !roomNumberSelectElement.checkValidity() ? ERROR_OUTLINE : ERROR_NONE;
  };
  typeSelectElement.addEventListener('change', function () {
    validateTypePrice();
  });
  timeInSelectElement.addEventListener('change', function (evt) {
    validateTime(evt);
  });
  timeOutSelectElement.addEventListener('change', function (evt) {
    validateTime(evt);
  });
  capacitySelectElement.addEventListener('change', function () {
    validateCapacity();
  });
  roomNumberSelectElement.addEventListener('change', function () {
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
  };
})();
