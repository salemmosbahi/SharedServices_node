var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var port       = process.env.PORT || 4000;

//app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./route/routes.js')(app);
require('./route/sockets.js')(io);

http.listen(port);
console.log('The App Shared Services runs at port: ' + port);
