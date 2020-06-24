'use strict';

var TYPES_TRANSCRIPTION = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var TYPES = [TYPES_TRANSCRIPTION.palace, TYPES_TRANSCRIPTION.flat, TYPES_TRANSCRIPTION.house, TYPES_TRANSCRIPTION.bungalo];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FULL_MAP_PIN_HEIGHT = 80; // высотка метки с указателем
var MAP_PIN_HEIGHT = 62;
var MAP_PIN_WIDTH = 62;

var map = document.querySelector('.map');

// Функция для получения целого случайного числа включительно
var getRandom = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
// Случайное кол-во значений
var getRandomArray = function (array) {
  return array.slice(0, getRandom(1, array.length));
};

// Функция создания свойств карточки объявления
var generateAd = function (index) {
  var area = map.getBoundingClientRect();
  var location = {
    x: area.left + getRandom(0, area.width),
    y: getRandom(130, 630),
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + index + '.png',
      alt: 'Аватар пользователя',
    },
    offer: {
      title: 'Предложение',
      address: location.x + ', ' + location.y,
      price: getRandom(1000, 10000) + '/ночь',
      type: TYPES[getRandom(0, TYPES.length - 1)],
      room: getRandom(1, 6),
      guests: getRandom(1, 12),
      checkin: TIMES[getRandom(0, TIMES.length - 1)],
      checkout: TIMES[getRandom(0, TIMES.length - 1)],
      features: getRandomArray(FEATURES),
      description: 'Описание',
      photos: getRandomArray(PHOTOS),
    },
    location: location
  };
};

// Функция для создания массива карточек
var generateAds = function () {
  var ads = [];
  for (i = 0; i < 8; i++) {
    ads.push(generateAd(i + 1));
  }
  return ads;
};
var ads = generateAds();

// Клонирование шаблона для метки
var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content;

// Функция создания метки по шаблону
var renderPin = function (ad) {
  var mapElement = pin.cloneNode(true);
  mapElement.querySelector('.map__pin').style.left = ad.location.x - MAP_PIN_WIDTH / 2 + 'px';
  mapElement.querySelector('.map__pin').style.top = ad.location.y - FULL_MAP_PIN_HEIGHT + 'px';
  mapElement.querySelector('.map__pin img').src = ad.author.avatar;
  mapElement.querySelector('.map__pin img').alt = ad.offer.title;
  return mapElement;
};

// Отрисовка всех меток на карте
var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < 8; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  mapPins.appendChild(fragment);
};

/*
// Отрисовка карточки
var card = document.querySelector('#card').content.querySelector('.map__card');
var renderCard = function (ad) {
  var mapCardElement = card.cloneNode(true);
  var popupPhoto = mapCardElement.querySelector('.popup__photo');
  var popupPhotos = mapCardElement.querySelector('.popup__photos');
  var popupFeatures = mapCardElement.querySelector('.popup__features');
  mapCardElement.querySelector('.popup__title').textContent = ad.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = ad.offer.type;
  mapCardElement.querySelector('.popup__text--capacity').textContent = ad.offer.room + ' комнаты для ' + ad.offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  mapCardElement.querySelector('.popup__description').textContent = ad.offer.description;
  mapCardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  // Удаляем лишний элемент и подставляем массив в фото
  popupPhotos.removeChild(popupPhoto);
  for (var i = 0; i < ad.offer.photos.length; i++) {
    var photo = popupPhoto.cloneNode(true);
    photo.src = ad.offer.photos[i];
    popupPhotos.appendChild(photo);
  }
  // Удаляем лишние элементы и подставляем массив в преимущества
  var fragment = new DocumentFragment();
  for (i = 0; i < ad.offer.features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + FEATURES[i]);
    fragment.appendChild(li);
  }
  while (popupFeatures.firstElementChild) {
    popupFeatures.firstElementChild.remove();
  }
  popupFeatures.appendChild(fragment);

  mapPins.after(mapCardElement);
};
renderCard(ads[1]);
*/

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
document.querySelector('#address').value = (parseInt(mapPinMain.style.left, 10) + MAP_PIN_WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + FULL_MAP_PIN_HEIGHT / 2); // Не понимаю, почему не работает уточнение метки по высоте

// Функция активации карты
var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  mapFilters.removeAttribute('disabled');
  document.querySelector('#address').value = (parseInt(mapPinMain.style.left, 10) + MAP_PIN_WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_HEIGHT); // Не понимаю, почему не работает уточнение метки по высоте

  renderPins();
};

// Обработчик нажатия левой клавиши мыши
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activateMap();
    // Перемещение метки (доработать смену адреса при движении)
    /* var startCoords = {
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
      // address.value = parseInt(mapPinMain.style.left) + ', ' + parseInt(mapPinMain.style.top);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp); */
  }
});

// Обработчик нажатия Enter
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activateMap();
  }
});

// Добавлена валидация на поле заголовка
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

// Отправка формы, если валидация пройдена
adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  validateCapacity(evt);
  validateTitle(evt);
  validatePrice(evt);
  if (adForm.checkValidity()) {
    adForm.submit();
  }
}
);
