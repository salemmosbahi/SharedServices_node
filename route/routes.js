var encryption	= require('./encryption');
var country = require('controllers/country');
var user	= require('controllers/user');

module.exports = function(app){

  app.get('/', function(req, res) {
		res.end('Shared Services Project');
	});

  app.post('/getAllCountry',function(req,res){
		country.getAllCountry(function(found){
			res.json(found);
		});
	});

	app.post('/getAllCity',function(req,res){
		var name = req.body.name;
		country.getAllCity(name,function(found){
			res.json(found);
		});
	});

	app.post('/signup',function(req,res){
		var key = encryption.key(req.body.key);
    var picture = req.body.picture;
		var fname = encryption.decode(req.body.fname,key);
		var lname = encryption.decode(req.body.lname,key);
		var gender = encryption.decode(req.body.gender,key);
		var dateN = encryption.decode(req.body.dateN,key);
		var country = encryption.decode(req.body.country,key);
		var city = encryption.decode(req.body.city,key);
		var email = encryption.decode(req.body.email,key);
		var password = encryption.decode(req.body.password,key);
		var phone = encryption.decode(req.body.phone,key);
    var driver = (encryption.decode(req.body.driver,key) == "true") ? true : false;
    user.signup(picture,fname,lname,gender,dateN,country,city,email,password,phone,driver,function(found){
      res.json(found);
    });
	});

	app.post('/login',function(req,res){
		var key = encryption.key(req.body.key);
		var email = encryption.decode(req.body.email,key);
		var password = encryption.decode(req.body.password,key);
    user.login(email,password,function(found){
      res.json(found);
    });
	});

  app.post('/profile',function(req,res){
		var token = req.body.token;
    user.profile(token,function(found){
      res.json(found);
    });
	});
}
