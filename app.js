var fs = require('fs');

var tako = require('tako')
var app = tako()
var five = require("johnny-five")

app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');

app.httpServer.listen(8000)

var states = require('./states').states
var currentState = 'PIN'

var board = new five.Board();
var freq = 400

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
        currentState = states[states[currentState].b1.go] ? states[currentState].b1.go : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      }
    });
    b2.on("read", function(err, val) {
      if (val > 890) {
        currentState = states[states[currentState].b2.go] ? states[currentState].b2.go : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      }
    });
    b3.on("read", function(err, val) {
      if (val > 890) {
        currentState = states[states[currentState].b3.go] ? states[currentState].b3.go : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      }
    });
    b4.on("read", function(err, val) {
      if (val > 890) {
        currentState = states[states[currentState].b4.go] ? states[currentState].b4.go : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      }
    });

})

})


 
