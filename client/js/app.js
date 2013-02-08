
var socket = io.connect();

socket.on('message', function (data) {
  console.log(data);
  $('#title').text(data.currentState)
  $('#b1').text(data.state.b1)
  $('#b2').text(data.state.b2)
  $('#b3').text(data.state.b3)
  $('#b4').text(data.state.b4)
});