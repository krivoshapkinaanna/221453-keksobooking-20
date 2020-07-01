'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;

  var addServerListener = function (xhr, onSuccess, onError) {

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT; // 10s
  };
  window.load = {
    load: function (url, onSuccess, onError) {
      var URL = 'https://javascript.pages.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      addServerListener(xhr, onSuccess, onError);
      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();

