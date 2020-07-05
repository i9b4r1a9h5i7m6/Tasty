var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	mnumber: {
		type: String,
	
	},
	address: {
		type: String
	},
	otp:{
		type:Number
	},
	verified:{
		type:Boolean,
		default:false
	},
	password: String,
	admin: {
		type: Boolean,
		default: false
	}, fav_feed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
       // unique: true
	}]
	, lastViewed_feed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
       // unique: true
    }]
}, {timestamps: true});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
