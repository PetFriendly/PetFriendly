var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pet = new Schema({
  name: String,
  pfId: String,
  description: String,
  age: String, //Not sure if string or number
  gender: String,
  size: String,
  animal: String,
  contact: {
    name: String,
    email: String,
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
  },
  url: String,
  photo1: String,
  photo2: String,
  photo3: String,
  options: {
    specialNeeds: String // add additional as new feature
  }
}, { timestamps: true });

module.exports = mongoose.model('Pet', Pet);
