var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
 username: String,
 password: String,
 settings: {
  animal: String,
  sizes: String,
  sex: String,
  age: String,
  zipcode: String
 },
 petFavs: [{
    isFav: Boolean,
    name: String,
    pfId: String,
    description: String,
    age: String, //Not sure if string or number
    gender: String,
    siz: String,
    animal: String,
    contact: {
      //name: String, //not in API
      email: String,
      phone: String,
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String,
    },
    url: String,
    shelterId: String,
    photo1: String,
    photo2: String,
    photo3: String,
    options: {
      specialNeeds: String // add additional as new feature
    }
  }],
}, { timestamps: true });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
