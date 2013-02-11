
var socket = io.connect();

socket.on('message', function (data) {
  console.log(data);
  $('#title').text(data.currentState)
  if (data.state.b1.label) {    
    $('#b1').removeClass('hidden').text(data.state.b1.label)
  } else {
    $('#b1').addClass('hidden')
  }
  if (data.state.b2.label) {    
    $('#b2').removeClass('hidden').text(data.state.b2.label)
  } else {
    $('#b2').addClass('hidden')
  }
  if (data.state.b3.label) {    
    $('#b3').removeClass('hidden').text(data.state.b3.label)
  } else {
    $('#b3').addClass('hidden')
  }
  if (data.state.b4.label) {    
    $('#b4').removeClass('hidden').text(data.state.b4.label)
  } else {
    $('#b4').addClass('hidden')
  }
  
});