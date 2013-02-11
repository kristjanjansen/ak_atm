
var socket = io.connect();

socket.on('message', function (data) {
  console.log(data);
  $('#title').text(data.currentState)
  if (data.state.b1) {    
    $('#b1').removeClass('hidden').text(data.state.b1)
  } else {
    $('#b1').addClass('hidden')
  }

  if (data.state.b2) {    
    $('#b2').removeClass('hidden').text(data.state.b2)
  } else {
    $('#b2').addClass('hidden')
  }

  if (data.state.b3) {    
    $('#b3').removeClass('hidden').text(data.state.b3)
  } else {
    $('#b3').addClass('hidden')
  }

  if (data.state.b4) {    
    $('#b4').removeClass('hidden').text(data.state.b4)
  } else {
    $('#b4').addClass('hidden')
  }
  
});