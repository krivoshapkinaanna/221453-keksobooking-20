'use strict';
(function () {
// Отрисовка карточки
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var renderCard = function (ad) {

    var previuosCard = document.querySelector('.map .map__card');
    if (previuosCard) {
      previuosCard.remove();
    }
    var mapCardElement = card.cloneNode(true);
    var popupPhoto = mapCardElement.querySelector('.popup__photo');
    var popupPhotos = mapCardElement.querySelector('.popup__photos');
    var popupFeatures = mapCardElement.querySelector('.popup__features');
    mapCardElement.querySelector('.popup__title').textContent = ad.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = ad.offer.type;
    mapCardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
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
    var fragment = document.createDocumentFragment();
    for (i = 0; i < ad.offer.features.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + ad.offer.features[i]);
      fragment.appendChild(li);
    }

    while (popupFeatures.firstElementChild) {
      popupFeatures.firstElementChild.remove();
    }
    popupFeatures.appendChild(fragment);

    window.element.mapPins.after(mapCardElement);


    // Вешаем обработчик на close
    var closePopupButton = document.querySelector('.popup__close');

    closePopupButton.addEventListener('click', function () {
      var popupCard = document.querySelector('.map__card popup');
      popupCard.remove();
    });
  };


  window.card = {
    card: card,
    renderCard: renderCard,
  };
})();

