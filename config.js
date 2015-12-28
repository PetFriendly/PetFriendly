module.exports = {
  dbURI: process.env.MONGOLAB_URI || 'mongodb://localhost/pet_app',
  apiRecordCount: '20',
  port: process.env.PORT || 3000,
  pfAPI: process.env.pfKey
};
