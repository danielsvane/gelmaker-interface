var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var raspi = require('raspi');
var Serial = require('raspi-serial').Serial;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

io.on('connection', function(socket){
  
  // setInterval(() => {
  //   socket.emit('update pressure', Math.random()*1024);
  // }, 2000);
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

raspi.init(() => {
  var serial = new Serial({
    portId: '/dev/ttyACM0'
  });
  serial.open(() => {
    serial.on('data', (data) => {
      process.stdout.write(data);
    });
  });
});
