'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupUserNameInput = window.setup.querySelector('.setup-user-name');
  var setupForm = window.setup.querySelector('.setup-wizard-form');
  var setupSubmit = window.setup.querySelector('.setup-submit');
  setupOpenIcon.tabIndex = 0;
  window.setup.tabIndex = 0;
  setupClose.tabIndex = 0;
  setupSubmit.tabIndex = 0;

  // Открытие окна настройки

  var openPopUp = function () {
    window.setup.classList.remove('hidden');
    document.addEventListener('keydown', popUpEscPressHandler);
  };

  // Закрытие окна настройки

  var closePopUp = function () {
    window.setup.classList.add('hidden');
    window.setup.style.top = window.defaultCoords.y;
    window.setup.style.left = window.defaultCoords.x;
    document.removeEventListener('keydown', popUpEscPressHandler);
  };

  // Отслеживает нажатие esc, закрывает диалог

  var popUpEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopUp();
    }
  };

  // Открываеет окно настройки персонажа по клику на юзерпик

  setupOpen.addEventListener('click', function () {
    openPopUp();
  });

  // Закрывает окно настройки персонажа по клику на крестик

  setupClose.addEventListener('click', function () {
    closePopUp();
  });

  // Открывает окно настройки персонажа по нажатию enter

  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopUp();
    }
  });

  // Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога
  // Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог .Если фокус находится на форме ввода имени, то окно закрываться не должно.

  document.addEventListener('keydown', function (evt) {
    if (((evt.keyCode === ESC_KEYCODE && !setupUserNameInput.focused) || (evt.keyCode === ENTER_KEYCODE && setupClose.focused)) && !window.setup.classList.contains('hidden')) {
      closePopUp();
    }
  });

  // Отправляет данные формы по клику на кнопку сохранить
  setupSubmit.addEventListener('click', function () {
    setupForm.submit();
  });

  // Отправляет данные формы при нажатии на enter и кнопки сохранить в фокусе
  setupSubmit.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE && !window.setup.classList.contains('hidden') && !setupSubmit.focused) {
      setupForm.submit();
    }
  });

  // Перетаскивание окна setup

  var defaultCoords = {
    x: '50%',
    y: '80px'
  };

  window.defaultCoords = defaultCoords;

  var setupDialog = window.setup.querySelector('.upload');

  setupDialog.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.style.top = (window.setup.offsetTop - shift.y) + 'px';
      window.setup.style.left = (window.setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          setupDialog.removeEventListener('click', onClickPreventDefault);
        };
        setupDialog.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
