'use strict';
(function () {
  var mapElement = document.querySelector('.map');
  var MAP_OFFSET_LEFT = ((mapElement.clientLeft) - window.pin.mapPinWidth / 2);
  var MAP_OFFSET_RIGHT = ((mapElement.clientWidth) - window.pin.mapPinWidth / 2);
  var MAP_OFFSET_TOP = 130 - window.pin.fullMapPinHeight;
  var MAP_OFFSET_BOTTOM = 630 - window.pin.fullMapPinHeight;

  var mapPinMain = document.querySelector('.map__pin--main');
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
      if (mapPinMain.offsetLeft - shift.x >= MAP_OFFSET_LEFT && mapPinMain.offsetLeft - shift.x <= MAP_OFFSET_RIGHT) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if (mapPinMain.offsetTop - shift.y >= MAP_OFFSET_TOP && mapPinMain.offsetTop - shift.y <= MAP_OFFSET_BOTTOM) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      window.form.setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
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
