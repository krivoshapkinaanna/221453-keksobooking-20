'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapCardElement = cardTemplate.cloneNode(true);
  var closeCardButton = mapCardElement.querySelector('.popup__close');
  var mapPins = document.querySelector('.map__pins');
  var type = {
    bungalo: 'бунгало',
    flat: 'комната',
    house: 'дом',
    palace: 'дворец',
  };

  var renderCard = function (ad) {
    mapCardElement.querySelector('.popup__title').textContent = ad.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = type[ad.offer.type];
    mapCardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    mapCardElement.querySelector('.popup__description').textContent = ad.offer.description;
    mapCardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    var featuresElement = mapCardElement.querySelector('.popup__features');
    while (featuresElement.firstElementChild) {
      featuresElement.firstElementChild.remove();
    }
    var featureList = new DocumentFragment();
    ad.offer.features.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + feature);
      featureList.appendChild(featureElement);
    });
    featuresElement.appendChild(featureList);

    var photosElement = mapCardElement.querySelector('.popup__photos');
    var photosList = new DocumentFragment();
    ad.offer.photos.forEach(function (photo) {
      var photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photo;
      photosList.appendChild(photoElement);
    });
    while (photosElement.firstElementChild) {
      photosElement.firstElementChild.remove();
    }
    photosElement.appendChild(photosList);

    mapPins.after(mapCardElement);

    closeCardButton.addEventListener('click', closeCard);
    document.addEventListener('keydown', onCardEscPress);
    window.pin.removeActive();
  };
  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
    }
  };
  var closeCard = function () {
    mapCardElement.remove();
    window.pin.removeActive();
    closeCardButton.removeEventListener('click', closeCard);
    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {
    renderCard: renderCard,
    closeCard: closeCard,
  };
})();

