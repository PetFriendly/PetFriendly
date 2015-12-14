var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Pet = require('./models/Pet');
var app = express();
var router = express.Router();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(methodOverride());


mongoose.connect('mongodb://localhost/pet_app');

/*Pet is going to send to route as /Pets
http methods are going to save to db collection pets*/
restify.serve( router, Pet);

app.use(router);

app.listen(3000, function () {
  console.log('Express server listening on port 3000')
});
