'use strict';

var WIZARD_NAMES = ['Иван Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_AMOUNT = 4;

var simiralWizardList = document.querySelector('.setup-similar-list');
var simiralWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (array) {
  var max = array.length - 1;
  var i = Math.floor(Math.random() * (max + 1));
  return array[i];
};

var getWizards = function (amount) {
  var wizardsArray = [];
  for (var i = 0; i < amount; i++) {
    wizardsArray[i] = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    };
  }
  return wizardsArray;
};

var renderWizard = function (wizard) {
  var wizardElement = simiralWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var wizards = getWizards(WIZARDS_AMOUNT);

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

simiralWizardList.appendChild(getFragment());

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

// объявление кнопок

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// объявление элементов окна настройки персонажа

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupWizard = setup.querySelector('.setup-wizard');
var setupWizardCoatColor = setupWizard.querySelector('.wizard-coat');
var setupWizardEyesColor = setupWizard.querySelector('.wizard-eyes');
var setupWizardFireBallColor = setup.querySelector('.setup-fireball-wrap');
var setupUserNameInput = setup.querySelector('.setup-user-name');
var setupForm = setup.querySelector('.setup-wizard-form');
var setupSubmit = setup.querySelector('.setup-submit');
setupOpenIcon.tabIndex = 0;
setup.tabIndex = 0;
setupClose.tabIndex = 0;
setupSubmit.tabIndex = 0;

var openPopUp = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popUpEscPressHandler);
};
var closePopUp = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', popUpEscPressHandler);
};

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
  if (((evt.keyCode === ESC_KEYCODE && !setupUserNameInput.focused) || (evt.keyCode === ENTER_KEYCODE && setupClose.focused)) && !setup.classList.contains('hidden')) {
    closePopUp();
  }
});

// меняет цвет мантии персонажа на random

var coatClickHandler = function () {
  setupWizardCoatColor.style = 'fill: ' + getRandomElement(COAT_COLORS);
};

// меняет цвет глаз персонажа на random
var eyesClickHandler = function () {
  setupWizardEyesColor.style = 'fill: ' + getRandomElement(EYES_COLORS);
};

// меняет цвет фаербола на random
var fireBallClickHandler = function () {
  var FireBallColor = getRandomElement(FIREBALL_COLORS);
  setupWizardFireBallColor.style = 'background: ' + FireBallColor;
  setupWizardFireBallColor.querySelector('input[name=fireball-color]').value = FireBallColor;
};

// меняет цвет мантии персонажа на random при клике на мантию
setupWizardCoatColor.addEventListener('click', coatClickHandler);
// меняет цвет глаз персонажа на random при клике на глаза
setupWizardEyesColor.addEventListener('click', eyesClickHandler);
// меняет цвет фаербола на random при клике на фаербол
setupWizardFireBallColor.addEventListener('click', fireBallClickHandler);

// Отправляет данные формы по клику на кнопку сохранить
setupSubmit.addEventListener('click', function () {
  setupForm.submit();
});

// Отправляет данные формы при нажатии на enter и кнопки сохранить в фокусе
setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && !setup.classList.contains('hidden') && !setupSubmit.focused) {
    setupForm.submit();
  }
});
