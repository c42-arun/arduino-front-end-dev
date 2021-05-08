var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render('index');
});

var port = new SerialPort('COM5', {
    baudRate: 9600
});
var parser = port.pipe(new Readline());

port.on('error', function(err) {
    console.error('SerialPort error: ', err.message);
})

port.on('open', function() {
    console.log('Serial port opened');
});

io.on('connection', function(socket) {
    console.log('socket.io connection');
    parser.on('data', function(data) {
        data = data.trim();
        socket.emit('data', data);
        console.log('Serial port data:', data);
    })

    socket.on('disconnect', function() {
        console.log('disconnected');
    });
});

server.listen(3000, function() {
    console.log('listening on port 3000');
});