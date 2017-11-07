var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var raspi = require('raspi');
var Serial = require('raspi-serial').Serial;
const readline = require('readline');
var os = require('os'), EOL = os.EOL;


function getUserInput(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Open valve time [ms]: ', (answer) => {
    console.log(`Opening valve for ${answer} ms`);
    rl.close();
    
    serial.write(answer+"\n");
  });
}


app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

var sio;

io.on('connection', function(socket){
  
  sio = socket;
  
  socket.on("dispense start", (amount) => {
    // 60 s / 50 ml = 1.2 s/ml = 1200 ms/ml
    amount = Math.round(amount*1200);
    console.log("Sending message to dispense for", amount, "ms to Arduino");
    serial.write(amount+"\n");
  })
  
});

var serial;

http.listen(3000, function(){
  //console.log('listening on *:3000');
});

var buffer = "";

raspi.init(() => {
  serial = new Serial({
    portId: '/dev/ttyACM0'
  });
  serial.open(() => {
    
    serial.on('data', (data) => {
      //process.stdout.write(data);
      buffer += data.toString('utf8');
      
      // End of message
      if(buffer.endsWith("\r\n")){
        // ADC reading
        if(buffer.startsWith("^A")){
          let val = buffer.substring(2, buffer.length-2);
          //console.log("ADC reading:", val);
          sio.emit("update pressure", val);
        }
        // Dispensing done
        if(buffer.startsWith("^D")){
          console.log("Dispensing done");
          sio.emit("dispense done");
        }
        // Reset buffer
        buffer = "";
      }
    });
  });
});
