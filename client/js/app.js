
var socket = io.connect();

socket.on('message', function (data) {
  console.log(data);
  $('#title').text(data.state)
  $('#b1').text(data.b1)
  $('#b2').text(data.b2)
  $('#b3').text(data.b3)
  $('#b4').text(data.b4)
});