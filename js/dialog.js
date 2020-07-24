'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
    .content.querySelector('.error');
  var successTemplate = document.querySelector('#success')
    .content.querySelector('.success');
  var errorMessage = errorTemplate.cloneNode(true);
  var successMessage = successTemplate.cloneNode(true);
  var errorMessageButton = errorMessage.querySelector('.error__button');
  var mainContainer = document.querySelector('main');

  var openErrorDialog = function (error) {
    errorMessage.querySelector('.error__message').textContent = error;
    mainContainer.appendChild(errorMessage);
    errorMessageButton.addEventListener('click', closeErrorDialog);
    document.addEventListener('keydown', closeErrorDialogByEsc);
  };

  var closeErrorDialog = function () {
    errorMessage.remove();
    errorMessage.removeEventListener('click', closeErrorDialogByClick);
    errorMessageButton.removeEventListener('click', closeErrorDialog);
    document.removeEventListener('keydown', closeErrorDialogByEsc);
  };

  var closeErrorDialogByEsc = function (evt) {
    if (evt.key === 'Escape') {
      closeErrorDialog(evt);
    }
  };
  var closeErrorDialogByClick = function (evt) {
    if (evt.target.classList.contains('error')) {
      closeErrorDialog(evt);
    }
  };
  var openSuccessDialog = function () {
    mainContainer.appendChild(successMessage);
    document.addEventListener('keydown', closeSuccessDialogByEsc);
  };

  var closeSuccessDialog = function () {
    successMessage.remove();
    document.removeEventListener('keydown', closeSuccessDialogByEsc);
  };

  var closeSuccessDialogByEsc = function (e) {
    if (e.key === 'Escape') {
      closeSuccessDialog(e);
    }
  };


  window.dialog = {
    openErrorDialog: openErrorDialog,
    openSuccessDialog: openSuccessDialog,
  };

})();

