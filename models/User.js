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
  zipcode: String,
  distance: String
 },
 petFavs: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }],
}, { timestamps: true });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
