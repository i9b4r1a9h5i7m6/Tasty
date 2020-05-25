var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Recipe = require('../models/recipe');
const axios = require("axios");
var recipeRouter = express.Router();
var request = require("request");


recipeRouter.route('/single/:id')
    .get(function (req, res, next) {
        console.log("slash id")
        Recipe.find({ id: req.params.id }, function (err, recipe) {
            if (err) console.log('Something wrong with MenuItems.get:shortName');
            console.log(recipe.length)
            if (recipe.length == 0) {
                //no recipe so get thAT FROM api AND INSERT 
                var options = {
                    method: 'GET',
                    url: 'https://tasty.p.rapidapi.com/recipes/detail',
                    qs: { id: req.params.id },
                    headers: {
                        'x-rapidapi-host': 'tasty.p.rapidapi.com',
                        'x-rapidapi-key': '3a98125177msh1da9a9e28db46d9p147846jsnbc2383ec8f18',
                        useQueryString: true
                    }
                };

                request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    Recipe.create(JSON.parse(body), function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");

                    });
                    res.json(JSON.parse(body))
                });

            }
            else {
                res.json(recipe)
            };

        });
    })

recipeRouter.get('/all/', function (req, res, next) {
    var request = require("request");
    console.log("slash")
    var options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        qs: { tags: '', from: '0', sizes: '1000' },
        headers: {
            'x-rapidapi-host': 'tasty.p.rapidapi.com',
            'x-rapidapi-key': '3a98125177msh1da9a9e28db46d9p147846jsnbc2383ec8f18',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        // console.log(JSON.parse(body));
        if (error) throw new Error(error);
        var as = JSON.parse(body)

        as.results.forEach(element => {


            Recipe.find({ id: element.id }, function (err, recipe) {
                if (err) console.log('Something wrong with MenuItems.get:shortName');
                console.log(recipe.length)
                if (recipe.length == 0) {
                    //no recipe so insert \
                    Recipe.create(element, function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");

                    });
                }
                else {
                    console.log("Already exists");
                };

            });




        });

        res.json(as.results)
    });
});








recipeRouter.get('/tag/', function (req, res, next) {
    var request = require("request");

    var options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        qs: { tags: req.query.tag, from: req.query.from, sizes: '20' },
        headers: {
            'x-rapidapi-host': 'tasty.p.rapidapi.com',
            'x-rapidapi-key': '3a98125177msh1da9a9e28db46d9p147846jsnbc2383ec8f18',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        // console.log(JSON.parse(body));
        if (error) throw new Error(error);
        var as = JSON.parse(body)

        as.results.forEach(element => {


            Recipe.find({ id: element.id }, function (err, recipe) {
                if (err) console.log('Something wrong with MenuItems.get:shortName');
                console.log(recipe.length)
                if (recipe.length == 0) {
                    //no recipe so insert \
                    Recipe.create(element, function (err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");

                    });
                }
                else {
                    console.log("Already exists");
                };

            });
        });
        res.json(as.results)
    });
});






module.exports = recipeRouter;