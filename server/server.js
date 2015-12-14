var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Pet = require('./models/Pet');
var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://localhost/pet_app');

restify.serve(router, Pet);

app.use(router);

app.listen(3000, function () {
  console.log('Express server listening on port 3000')
});