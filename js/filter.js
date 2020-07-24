'use strict';

(function () {

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

  var onFilterListener = function () {
    window.card.closeCard();
    window.data.filtered = window.data.ads.filter(function (ad) {
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
        var filter = true;
        for (var i = 0; i < features.length; i++) {
          if (ad.offer.features.indexOf(features[i]) === -1) {
            filter = false;
            break;
          }
        }
        return filter;
      };

      return filterType && filterGuests && filterPrice && filterRooms && filterFeatures();
    });
    window.debounce(window.pin.removePins());
    window.debounce(window.pin.renderPins(window.data.filtered));
  };

  featuresCollectionInput.forEach(function (checkbox) {
    checkbox.addEventListener('change', onFilterListener);
  });

  housingTypeSelect.addEventListener('change', onFilterListener);
  housingGuestsSelect.addEventListener('change', onFilterListener);
  housingPriceSelect.addEventListener('change', onFilterListener);
  housingRoomsSelect.addEventListener('change', onFilterListener);

})();
