# PetFriendly
Web application to match users with adoptable pets in their area.

###DB setup
To setup local database for application, set PF_USE_LOCAL_DB environment variable. For example, in zsh:
```
export PF_USE_LOCAL_DB=1
```
Otherwise, the application will use Heroku MongoLab database.

###Local Build

You can build this app with a local database. Clone the repo and install dependencies with:

```
npm i
```
Open the config.js file and you will see: 

```
module.exports = {
  dbURI: process.env.MONGOLAB_URI || 'mongodb://localhost/dbstest'
};
```
Replace '/dbstest' with the path of your own mongolab database connection



