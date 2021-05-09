var http = require('http')
var express = require('express')
var app = express()
var server = http.createServer(app)
var io = require('socket.io')(server)

var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');
var port = new SerialPort('COM5', {
    baudRate: 9600
});
var parser = port.pipe(new Readline());
port.on('open', function() {
    console.log('Serial port opened');
});
port.on('error', function(err) {
    console.error('SerialPort error: ', err.message);
})

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index');
});

io.on('connection', function(socket) {
    console.log('socket.io connection');

    socket.on('input-text', function(data) {
        console.log('Data received', data);
        port.write(data + 'T');
    });

    socket.on('disconnect', function(){
        console.log('disconnected');
    });
});

server.listen(3000, function(){
    console.log('listening on port 3000');
});