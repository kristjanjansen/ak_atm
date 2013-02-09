var fs = require('fs');

var tako = require('tako')
var app = tako()
var five = require("johnny-five")

app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');

app.httpServer.listen(8000)


var states = {
  'front' : {
    'b1' : 'withdraw',
    'b2' : null,
    'b3' : null,
    'b4' : null
  },
  'withdraw' : {
    'b1' : null,
    'b2' : 'front',
    'b3' : null,
    'b4' : null
  }
}

var currentState = 'front'

var board = new five.Board();
var freq = 0

board.on("ready", function() {

  app.sockets.on('connection', function (socket) {

    app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        

    b1 = new five.Sensor({
      pin: "A0"
      , freq: freq
    });    

    b2 = new five.Sensor({
      pin: "A1"
      , freq: freq
    });

    b3 = new five.Sensor({
      pin: "A2"
      , freq: freq
    });
    
    b4 = new five.Sensor({
      pin: "A3"
      , freq: freq
    });
          
    b1.on("read", function(err, val) {
      if (val > 890) {
        currentState = states[currentState].b1 ? states[currentState].b1 : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      }
    });
    b2.on("read", function(err, val) {
      if (val > 890) {
        currentState = states[currentState].b2 ? states[currentState].b2 : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      }
    });
    b3.on("read", function(err, val) {
      if (val > 890) {
        currentState = states[currentState].b3 ? states[currentState].b3 : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      }
    });
    b4.on("read", function(err, val) {
      if (val > 890) {
        currentState = states[currentState].b4 ? states[currentState].b4 : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      }
    });

})

})
