var encryption	= require('./encryption');
var country = require('controllers/country');
var user	= require('controllers/user');
var car	= require('controllers/car');
var download	= require('controllers/download');
var demand	= require('controllers/demand');

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

  app.post('/logout',function(req,res){
  		var token = req.body.token;
      user.logout(token,function(found){
        res.json(found);
      });
  	});

  app.post('/profile',function(req,res){
		var token = req.body.token;
    var service = req.body.service;
    if (service === '') {
      user.profile(token,function(found){
        res.json(found);
      });
    } else {
      user.profileVisitor(token,service,function(found){
        res.json(found);
      });
    }
	});

  /********* Car Start *********/
  app.post('/getCarEnd',function(req,res){
    var country = req.body.country;
    var depart = req.body.depart;
		car.getCarEnd(country,depart,function(found){
			res.json(found);
		});
	});

  app.post('/getCar',function(req,res){
    var country = req.body.country;
    var depart = req.body.depart;
    var destination = req.body.destination;
    var date = req.body.date;
    var status = req.body.status;
    var goingComing = req.body.goingComing;
    var highway = req.body.highway;
		car.getCar(country,depart,destination,date,status,goingComing,highway,function(found){
			res.json(found);
		});
	});

  app.post('/addCar',function(req,res){
    var model = req.body.model;
    var description = req.body.description;
    var country = req.body.country;
    var depart = req.body.depart;
    var destination = req.body.destination;
    var date = req.body.date;
    var time = req.body.time;
    var goingComing = req.body.goingComing;
    var highway = req.body.highway;
    var place = req.body.place;
		var token = req.body.token;
    var username = req.body.username;
		car.addCar(model,description,country,depart,destination,date,time,goingComing,highway,place,token,username,function(found){
			res.json(found);
		});
	});

  app.post('/getCarProfile',function(req,res){
		var id = req.body._id;
		car.getCarProfile(id,function(found){
			res.json(found);
		});
	});

  app.post('/completeCar',function(req,res){
		var idService = req.body._id;
		var token = req.body.token;
		car.completeCar(idService,token,function(found){
			res.json(found);
		});
	});
  /********* Car End *********/

  /********* Download Start *********/
  app.post('/getDownloadEnd',function(req,res){
    var country = req.body.country;
    var city = req.body.city;
		download.getDownloadEnd(country,city,function(found){
			res.json(found);
		});
	});

  app.post('/getDownload',function(req,res){
    var name = req.body.name;
    var date = req.body.date;
    var country = req.body.country;
    var city = req.body.city;
    var status = req.body.status;
    //console.log(name + ' ' + date + ' ' + country + ' ' + city + ' ' + status);
		download.getDownload(name,date,country,city,status,function(found){
			res.json(found);
		});
	});

  app.post('/addDownload',function(req,res){
    var picture = req.body.picture;
    var name = req.body.name;
    var size = req.body.size;
		var token = req.body.token;
    var username = req.body.username;
    var date = req.body.date;
    var city = req.body.city;
    var country = req.body.country;
		download.addDownload(picture,name,size,token,username,date,city,country,function(found){
			res.json(found);
		});
	});

  app.post('/getDownloadProfile',function(req,res){
		var id = req.body._id;
		download.getDownloadProfile(id,function(found){
			res.json(found);
		});
	});

  app.post('/completeDownload',function(req,res){
		var idService = req.body._id;
		var token = req.body.token;
		download.completeDownload(idService,token,function(found){
			res.json(found);
		});
	});
  /********* Download End *********/

  /********* Demand Start *********/
  app.post('/boxList',function(req,res){
		var token = req.body.token;
		demand.boxList(token,function(found){
			res.json(found);
		});
	});

  app.post('/checkDemand',function(req,res){
		var idService = req.body._id;
		var token = req.body.token;
		demand.checkDemand(idService,token,function(found){
			res.json(found);
		});
	});

  app.post('/addDemand',function(req,res){
		var service = req.body.service;
		var idService = req.body._id;
		var name = req.body.name;
		var token = req.body.token;
		var username = req.body.username;
    var date = req.body.date;
    var usernameMain = req.body.usernameMain;
		demand.addDemand(service,idService,name,token,username,date,usernameMain,function(found){
			res.json(found);
		});
	});

  app.post('/boxUsersList',function(req,res){
		var idService = req.body._id;
		demand.boxUsersList(idService,function(found){
			res.json(found);
		});
	});

  app.post('/changeStatus',function(req,res){
		var service = req.body.service;
    var idService = req.body.idService;
    var status = req.body.status;
		var tokenMain = req.body.tokenMain;
		var tokenVisitor = req.body.tokenVisitor;
		var usernameVisitor = req.body.usernameVisitor;
    var ageVisitor = req.body.ageVisitor;
		if (status == 'accept') {
			demand.acceptDemand(service,idService,tokenMain,tokenVisitor,usernameVisitor,ageVisitor,function(found){
				res.json(found);
			});
		} else if (status == 'refuse') {
			demand.refuseDemand(idService,tokenMain,tokenVisitor,function(found){
				res.json(found);
			});
		}
	});

  app.post('/count',function(req,res){
		var token = req.body.token;
		demand.count(token,function(found){
			res.json(found);
		});
	});
  /********* Demand End *********/
}
