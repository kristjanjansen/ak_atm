var fs = require('fs');

var tako = require('tako')
var app = tako()
var keypress = require('keypress');

app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');

app.httpServer.listen(8000)

var states = require('./states').states

var currentState = 'Esileht'

  app.sockets.on('connection', function (socket) {

    app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        

    keypress(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('keypress', function (ch, key) {
      if (key && key.name == 'q') {
        currentState = states[states[currentState].b1.go] ? states[currentState].b1.go : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
       } 
      if (key && key.name == 'a') {
        currentState = states[states[currentState].b2.go] ? states[currentState].b2.go : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      } 
      if (key && key.name == 'w') {
        currentState = states[states[currentState].b3.go] ? states[currentState].b3.go : currentState
        app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      }
      if (key && key.name == 's') {
         currentState = states[states[currentState].b4.go] ? states[currentState].b4.go : currentState
         app.sockets.emit('message', {currentState: currentState, state: states[currentState]})        
      } 
      if (key && key.ctrl && key.name == 'c') {
        process.stdin.setRawMode(false);
        process.stdin.pause();
      }
    });
    

})


 
