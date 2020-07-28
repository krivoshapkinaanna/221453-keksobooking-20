'use strict';
(function () {
  var MAP_OFFSET_LEFT = ((window.map.mapElement.clientLeft) - window.pin.mapPinWidth / 2);
  var MAP_OFFSET_RIGHT = ((window.map.mapElement.clientWidth) - window.pin.mapPinWidth / 2);
  var MIN_Y_COORD = 130;
  var MAX_Y_COORD = 630;
  var MAP_OFFSET_TOP = MIN_Y_COORD - window.pin.fullMapPinHeight;
  var MAP_OFFSET_BOTTOM = MAX_Y_COORD - window.pin.fullMapPinHeight;
  var mapPinMainElement = document.querySelector('.map__pin--main');

  var onMoveListener = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (mapPinMainElement.offsetLeft - shift.x >= MAP_OFFSET_LEFT && mapPinMainElement.offsetLeft - shift.x <= MAP_OFFSET_RIGHT) {
        mapPinMainElement.style.left = (mapPinMainElement.offsetLeft - shift.x) + 'px';
      }

      if (mapPinMainElement.offsetTop - shift.y >= MAP_OFFSET_TOP && mapPinMainElement.offsetTop - shift.y <= MAP_OFFSET_BOTTOM) {
        mapPinMainElement.style.top = (mapPinMainElement.offsetTop - shift.y) + 'px';
      }

      window.form.setAddress(mapPinMainElement.offsetLeft, mapPinMainElement.offsetTop);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setAddress(mapPinMainElement.offsetLeft, mapPinMainElement.offsetTop);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  window.move = {
    onMoveListener: onMoveListener,
  };
})();
