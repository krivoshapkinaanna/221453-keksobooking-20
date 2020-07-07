'use strict';
(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');
  var locationY = (parseInt(mapPinMain.style.top, 10) + window.data.MAP_PIN_HEIGHT / 2);
  var locationX = (parseInt(mapPinMain.style.left, 10) + window.data.MAP_PIN_WIDTH / 2);
  var activLocationY = (parseInt(mapPinMain.style.top, 10) + window.data.FULL_MAP_PIN_HEIGHT);

  var movePin = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      locationX = (parseInt(mapPinMain.style.left, 10) + window.data.MAP_PIN_WIDTH / 2);
      activLocationY = (parseInt(mapPinMain.style.top, 10) + window.data.FULL_MAP_PIN_HEIGHT);
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mapPinMain.offsetLeft - shift.x >= window.data.LEFT_PIN_BORDER
        && mapPinMain.offsetLeft - shift.x <= window.data.RIGHT_PIN_BORDER) {
        if (moveEvt.clientX <= mapElement.offsetLeft
          && mapPinMain.offsetLeft === window.data.LEFT_PIN_BORDER) {
          mapPinMain.style.left = window.data.LEFT_PIN_BORDER + 'px';
        } else if (moveEvt.clientX > mapElement.offsetLeft + mapElement.offsetWidth
          && mapPinMain.offsetLeft === window.data.RIGHT_PIN_BORDER) {
          mapPinMain.style.left = window.data.RIGHT_PIN_BORDER + 'px';
        } else {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        }
      }
      if ((mapPinMain.offsetTop + 84) - shift.y >= 130 && (mapPinMain.offsetTop + 84) - shift.y <= 630) {
        if (moveEvt.clientY < (mapElement.offsetTop + 130) && mapPinMain.offsetTop === 46) {
          mapPinMain.style.top = 46 + 'px';
        } else if (moveEvt.clientY > (mapElement.offsetTop + 630) && mapPinMain.offsetTop === 546) {
          mapPinMain.style.top = 546 + 'px';
        } else {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        }
      }
      document.querySelector('#address').value = locationX + ', ' + activLocationY;
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.querySelector('#address').value = locationX + ', ' + activLocationY;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  var isFaded = function () {
    return mapElement.classList.contains('map--faded');
  };
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0
      && isFaded()) {
      window.main.activateMap(evt);
      movePin(evt);
    } else if (evt.button === 0
      && !isFaded()) {
      movePin(evt);
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.main.activateMap();
    }
  });
  window.pin = {
    locationX: locationX,
    locationY: locationY,
    activLocationY: activLocationY,
  };
})();
