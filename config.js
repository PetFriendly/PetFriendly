module.exports = {
  dbURI: process.env.MONGOLAB_URI || 'mongodb://localhost/pet_app',
  port: process.env.PORT || 3000,
  pfAPI: process.env.pfAPI,
  expressSecret: process.env.expressSecret
};
