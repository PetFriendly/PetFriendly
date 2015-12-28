module.exports = {
  dbURI: process.env.MONGOLAB_URI || 'mongodb://localhost/pet_app',
  port : process.env.PORT || 3000
};
