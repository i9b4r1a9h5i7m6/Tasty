var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Orders = require('../models/orders');

var Verify = require('./verify');

var ordersRouter = express.Router();

//gmail
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
var smsOwl = require("smsowl");


var result;
var tota = 0;
var name = "";
var name2 = "";

smsOwl.configure({
	accountId: "API5147370494",
	apiKey: "x@#yv>$(H=FS*NAz"
});




/*var transporter = nodemailer.createTransport({

    service:'gmail',
    auth:{
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'zairatrumboo11@gmail.com',
            clientId:'849196386347-0vrn96g1k8jcvbb426qgckdjh4d0hsut.apps.googleusercontent.com',
            clientSecret:'FHfjWVXxsxJzkZM0QdCbrYD0',
            refreshToken:'1/03LBM_7oeRxyhfWQ4OufQFMs9BuTSQqIJkwBZlhGE9k'
        })
    }
})*/


const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: 'go7mart@gmail.com',
		clientId: '149363860178-pn67oh65humgtkrbko4ki1u9iaj69ihm.apps.googleusercontent.com',
		clientSecret: 'pa-InBszAdRI4gfbP4zYIJVk',
		refreshToken: '1/yPGhDcSmo9qcG-yYrHLe25U-wb8qrwoH5iBTY0SseZc',
		accessToken: 'ya29.Gls8BJumxWFQaS2ITh7jzW0Xf2NLfsEj7v7Uu66MGAQqUiPqhckCt9hbi3TeUXhMtXeG9yqo89Lc2M2YxZM-4MJsXaYq-a8cEJvQUF2tXUfgN_Pegwvafn4gQFP5',
	},
});


var mailOptions = {
	from: 'Go7Mart <go7mart@gmail.com>',
	to: 'go7mart@gmail.com',
	subject: 'Order placed',
	text: 'Your Order has been successfully placed'
}

//gmail
ordersRouter.route('/')
	// get a list of all orders (admin only)
	.get(Verify.verifyUser, Verify.verifyAdmin, function (req, res, next) {
		Orders.find({ status: 'complete' }, function (err, orders) {
			if (err) console.log('Something wrong with Orders.find');
			res.json(orders);
		}).sort({ createdAt: -1 });
	});


var firstMethod = function (res) {
	var promise = new Promise(function (resolve, reject) {
		setTimeout(function () {

			Orders.findById(result._id).populate('placedBy', { 'username': 1, 'address': 1, 'mnumber': 1 }).exec(function (err, users) {
				if (err) console.log('Something wrong with Orders.findById');
				var tota = 0;
				var name = "";
				var name2 = "";
				for (i = 0; i < users.contents.length; i++) {
					tota = tota + users.contents[i].totalPrice;
					name = name + " " + users.contents[i].dishName + " " + users.contents[i].dishDesc + "==>" + users.contents[i].itemNumber;
					name2 = name2 + " " + users.contents[i].dishShortName + ">" + users.contents[i].itemNumber;
					console.log("tota" + tota);
				}

				console.log(users);
				var mailOptions1 = {
					from: 'Go7Mart <go7mart@gmail.com>',
					to: users.placedBy[0].username,
					subject: 'Order placed with id: ' + users._id,
					text: 'Your Order has been successfully placed for Rs.' + tota
				}
				var mailOptions = {
					from: 'go7mart <go7mart@gmail.com>',
					to: 'go7mart <go7mart@gmail.com>',
					subject: 'Order placed with id: ' + users._id,
					text: 'An order has been placed by ' + users.placedBy[0].username + " " + users.placedBy[0].address + " Number:" + users.placedBy[0].mnumber + " " + name +
						" Rs." + tota
				}
				transporter.sendMail(mailOptions, function (err, res) {
					if (err) {
						console.log(err);
					} else {
						console.log('Email Sent');

					}
				});
				transporter.sendMail(mailOptions1, function (err, res) {
					if (err) {
						console.log(err);
					} else {
						console.log('Email Sent');

					}
				});
				/*smsOwl.sendTransactionalSms("smsala","91"+users.placedBy[0].mnumber,"null","Your Order: ["+users._id+ "] has been placed for Rs."+users.contents[0].totalPrice,function(error,result){
                  if(error){
					  console.log(error);
                 // Handle Error
                   }else{console.log("sms sent");
				   console.log(result);
                 // Handle success
                   }
                   });*/
				smsOwl.sendTransactionalSms("GO7MRT", "918484015916", "null", "Order placed by " + users.placedBy[0].address + " Number:" + users.placedBy[0].mnumber + " " + name2 +
					" Rs." + tota, function (error, result) {
						if (error) {
							console.log(error);
							// Handle Error
						} else {
							console.log("sms sent for admin");
							console.log(result);
							// Handle success
						}
					});
				//resolve.json(users);
			});
			// parse str into an object        
			//  console.log('The orders '+result.length);
			// console.log(result[0].total);		 
			// for(i = 0; i < result.length; i++){
			//    tota= tota+ parseInt(result[i].total, 10);
			//                                    }
			//  console.log("total = " + tota);										   
			//console.log(result);
			resolve({ data: '123' });
		}, 0);
	});
	return promise;
};

ordersRouter.route('/incomings')
	// get a list of incoming orders (admin only)
	.get(function (req, res, next) {
		Orders.find({ status: { $ne: 'complete' } }, function (err, orders) {
			if (err) console.log('Something wrong with Orders.find incoming');
			//console.log(res.json(orders));
			///var obj = JSON.parse(orders);
			//console.log(orders);

			res.json(orders);
			//res.json(orders);
		}).sort({ createdAt: -1 });
	});

ordersRouter.route('/incoming')
	// get a list of incoming orders (admin only)
	.get(Verify.verifyUser, Verify.verifyAdmin, function (req, res, next) {
		Orders.find({ status: 'placed' }).populate('placedBy', { 'username': 1, 'address': 1, 'mnumber': 1 }).sort({ createdAt: -1 }).exec(function (err, users) {
			res.json(users);
		});
	});


ordersRouter.route('/:userId')
	// view order list of a specific user (user + admin)
	.get(Verify.verifyUser, function (req, res, next) {
		Orders.find({ placedBy: req.params.userId }, function (err, orders) {
			if (err) console.log('Something wrong with Orders.find({placedBy: req.params.userId}');
			res.json(orders);
		}).limit(100).sort({ createdAt: -1 });
	})
	// place new order (user)
	.post(Verify.verifyUser, function (req, res, next) {
		req.body.placedBy = req.decoded._doc._id;
		if (req.body.total < 150) { res.status(401).json({ status: 'M', msg: 'The minimum order is 150.' }); return; }
		Orders.create(req.body, function (err, order) {
			if (err) console.log('Something wrong with Orders.create');
			result = order;
			res.json(order);
		}).then(firstMethod);

		//code for gmail

	});


ordersRouter.route('/:userId/:orderId')
	// view an order from a specific user (user + admin)
	.get(Verify.verifyUser, function (req, res, next) {
		Orders.findById(req.params.orderId, function (err, order) {
			if (err) console.log('Something wrong with Orders.findById');
			res.json(order);
		});
	})
	// update a specific order (user + admin)
	.put(Verify.verifyUser, function (req, res, next) {
		Orders.findByIdAndUpdate(
			req.params.orderId,
			{ $set: req.body },
			{ new: true },
			function (err, order) {
				if (err) console.log('Something wrong with Orders.findByIdAndUpdate');
				res.json(order);
			});
	});


module.exports = ordersRouter;