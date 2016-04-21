var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var port       = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./route/routes.js')(app);

app.listen(port);
console.log(Date.now(2016,4,17) + 86400000);
console.log(Date.now(2016,4,18) + 86400000);
console.log(Date.now(2016,4,19) + 86400000);
console.log('The App Shared Services runs at port: ' + port);
