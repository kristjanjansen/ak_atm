var fs = require('fs');

var tako = require('tako')
var app = tako()
var keypress = require('keypress');

app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');

app.httpServer.listen(8000)

var states = require('./states').states

var currentState = 'PIN'

  app.sockets.on('connection', function (socket) {

    app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        

    keypress(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('keypress', function (ch, key) {
      if (key && key.name == 'q') {
        sendMessage('b1')
       } 
      if (key && key.name == 'a') {
        sendMessage('b2')
      } 
      if (key && key.name == 'w') {
        sendMessage('b3')
      }
      if (key && key.name == 's') {
        sendMessage('b4')
      } 
      if (key && key.ctrl && key.name == 'c') {
        process.stdin.setRawMode(false);
        process.stdin.pause();
      }
    });
    

})


function sendMessage(key) {
  
  var states = require('./states').states
  
  currentState = states[states[currentState][key].go] ? states[currentState][key].go : currentState
  app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
  if (states[currentState].timer) {
    setTimeout(function() {
      currentState = states[states[currentState].timer.go] ? states[currentState].timer.go : currentState
      app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
    }, states[currentState].timer.time)
  } 
} 
