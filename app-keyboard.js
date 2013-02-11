var fs = require('fs');

var tako = require('tako')
var app = tako()
var keypress = require('keypress');

app.route('/').file(__dirname + '/client/index.html');
app.route('/*').files(__dirname + '/client');

app.httpServer.listen(8000)

var states = {
  'Esileht' : {
    'b1' : { label:'Keel', go: 'Keel' },
    'b2' : { label:'Kaardi tagastamine', go: 'Esileht' },
    'b3' : { label:'Sularaha', go: 'Sularaha' },
    'b4' : { label:'Kontojääk', go: 'Kontojääk' },  
  },
  'Keel' : {
    'b1' : { label:'Eesti', go: 'Esileht' },
    'b2' : { label:'English', go: 'Esileht' },
    'b3' : { label:'Pусский', go: 'Esileht' },
    'b4' : { label:'Suomi', go: 'Esileht' },  
  },
  'Sularaha' : {
    'b1' : { label: '5 EUR', go: 'Raha kättesaamine' },
    'b2' : { label:'20 EUR', go: 'Raha kättesaamine' },
    'b3' : { label:'50 EUR', go: 'Raha kättesaamine' },
    'b4' : { label:'Muu summa', go: 'Raha kättesaamine' },  
  },
  'Kontojääk' : {
    'b1' : { label: null, go: null },
    'b2' : { label:'Katkesta', go: 'Esileht' },
    'b3' : { label:'Paberil', go: 'Ekraanil' },
    'b4' : { label:'Ekraanil', go: 'Ekraanil' },  
  },
  'Raha kättesaamine' : {
    'b1' : { label: null, go: null },
    'b2' : { label:'Katkesta', go: 'Esileht' },
    'b3' : { label: null, go: null},
    'b4' : { label: null, go: null },  
  },  
  'Ekraanil' : {
    'b1' : { label: null, go: null },
    'b2' : { label:'Katkesta', go: 'Esileht' },
    'b3' : { label: null, go: null},
    'b4' : { label: null, go: null },  
  },
}

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


 
