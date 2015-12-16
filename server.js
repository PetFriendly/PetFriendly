var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');
var Pet = require('./models/Pet');
var dbURI = require('./config').dbURI;
var port = process.env.PORT || 3000;
var app = express();
var router = express.Router();

app.set('port', port);
app.set('env', process.env.NODE_ENV);

app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(methodOverride());

// Set PF_USE_LOCAL_DB=1 for local DB,
// otherwise use HEROKU MONGOLAB DB
if (process.env.PF_USE_LOCAL_DB == true) {
  mongoose.connect('mongodb://localhost/pet_app');
  console.log('Connecting to local database...');
} else {
  //mongoose.connect(process.env.MONGOLAB_URI);
  mongoose.connect(dbURI);
  console.log('Connecting to Heroku MongoLab database...');
}

/*Pet is going to send to route as /Pets
http methods are going to save to db collection pets*/
restify.serve( router, Pet);

app.use(router);

app.listen(port, function () {
  console.log('Express server listening on port', port)
});
