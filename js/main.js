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
// var MIN_TITLE_LENGTH = 30;
// var MAX_TITLE_LENGTH = 100;


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
  map.getBoundingClientRect();
  var location = {
    x: map.left + getRandom(0, map.width),
    y: getRandom(130, 630),
  };
  var ad = {
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
  }; return ad;
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
  mapElement.querySelector('.map__pin').style.left = ad.location.x + 'px';
  mapElement.querySelector('.map__pin').style.top = ad.location.y + 'px';
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
// Функция активации карты
var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  mapFilters.removeAttribute('disabled');
  renderPins();
};

// Обработчик нажатия левой клавиши мыши
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activateMap();
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
titleInput.addEventListener('invalid', function () {
  // var valueLength = titleInput.value.length;
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

