'use strict';
(function () {
  var mapElement = document.querySelector('.map');
  // // Функция создания метки по шаблону
  var createPin = function (ad) {
    var pin = window.element.pinElement.cloneNode(true);
    pin.style.left = (ad.location.x - window.data.MAP_PIN_WIDTH / 2) + 'px';
    pin.style.top = (ad.location.y - window.data.FULL_MAP_PIN_HEIGHT) + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;
    return pin;
  };
  var renderPins = function () {
    var pinsFragment = document.createDocumentFragment();
    window.data.ads.forEach(function (ad) {
      pinsFragment.appendChild(createPin(ad));
    });
    window.element.mapPins.appendChild(pinsFragment);
  };

  var onClickMap = function (evt) {
    var target = null;
    if (evt.target.classList.contains('map__pin')) {
      target = evt.target;
    } else if (evt.target.parentElement.classList.contains('map__pin')) {
      target = evt.target.parentElement;
    }
    var pinsCollection = document.querySelectorAll('.map__pin');

    window.card.renderCard(window.data.ads[[].slice.call(pinsCollection).indexOf(target) - 1]);
    evt.target.classList.add('map__pin--active');
  };
  mapElement.addEventListener('click', onClickMap);
  // window.element.mapElement.removeEventListener('click', window.map.onClickMap);

  window.map = {
    renderPins: renderPins,
    onClickMap: onClickMap,
  };
})();

