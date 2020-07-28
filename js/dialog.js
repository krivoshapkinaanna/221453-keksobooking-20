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
    errorMessage.addEventListener('click', onErrorDialogClick);
    errorMessageButton.addEventListener('mousedown', function () {
      closeErrorDialog();
    });
    document.addEventListener('keydown', onErrorDialogEscPress);
  };

  var closeErrorDialog = function () {
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorDialogEscPress);
  };

  var onErrorDialogEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeErrorDialog(evt);
    }
  };
  var onErrorDialogClick = function (evt) {
    if (evt.target.classList.contains('error')) {
      closeErrorDialog(evt);
    }
  };
  var openSuccessDialog = function () {
    mainContainer.appendChild(successMessage);
    document.addEventListener('keydown', onSuccessDialogEscPress);
    successMessage.addEventListener('click', onSucessDialogClick);
  };

  var closeSuccessDialog = function () {
    successMessage.remove();
    document.removeEventListener('keydown', onSuccessDialogEscPress);
  };

  var onSuccessDialogEscPress = function (e) {
    if (e.key === 'Escape') {
      closeSuccessDialog(e);
    }
  };
  var onSucessDialogClick = function (e) {
    if (e.target.classList.contains('success')) {
      closeSuccessDialog(e);
    }
  };

  window.dialog = {
    openErrorDialog: openErrorDialog,
    openSuccessDialog: openSuccessDialog,
  };

})();

