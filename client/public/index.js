document.addEventListener("DOMContentLoaded", function() {
// Start of document.ready

const socket = io.connect('http://localhost:5000');

// Query DOM
const message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.querySelector('#send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit Events
btn.addEventListener('click', function() {
    // Emit takes two parameters the name of the message and what the data your sending is.
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });

    message.value = '';
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p class="message-output"><strong>' + data.handle + ':</strong> ' + data.message + '</p><hr>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p class="alert-message"><em>' + data + ' is typing a message...</em></p>';
});

// End of document.ready
});