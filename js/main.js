'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
  var map = document.querySelector('.map').getBoundingClientRect();
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
      photos: 'http://o0.github.io/assets/images/tokyo/hotel' + getRandom(1, 3) + 'jpg',
    },
    location: location
  }; return ad;
};

// Функция для создания массива карточек
var generateAds = function () {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    ads.push(generateAd(i + 1));
  }
  return ads;
};
var ads = generateAds();

// Переводит карту в активный режим
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
  for (var i = 0; i < 8; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  mapPins.appendChild(fragment);
};
renderPins();

