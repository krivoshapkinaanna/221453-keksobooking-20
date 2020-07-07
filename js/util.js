'use strict';

(function () {
  window.util = {
    getRandom: function (min, max) { // cлучайное целое число включительно
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
  };
})();
