'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var WIZARD_NAMES = ['Иван Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия' , 'Люпита' ,'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var simiralWizardList = document.querySelector('.setup-similar-list');
var simiralWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomElement = function (array) {
  var max = array.length -1;
  var i = Math.floor(Math.random() * (max + 1)) ;
  return array[i];
};

var getWizards = function (amount) {
  var wizardsArray = [];
  for (var i = 0; i < amount; i++) {
    wizardsArray[i] = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    }
    console.log(wizardsArray[i])
  }
  return wizardsArray;
};

var renderWizard = function (wizard) {
  var wizardElement = simiralWizardTemplate.cloneNode(true);
  console.log(wizardElement );
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

var wizards = getWizards(4);
console.log(wizards);

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
simiralWizardList.appendChild(fragment);

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');



