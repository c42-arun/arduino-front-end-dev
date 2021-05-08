(function() {
    var socket = io();

    var redBlock = document.getElementById("red-block");
    var greenBlock = document.getElementById("green-block");

    redBlock.addEventListener("click", function(){
        var redClick = redBlock.classList.toggle("red-block-on");
        console.log('redClick', redClick);
        socket.emit('red', redClick + "_red");
    })

    greenBlock.addEventListener("click", function(){
        var greenClick = greenBlock.classList.toggle("green-block-on");
        console.log('greenClick', greenClick);
        socket.emit('green', greenClick + "_green");
    })
})()