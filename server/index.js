var raspi = require('raspi');
var Serial = require('raspi-serial').Serial;

var buffer = 0;
var counter = 0;
var length = 100;
var mean = 0;

raspi.init(() => {
  var serial = new Serial({
    portId: '/dev/ttyAMA0'
  });
  serial.open(() => {
    serial.on('data', (data) => {
      process.stdout.cursorTo(0);
      process.stdout.clearLine();
      process.stdout.write(data);
      //console.log(data);
      //buffer += Number(data);
      //counter++;

      //if(counter > length){
        //mean = buffer/length;
        //process.stdout.cursorTo(0);
        //process.stdout.clearLine();
        //process.stdout.write(mean.toString());
        //counter = 0;
        //buffer = 0;
      //};
    });
  });
});
