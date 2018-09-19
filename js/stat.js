'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_GAP = 20;
var SIDE_GAP = 55;
var COLUMN_WIDTH = 40;
var COLUMN_MAX_HIGHT = 150;
var COLUMN_GAP = 50;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxTime = function (times) {
  var maxElement = times[0];
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxElement) {
      maxElement = times[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxTime(times);
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', CLOUD_X + GAP, CLOUD_Y + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + TEXT_GAP * 2);

  for (var i = 0; i < names.length; i++) {
    var coloumnHeight = (COLUMN_MAX_HIGHT * times[i]) / maxTime;
    var randColor = Math.random();
    var columnColor = '';

    if (names[i] === 'Вы') {
      columnColor = 'rgba(255, 0, 0, 1)';
    } else {
      columnColor = 'rgba(10, 26, 199, ' + randColor + ')';
    }

    ctx.fillText(Math.round(times[i]), CLOUD_X + SIDE_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, (CLOUD_HEIGHT - GAP) - TEXT_GAP - coloumnHeight - GAP);
    ctx.fillStyle = columnColor;
    ctx.fillRect(CLOUD_X + SIDE_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, (CLOUD_HEIGHT - GAP) - TEXT_GAP, COLUMN_WIDTH, -coloumnHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + SIDE_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - GAP);
  }

};

