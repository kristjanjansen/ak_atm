
var socket = io.connect();

socket.on('message', function (data) {
  console.log(data);
  $('#title').text(data.state.title)
  if (data.state.b1.title) {    
    $('#b1').removeClass('hidden').text(data.state.b1.title)
  } else {
    $('#b1').addClass('hidden')
  }
  if (data.state.b2.title) {    
    $('#b2').removeClass('hidden').text(data.state.b2.title)
  } else {
    $('#b2').addClass('hidden')
  }
  if (data.state.b3.title) {    
    $('#b3').removeClass('hidden').text(data.state.b3.title)
  } else {
    $('#b3').addClass('hidden')
  }
  if (data.state.b4.title) {    
    $('#b4').removeClass('hidden').text(data.state.b4.title)
  } else {
    $('#b4').addClass('hidden')
  }
  
});