'use strict';

(function () {

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');
  var WIZARD_NAMES = ['Иван Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_AMOUNT = 4;

  var simiralWizardList = document.querySelector('.setup-similar-list');
  var simiralWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var setupWizard = window.setup.querySelector('.setup-wizard');
  var setupWizardCoatColor = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyesColor = setupWizard.querySelector('.wizard-eyes');
  var setupWizardFireBallColor = window.setup.querySelector('.setup-fireball-wrap');

  // Получает количество волшебников и создает массив с данными волшебников

  var getWizards = function (amount) {
    var wizardsArray = [];
    for (var i = 0; i < amount; i++) {
      wizardsArray[i] = {
        name: window.getRandomElement(WIZARD_NAMES) + ' ' + window.getRandomElement(WIZARD_SURNAMES),
        coatColor: window.getRandomElement(COAT_COLORS),
        eyesColor: window.getRandomElement(EYES_COLORS)
      };
    }
    return wizardsArray;
  };

  // создает разметку волшебника

  var renderWizard = function (wizard) {
    var wizardElement = simiralWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var wizards = getWizards(WIZARDS_AMOUNT);

  // создает фрагмент со всеми волшебниками
  var getFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    return fragment;
  };

  // Вставляет фрагмент с волшебниками в разметку

  simiralWizardList.appendChild(getFragment());

  // меняет цвет мантии персонажа на random

  var coatClickHandler = function () {
    setupWizardCoatColor.style = 'fill: ' + window.getRandomElement(COAT_COLORS);
  };

  // меняет цвет глаз персонажа на random
  var eyesClickHandler = function () {
    setupWizardEyesColor.style = 'fill: ' + window.getRandomElement(EYES_COLORS);
  };

  // меняет цвет фаербола на random
  var fireBallClickHandler = function () {
    var FireBallColor = window.getRandomElement(FIREBALL_COLORS);
    setupWizardFireBallColor.style = 'background: ' + FireBallColor;
    setupWizardFireBallColor.querySelector('input[name=fireball-color]').value = FireBallColor;
  };

  // меняет цвет мантии персонажа на random при клике на мантию
  setupWizardCoatColor.addEventListener('click', coatClickHandler);
  // меняет цвет глаз персонажа на random при клике на глаза
  setupWizardEyesColor.addEventListener('click', eyesClickHandler);
  // меняет цвет фаербола на random при клике на фаербол
  setupWizardFireBallColor.addEventListener('click', fireBallClickHandler);

})();
