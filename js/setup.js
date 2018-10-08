'use strict';

(function () {

  window.getRandomElement = function (array) {
    var max = array.length - 1;
    var i = Math.floor(Math.random() * (max + 1));
    return array[i];
  };

  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

})();
