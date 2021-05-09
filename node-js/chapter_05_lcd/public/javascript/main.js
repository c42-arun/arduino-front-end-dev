(function(){
    var socket = io();

    var sendTextButton = document.getElementById('send-text');
    sendTextButton.addEventListener("click", function(){
        var sendText = document.getElementById("input-text").value;
        console.log('sending text:', sendText);
        socket.emit('input-text', sendText);
    });
})();