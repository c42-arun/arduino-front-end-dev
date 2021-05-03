var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var title = "Some Arduino components starting with p"
var componentArray = ['potentiometer', 'piezo', 'phototransistor', 'pushbutton'];

app.get('/', function(req, res) {
    res.render('index');
});

var buttonValue = 0;

io.on('connection', function(socket){
    console.log('Connection to client established');
    
    io.emit('clicked message', buttonValue); // for new connections to push current value

    socket.on('clicked message', function(msg) {
        buttonValue = 1 - buttonValue;
        io.emit('clicked message', buttonValue);
        console.log('Received message from client!', msg);
    });

    socket.on('disconnect', function(){
        console.log('Server has disconnected');
    });
});

server.listen(3000, function() {
    console.log('Listening on port 3000...');
});