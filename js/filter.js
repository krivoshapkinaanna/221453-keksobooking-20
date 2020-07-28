'use strict';

(function () {
  var MAX_ADS = 5;
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var featuresCollectionInput = document.querySelectorAll('.map__features .map__checkbox');

  var convertPriceToString = function (price) {
    var priceCategory;

    if (price < 10000) {
      priceCategory = 'low';
    } else if (price >= 10000 && price <= 50000) {
      priceCategory = 'middle';
    } else if (price > 50000) {
      priceCategory = 'high';
    }
    return priceCategory;
  };

  var onFilterListener = window.debounce(function () {
    window.card.closeCard();
    var ads = [];
    for (var i = 0; i < window.data.pins.length; i++) {
      var ad = window.data.pins[i];
      var filterType = ad.offer.type === housingTypeSelect.value || housingTypeSelect.value === 'any';
      var filterGuests = ad.offer.guests === +housingGuestsSelect.value || housingGuestsSelect.value === 'any';
      var filterPrice = convertPriceToString(ad.offer.price) === housingPriceSelect.value || housingPriceSelect.value === 'any';
      var filterRooms = ad.offer.rooms === +housingRoomsSelect.value || housingRoomsSelect.value === 'any';

      var features = [];

      featuresCollectionInput.forEach(function (input) {
        if (input.checked) {
          features.push(input.value);
        }
      });

      var filterFeatures = function () {
        for (var j = 0; j < features.length; j++) {
          if (ad.offer.features.indexOf(features[j]) === -1) {
            return false;
          }
        }
        return true;
      };

      if (filterType && filterGuests && filterPrice && filterRooms && filterFeatures() && ad.hasOwnProperty('offer')) {
        ads.push(ad);
      }
      if (ads.length === MAX_ADS) {
        break;
      }
    }
    window.data.filtered = ads;
    window.pin.removePins();
    window.pin.renderPins(window.data.filtered);
  });

  featuresCollectionInput.forEach(function (checkbox) {
    checkbox.addEventListener('change', onFilterListener);
  });

  housingTypeSelect.addEventListener('change', onFilterListener);
  housingGuestsSelect.addEventListener('change', onFilterListener);
  housingPriceSelect.addEventListener('change', onFilterListener);
  housingRoomsSelect.addEventListener('change', onFilterListener);

})();
