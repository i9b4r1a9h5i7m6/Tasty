var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
const request = require('request');

var userRouter = express.Router();



// get all user info (admin only)
userRouter.get('/', Verify.verifyUser, Verify.verifyAdmin, function (req, res, next) {
	User.find({}, function (err, user) {
		if (err) console.log('Something wrong with user.find');
		res.json(user);
	});
});

// create new user (all)
userRouter.post('/register', function (req, res) {
	User.register(new User({ username: req.body.username, mnumber: req.body.mnumber, address: req.body.address }),
		req.body.password, function (err, user) {
			if (err) {
				return res.status(500).json({ err: err });
			}
			user.save(function (err, user) {
				passport.authenticate('local')(req, res, function () {
					//console.log(req);
					return res.status(200).json({ status: 'Sign Up Successfully!' });
				});
			});
		});
});

//updater zac
// create new user (all)
// userRouter.post('/updater', function(req, res){
// 	User.register(new User({username: req.body.username,mnumber: req.body.mnumber,address: req.body.address}),
// 	req.body.password, function(err, user){
// 		if(err){
// 			return res.status(500).json({err: err});
// 		}
// 		user.save(function(err, user){
// 			passport.authenticate('local')(req, res, function(){
// 				return res.status(200).json({status: 'Sign Up Successfully!'});
// 			});
// 		});
// 	});
// });

userRouter.route('/updater')
	.put(Verify.verifyUser, function (req, res, next) {

		User.findOneAndUpdate({ username: req.body.username }, { $set: req.body }, function (err, user) {
			if (err) console.log('Something wrong with addresschange');

			res.status(200).json({
				status: 'Address change',
				msg: 'You have changed the address',
				success: true,

				user: user


			});
		});

	});




// user login and logout
userRouter.post('/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({
				status: 'Incorrect information',
				msg: 'The username or password you entered was incorrect.'
			});
		}
		req.logIn(user, function (err) {
			if (err) {
				return res.status(500).json({
					err: 'Could not log in user'
				});
			}
			console.log('User in users: ', user);

			// generate token
			var token = Verify.getToken(user);

			res.status(200).json({
				status: 'Login Successful',
				msg: 'You have logged in successfully!',
				success: true,
				token: token,
				user: user
			});
		});
	})(req, res, next);
});




userRouter.get('/logout', function (req, res) {
	req.logout();
	res.status(200).json({
		status: 'Bye!'
	});
	// should also destroy the token
});


module.exports = userRouter;



/*userRouter.get('/verifyserver/:email/:token', function(req, res){
    console.log(req.params.email+req.params.token);

	res.status(200).json({

		status: 'OK!'
	});
});*/


/*userRouter.get('/verifyserver/:email/:token', function(req, res){
    console.log(req.params.email+req.params.token);
	var accessToken=req.params.token;
	 request(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`, function(err, reso, body) {  
       console.log(body);
	   console.log(reso);
	   if(err) {
				return res.status(500).json({
					err: 'Could not log in user'
				});
			}
        if(reso){

			res.status(200).json({status: 'OK!'});

		}
              });

	
});*/




/*userRouter.get('/verifyserver/:email/:token', function(req, res){
    console.log(req.params.email+req.params.token);
	var accessToken=req.params.token;
	 request(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`, function(err, response, body) {  
	   console.log(body);
	   console.log(response.statusCode);
	   var obj = JSON.parse(body);  
	   console.log(obj.email);
	  // console.log(body2.user_id);

	  // console.log(reso);
	  if(response.statusCode==400){
		  return res.status(400).json({
					err: 'Bad Request'
				});
	  }
	   if(err) {
				return res.status(500).json({
					err: 'Could not log in user'
				});
			}
        if(obj.email==req.params.email){

			res.status(200).json({status: 'OK!'});

		}
              });

	
});*/
/*User.register(new User({username: obj.email}),
	obj.email, function(err, user){
		if(err){
			return res.status(500).json({err: err});
			console.log("ineroro");
		}
		user.save(function(err, user){
			console.log("in222");
			passport.authenticate('local')(req, res, function(){
				console.log("in22277777777");
				return res.status(200).json({status: 'Sign Up Successfully!'});
			});
		});
	});*/



//res.status(200).json({status: 'OK!'});

/*
			userRouter.get('/verifyserver/:email/:token', function(req, res){
    console.log(req.params.email+req.params.token);
	var accessToken=req.params.token;
	 request(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`, function(err, response, body) {  
	   console.log(body);
	   console.log(response.statusCode);
	   var obj = JSON.parse(body);  
	   console.log(obj.email);
	  // console.log(body2.user_id);

	  // console.log(reso);
	  if(response.statusCode==400){
		  return res.status(400).json({
					err: 'Bad Request'
				});
	  }
	   if(err) {
				return res.status(500).json({
					err: 'Could not log in user'
				});
			}
        if(obj.email==req.params.email){     
			      User.findOne({username: obj.email},function(err, user){
	  	if(err) console.log('Something wrong with addresschange');
		  
	  	res.status(200).json({
				status: 'Address change',
				msg: 'You have changed the address',
				success: true,
				
				user: user


			});
		 });

	
	

		}
              });

	
});*/



userRouter.get('/verifyserver/:email/:token', function (req, res) {
	console.log(req.params.email + req.params.token);
	var accessToken = req.params.token;
	request(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`, function (err, response, body) {
		console.log(body);
		console.log(response.statusCode);
		var obj = JSON.parse(body);
		console.log(obj.email);

		if (response.statusCode == 400) {
			return res.status(400).json({
				err: 'Bad Request'
			});
		}
		if (err) {
			return res.status(500).json({
				err: 'Could not log in user'
			});
		}

		if (obj.email == req.params.email) {
			User.findOne({ username: obj.email }, function (err, user) {
				if (err) console.log('Something wrong with user find');
				console.log(user);
				if (!user || user == 'null') {
					User.register(new User({ username: obj.email, mnumber: req.body.mnumber, address: req.body.address }),
						accessToken, function (err, user) {
							console.log("in here");
							if (err) {
								return res.status(500).json({ err: err });
							}
							user.save(function (err, user) {
								console.log("in here");
								var token = Verify.getToken(user);
								res.status(200).json({
									status: 'Account created',
									msg: 'You have logged in successfully!',
									success: true,
									token: token,
									user: user
								});

							});
						});
				}
				else {
					var token = Verify.getToken(user);
					res.status(200).json({
						status: 'Login Successful',
						msg: 'You have logged in successfully!',
						success: true,
						token: token,
						user: user
					});
				}
			});




		}

		else {
			return res.status(400).json({
				err: 'Bad Request'
			});

		}
	});


});