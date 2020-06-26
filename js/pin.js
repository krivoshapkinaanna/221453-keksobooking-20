'use strict';

(function () {
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

  // Глобальная ОВ и отрисовка всех меток на карте
  window.pin = {
    mapPins: mapPins,
    renderPins: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.constants.CARDS_AMOUNT; i++) {
        fragment.appendChild(renderPin(window.main.ads[i]));
      }
      mapPins.appendChild(fragment);
    }
  };
})();
