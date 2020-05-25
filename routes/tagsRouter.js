var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Tag = require('../models/tags');
var Recipe = require('../models/recipe');
var tagsRouter = express.Router();
const axios = require("axios");

var request = require("request");

tagsRouter.route('/')
    // get the list of all categories (all users)
    .get(function (req, res, next) {



        var options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/tags/list',
            headers: {
                'x-rapidapi-host': 'tasty.p.rapidapi.com',
                'x-rapidapi-key': '3a98125177msh1da9a9e28db46d9p147846jsnbc2383ec8f18'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var as = JSON.parse(body)

            as.results.forEach(element => {
                Tag.create(element, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");

                });

            })
            res.json(as.results)
        })

    })
// create new category (admin only)


var i = 0
tagsRouter.route('/job')
    // get the list of all categories (all users)

    .get(function (req, res, next) {
        Recipe.find({}, function (err, recipies) {
            recipies.forEach(recipe => {
                recipe.tags.forEach(tag => {
                    Tag.findOneAndUpdate({ id: tag.id }, { $addToSet: {recipes_feed:recipe._id} }, function (err, tagg) {
                        if (err) throw err;
                        console.log(recipe._id)
                        console.log("working for" + i)
                        i++;

                    });

                })
            })
            res.json(recipies[0].id)
        });
    })

module.exports = tagsRouter;