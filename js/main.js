'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
      photos: 'http://o0.github.io/assets/images/tokyo/hotel' + getRandom(1, 3) + 'jpg',
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

