'use strict';

(function () {

  window.getRandomElement = function (array) {
    var max = array.length - 1;
    var i = Math.floor(Math.random() * (max + 1));
    return array[i];
  };

})();
