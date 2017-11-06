var SVG = require('svg.js');
var socket = require('socket.io-client')();

require("semantic-ui-css/semantic.min.css");
require("./styles.css");

var draw = SVG('drawing');
draw.viewbox(0, -5, 50, 110);
var rect = draw.rect(45, 97.5).attr({ fill: '#4286f4' }).dx(2.5);
var polyline = draw.polyline([0,0, 0,100, 50,100, 50,0]).fill('none').stroke({ width: 5, color: '#eee', linecap: 'round', linejoin: 'round' });

socket.on('connect', () => {
  console.log('connected');
});

socket.on('update pressure', (pressure) => {
  console.log(pressure);
  let newHeight = 97.5/1024*pressure;
  let newY = 97.5-newHeight;
  rect.animate().height(newHeight).attr('y', newY);
  //rect.animate().attr('y', newY);
});
