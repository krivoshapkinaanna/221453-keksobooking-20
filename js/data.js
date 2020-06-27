'use strict';

(function () {
  var TYPES_TRANSCRIPTION = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var CARDS_AMOUNT = 8;
  var TYPES = [TYPES_TRANSCRIPTION.palace, TYPES_TRANSCRIPTION.flat, TYPES_TRANSCRIPTION.house, TYPES_TRANSCRIPTION.bungalo];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var FULL_MAP_PIN_HEIGHT = 84; // высотка метки с указателем
  var MAP_PIN_HEIGHT = 62;
  var MAP_PIN_WIDTH = 62;
  // var HALF_MAP_PIN_WIDTH = MAP_PIN_WIDTH / 2;
  var LEFT_PIN_BORDER = -31; // (Надо ли вычислять как половину ширины пина или можно просто задать значение самому?)
  var RIGHT_PIN_BORDER = 1168;
  var map = document.querySelector('.map');

  // Функция создания свойств карточки объявления
  var area = map.getBoundingClientRect();
  var generateAd = function (index) {
    var location = {
      x: area.left + (window.util.getRandom(0, area.width)),
      y: window.util.getRandom(130, 630),
    };
    return {
      author: {
        avatar: 'img/avatars/user0' + index + '.png',
        alt: 'Аватар пользователя',
      },
      offer: {
        title: 'Предложение',
        address: location.x + ', ' + location.y,
        price: window.util.getRandom(1000, 10000) + '/ночь',
        type: TYPES[window.util.getRandom(0, TYPES.length - 1)],
        room: window.util.getRandom(1, 6),
        guests: window.util.getRandom(1, 12),
        checkin: TIMES[window.util.getRandom(0, TIMES.length - 1)],
        checkout: TIMES[window.util.getRandom(0, TIMES.length - 1)],
        features: window.util.getRandomArray(FEATURES),
        description: 'Описание',
        photos: window.util.getRandomArray(PHOTOS),
      },
      location: location
    };
  };

  // Функция для создания массива карточек
  var generateAds = function () {
    var ads = [];
    for (var i = 0; i < CARDS_AMOUNT; i++) {
      ads.push(generateAd(i + 1));
    }
    return ads;
  };
  var ads = generateAds();
  window.data = {
    FEATURES: FEATURES,
    FULL_MAP_PIN_HEIGHT: FULL_MAP_PIN_HEIGHT,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    LEFT_PIN_BORDER: LEFT_PIN_BORDER,
    RIGHT_PIN_BORDER: RIGHT_PIN_BORDER,
    map: map,
    ads: ads,
    area: area,
  };
})();

