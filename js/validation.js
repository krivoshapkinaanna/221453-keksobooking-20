'use strict';
// Добавлена валидация на поле заголовка
(function () {
  var titleInput = document.querySelector('#title');
  var validateTitle = function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  };
  titleInput.addEventListener('change', function () {
    validateTitle();
  });
  // Валидация цены
  var priceInput = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var validatePrice = function () {
    if (typeSelect.value === 'bungalo') {
      priceInput.min = '0';
      priceInput.placeholder = '0';
    } else if (typeSelect.value === 'flat') {
      priceInput.min = '1000';
      priceInput.placeholder = '1000';
    } else if (typeSelect.value === 'house') {
      priceInput.min = '5000';
      priceInput.placeholder = '5000';
    } else if (typeSelect.value === 'palace') {
      priceInput.min = '10000';
      priceInput.placeholder = '10000';
    }
  };
  priceInput.addEventListener('change', function () {
    validatePrice();
  });
  typeSelect.addEventListener('change', function () {
    validatePrice();
  });

  // Валидация заезда/выезда
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var validateTime = function (evt) {
    timeInInput.value = evt.target.value;
    timeOutInput.value = evt.target.value;
  };
  timeInInput.addEventListener('change', function (evt) {
    validateTime(evt);
  });
  timeOutInput.addEventListener('change', function (evt) {
    validateTime(evt);
  });

  // Валидация комнат-гостей
  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');
  var validateCapacity = function () {
    roomNumberInput.setCustomValidity('');
    capacityInput.setCustomValidity('');
    var rooms = roomNumberInput.value;
    var capacity = capacityInput.value;
    if (rooms === '100' && capacity !== '0') {
      roomNumberInput.setCustomValidity('Не для гостей');
      roomNumberInput.reportValidity();
    } else if (rooms < capacity) {
      roomNumberInput.setCustomValidity('Нужно больше комнат');
      roomNumberInput.reportValidity();
    } else if (rooms !== '100' && capacity === '0') {
      capacityInput.setCustomValidity('Нужно больше гостей');
      capacityInput.reportValidity();
    }
  };
  roomNumberInput.addEventListener('change', function () {
    validateCapacity();
  });
  capacityInput.addEventListener('change', function () {
    validateCapacity();
  });
  window.main.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    validateCapacity(evt);
    validateTitle(evt);
    validatePrice(evt);
    validateTime(evt);
    if (window.main.adForm.checkValidity()) {
      window.main.adForm.submit();
    }
  }
  );
  window.validation = {
    validateCapacity: validateCapacity,
  };
})();
