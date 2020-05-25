var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var favicon = require('serve-favicon');
var authenticate = require('./authenticate');
var config = require('./config');
var cors = require('cors');
var helmet = require('helmet');
var multer = require('multer');
const cron = require("node-cron");
var Tag = require('./models/tags');
var Recipe = require('./models/recipe');
var Schema = mongoose.Schema;
var request = require("request");
// connect to db
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected correctly to server');
});


// require routers
var categoryRouter = require('./routes/categoryRouter');
var menuItemsRouter = require('./routes/menuItemsRouter');
var usersRouter = require('./routes/usersRouter');
var ordersRouter = require('./routes/ordersRouter');
var recipeRouter = require('./routes/recipeRouter');
var tagsRouter = require('./routes/tagsRouter');


var app = express();
app.set('port', (process.env.PORT || 8080));







app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(cors());
app.use(function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');
  next();
});

// passport config
app.use(passport.initialize());

// set up static routes
app.use(express.static(path.join(__dirname, 'public')));

// use routers
app.use('/categories', categoryRouter);
app.use('/menu_items', menuItemsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/recipe', recipeRouter);
app.use('/tags', tagsRouter);
// error handling
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});











var i = 0

//cron.schedule("0 */2 * * *", function () {
 //cron.schedule("*/15 * * * *", function () {
/*   console.log("running a task 2 hours");
  console.log(i);
  Recipe.find({}, function (err, recipies) {
    recipies.forEach(recipe => {
      console.log(recipe.id)
      recipe.tags.forEach(tag => {
        Tag.findOneAndUpdate({ id: tag.id }, { $addToSet: { recipes_feed: recipe._id } }, function (err, tagg) {
          if (err) throw err;
          //console.log(recipe._id)
          //console.log("working for" + i)
          i++;

        });

      })
    })

  });
});  */



