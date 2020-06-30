'use strict';
(function () {
  // Клонирование шаблона для метки
  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content;
  // Функция создания метки по шаблону
  var createPin = function (ad) {
    var mapElement = pin.cloneNode(true);
    mapElement.querySelector('.map__pin').style.left = (ad.location.x - window.data.MAP_PIN_WIDTH / 2) + 'px';
    mapElement.querySelector('.map__pin').top = (ad.location.y - window.data.FULL_MAP_PIN_HEIGHT) + 'px';
    mapElement.querySelector('.map__pin img').src = ad.author.avatar;
    mapElement.querySelector('.map__pin img').alt = ad.offer.title;
    return mapElement;
  };
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.ads.length; i++) {
      fragment.appendChild(createPin(window.data.ads[i]));
    }
    mapPins.appendChild(fragment);
  };
  var mapPinsClickHandler = function (evt) {
    if (evt.target
       && evt.target.matches('.map__pin')
    ) {
      for (var i = 0; i < window.data.ads.length; i++) {
        window.card.renderCard(window.data.ads[i]);
      }
    }
  };
  mapPins.addEventListener('click', mapPinsClickHandler);
  // var mapCardPopup = document.querySelector('.map__card')
  // var closePopupButton = document.querySelector('.popup__close');
  // closePopupButton.addEventListener('click', function () {
  //   mapCardPopup.classList.add('hidden');
  // });
  window.map = {
    mapPins: mapPins,
    renderPins: renderPins,
  };
})();
