'use strict';

// С 3й по 117 строку я еще не решила, что делать.
var map = document.querySelector('.map');

// Функция создания свойств карточки объявления
var generateAd = function (index) {
  var area = map.getBoundingClientRect();
  var location = {
    x: area.left + window.random.getRandom(0, area.width),
    y: window.random.getRandom(130, 630),
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + index + '.png',
      alt: 'Аватар пользователя',
    },
    offer: {
      title: 'Предложение',
      address: location.x + ', ' + location.y,
      price: window.random.getRandom(1000, 10000) + '/ночь',
      type: window.constants.TYPES[window.random.getRandom(0, window.constants.TYPES.length - 1)],
      room: window.random.getRandom(1, 6),
      guests: window.random.getRandom(1, 12),
      checkin: window.constants.TIMES[window.random.getRandom(0, window.constants.TIMES.length - 1)],
      checkout: window.constants.TIMES[window.random.getRandom(0, window.constants.TIMES.length - 1)],
      features: window.random.getRandomArray(window.constants.FEATURES),
      description: 'Описание',
      photos: window.random.getRandomArray(window.constants.PHOTOS),
    },
    location: location
  };
};

// Функция для создания массива карточек
var generateAds = function () {
  var ads = [];
  for (i = 0; i < window.constants.CARDS_AMOUNT; i++) {
    ads.push(generateAd(i + 1));
  }
  return ads;
};
window.main = {
  ads: generateAds(),
};

// Перевод форм в неактивный режим
var adForm = document.querySelector('.ad-form');
var fieldsets = adForm.querySelectorAll('fieldset');
for (var i = 0; i < fieldsets.length; i++) {
  fieldsets[i].setAttribute('disabled', true);
}
var mapFilters = document.querySelector('.map__filters');
mapFilters.setAttribute('disabled', true);


// Добавлен обработчик на левую кнопку мыши, активирует карту и все формы
var mapPinMain = document.querySelector('.map__pin--main');
document.querySelector('#address')
.value = (parseInt(mapPinMain.style.left, 10) + window.constants.MAP_PIN_WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + window.constants.FULL_MAP_PIN_HEIGHT / 2);

// Функция активации карты
var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  mapFilters.removeAttribute('disabled');
  document.querySelector('#address')
  .value = (parseInt(mapPinMain.style.left, 10) + window.constants.MAP_PIN_WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + window.constants.MAP_PIN_HEIGHT);
  window.pin.renderPins();
};

// Обработчик нажатия левой клавиши мыши
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activateMap();
    // Перемещение метки
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.querySelector('#address').value = (parseInt(mapPinMain.style.left, 10) + window.constants.MAP_PIN_WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + window.constants.MAP_PIN_HEIGHT);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
});

// Обработчик нажатия Enter
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activateMap();
  }
});

// Здесь совсем черновой вариант, пыталась вынести валидацию в отдельный модуль.

// Отправка формы, если валидация пройдена
adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.validation(titleInput);
  window.validation(priceInput);
  window.validation(typeSelect);
  window.validation(roomNumberInput);
  window.validation(capacityInput);
  if (adForm.checkValidity()) {
    adForm.submit();
  }
}
);
