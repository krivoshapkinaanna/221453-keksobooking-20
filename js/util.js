'use strict';

(function () {
  window.util = {
    getRandom: function (min, max) { // cлучайное целое число включительно
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getRandomArray: function (array) { // случайное кол-во значений
      return array.slice(0, this.getRandom(1, array.length));
    }
  };
})();
