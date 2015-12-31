#PetFriendly

## Demo
For an active demo please visit http://petfriendly.herokuapp.com/

This app was developed as a proof of concept. While functional, it is still in development and has not been thoroughly tested for security. Therefore please use throwaway login/password info while testing. Do not reuse important login credentials from gmail/facebook, banking sites, etc.

##User Overview
PetFriendly is an application that helps people quickly browse and save nearby pets available for adoption. For the best experience please view on a mobile phone or touch enabled device. If using on a desktop the user should adjust the window size to be smaller and be prepared for limited mouse/keyboard navigation.

###How it works

Upon registering user enters zip code and is taken to options tab to specify the type of pet they would like to see in match results. Zip code can be updated at any time. It is required for matching to work.

User can click picture of the pet for additional pictures (if available) and click on 'Show Description' for additional info, adoption contact details and a link to petfinder. They can touch 'Yes' or swipe right on the picture to save to a favorites list. Touching 'No' or swiping left will remove the pet from showing in the app again.

Pets can be deleted from favorites list. They will not be shown again in the match view. A future feature will allow user to see pets they have previously declined.

##Developer Notes
Currently at v1.0.0 in 'Master' branch. 'Dev' will be primary branch for newest experimental features. Major changes will be noted here.

###Release history/Change Log
12/30/15 - v1.0.0 released to master branch

###Petfinder Integration
All pet data comes from www.petfinder.com through their public API. This may result in certain fields being empty or appearing to have odd characters/grammar and is not an error in this application.

please refer to https://www.petfinder.com/developers/api-docs for additional help regarding utilizing the API.

###Future Development
This app is under active development and we would love your help. Feel free to inform of bugs and submit pull requests.

##Build details
1. npm package express-request-proxy used to query petfinder API from server to avoid CORS errors.
2. If you would like to build for mobile platforms you may need to install ionic and cordova globally.
3. npm package passport used for local login


##How to build and deploy yourself
This app requires Node.js and NPM(node package manager) installed globally if being deployed locally. visit https://nodejs.org/ for additional information.

This app utilizes MongoDB. You can either use a local database or a cloud deployment such as MongoLab. Mongo must be installed and running if you are using local.

###Setup Instructions
1. Clone this repository ```git clone https://github.com/PetFriendly/PetFriendly.git```
2. Change into the directory ```cd PetFriendly```
3. Add package dependencies using ```npm install```
4. Set local environmental variables:
  1. in root directory create a file called '.env'
  2. This app requires a public API Token from petfinder.com. Read terms of service and register for a free API Token at https://www.petfinder.com/developers/api-key
  3. enter in ```pfAPI='replaceWithYourPetFinderAPIToken';```
  4. (optional) on a new line enter in ```PORT=3000;``` replacing 3000 with the port you would like to use
  5. To generate hashes for express sessions enter in a secret key phrase on a new line using the format ```expressSecret='Your Secret Phrase'```

5. Connect to database:
  1. Local mongo database
    1. open the config.js file and replace '/pet_app' with the database you would like to use
  2.  Mongolabs database
    1. add following line to your .env file, replacing dbuser, dbpassword, host, port, and dbname with the appropriate information
    2. ```MONGOLAB_URI='mongodb://dbuser:dbpassword@host:port/dbname'```
    3. if database is connected through heroku check https://devcenter.heroku.com/articles/mongolab#getting-your-connection-uri.
    4. if connected through mongolab directly navigate to https://mongolab.com/databases/yourDBNamehere
  6. You can then run the application locally using ```npm start``` and navigating to 'localhost:YourChosenPort'.

###Code Style and Directory Structire
1. We used jscs as our style and linting tool to maintain a common coding convention. Custom settings are included in .jscsrc in the root directory

2. The repo has the following directory structure. Not all files are shown in the individual directories. Self Explanatory configuration files in the root directory are also seletively listed. hooks, node_modules, www/lib are system folders and should not be modified without knowledge of how they work.

```
PetFriendly
+-- models/User.js - contains database schema for a user and the pet information that will be stored
+-- routes/index.js - creates routes used for login and register pages as well as get/post routes used to update DB
+-- scss/ionic.app.scss - base styles and custom styles
+-- test/
+-- www/
  +-- auth/, favorites/, match/, settings/ - directory for each view containing associated controllers and templates
  +-- js - services dir, main controllers
    +-- app.js - entry point for app
  +-- templates/ - contains main template for the 'tabs' layer of abstraction
  +--index.html - primary html document
+-- .env - for storing sensitive information - included in .gitignore for safety
+-- package.json
+-- config.js - correlates with .env to provide info to server.js
+-- gulpfile.js - for building and testing
+-- server.js - server instructions
```

