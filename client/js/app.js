
var socket = io.connect();

socket.on('message', function (data) {
  console.log(data);
  $('#title').text(data.currentState)
  $('#b1').text(data.state.b1 ? data.state.b1 : 'b1')
  $('#b2').text(data.state.b2 ? data.state.b2 : 'b2')
  $('#b3').text(data.state.b3 ? data.state.b3 : 'b3')
  $('#b4').text(data.state.b4 ? data.state.b4 : 'b4')
});