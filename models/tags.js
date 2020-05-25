var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String
    },
    name: {
        type: String
    },
    display_name: {
        type: String
    },
    total: {
        type: Number
    }, recipes_feed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
       // unique: true
    }]

}, { timestamps: true });

module.exports = mongoose.model('Tags', tagSchema);
