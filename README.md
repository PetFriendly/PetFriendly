#PetFriendly

## Demo
For an active demo please visit http://petfriendly.herokuapp.com/

This app is still in development and is not meant for a production deployment. Do not reuse login information from other sites while testing.

##User Overview
PetFriendly is an application that helps people quickly browse nearby pets available for adoption. For the best experience it should be viewed on a mobile device or touch enabled device. If using on a desktop the user should adjust the window size to be smaller and be prepared for limited mouse/keyboard navigation.

###How it works

When the user registers they enter in a zip code and are then given the option of specifying the type of pet they would like to see. The zip code can be updated at any time. Zip code is required for matching to work

They are presented with a picture of a pet which they can click for additional pictures (if available) and click on 'Show Description' for additional info and adoption contact details as well as a link to petfinder. They can touch yes or swipe right to save the pet to a favorites list. Touching no or swiping left will remove the pet from showing in the app again.

Animals can be deleted from favorites list. They will not be shown again in the match view. A future feature will allow user to see a pet they have previously declined.

All pet data comes from www.petfinder.com through their API. This may result in certain fields being empty or appearing to have odd characters/grammer and is not an error in this application.

##Developer Notes:
Master Branch for large version changes
Dev if you are brave

###Third Party Integration

mention info about petfinder api and where to find out more.

Shout out to other projects that are helpful.

###Future Development
This app is under active development and we would love your help. Feel free to inform of bugs and submit pull requests.

###Known Bugs

###Future Features:

##How this app was built
1. describe node and express
  2. authorization, registration
  3. Proxy for API to avoid CORS
  4. Restify our own API
5. Ionic/Angular
   6. Few notes on Ionic

need to install ionic globally
ionic start appname template
navigate to app dir
install cordova globally
install ionic globally
'ionic serve' to test-server to browser
'ionic serve --lab' to test-server to iphone and android

   7. Few notes on Angular



##How to build and deploy yourself
This app requires Node.js and NPM(node package manager) installed globally if being deployed locally. visit https://nodejs.org/ for additional information.

This app utilizes MongoDB. You can either use a local database or a cloud deployment such as MongoLab. Mongo must be installed and running if you are using local.

###Setup Instructions
1. Clone this repository ```git clone https://github.com/PetFriendly/PetFriendly.git```
2. Change into the directory ```cd PetFriendly```
3. Add package dependencies using '''npm install```
4. (optional) Install Ionic Globally if you want to be able to test build using ```ionic serve``` by running ```npm install ionic -g```
5. Connect to a database
  a. If you want to use a local database:
    1. Set up local environment variable. Refer to your terminal documentation if not using default settings for OhMyZsh and Sublime:
    2. Navigate to root ```~```
    3. Open in Sublime ```subl ./zshrc```
    4. add following lines to file:
    ```# PetFriendly - Provide local access to MongoDB
    export PF_USE_LOCAL_DB=1```
    5. Open the config.js file and replace ```/dbstest``` with the database you would like to use
  b. If you want to use MongoLabs
    1. make a file titled '.env' in your root directory
    2. add code in the following format:
    ```mongodb://dbuser:dbpassword@host:port/dbname
    3. if you do not have this information check here https://devcenter.heroku.com/articles/mongolab#getting-your-connection-uri or in your MongoDB help documentation

TODO - DELETE ONCE EDITED
notes from HT
    Next you will need to open the configuration file config.js and add a valid mongo connetion to the dbURI porperty inside that file. The file should look like this. By default the app will make a local database.

    ```
    module.exports = {
      dbURI: process.env.MONGOLAB_URI || Your_Database
    };

    ```

Where 'database' is the authentication and database as specified by MongoLab. This will overwrite the default setting

6. This app requires a public API key from petfinder.
  a. You can get one free of charge by reading the terms of service and registering for an account at https://www.petfinder.com/developers/api-key.
  b. It is not recommended that you share this publically. You do not need to use the API Secret Key
  c. Some helpful info can be found in PetfinderFAQ.README as well as https://www.petfinder.com/developers/api-docs

TODO - EDIT THIS ONCE DONE

  d. Put your Petfinder API Token into .PFenv at root level which is included in .gitignore as a safety precaution when using GitHub

7. You can then run the application locally using ```npm start``` and navigating to 'localhost:3000'.

###Deploy to Heroku

PUTTING THIS SECTION TO THE SIDE FOR NOW - COME BACK

notes from hometap
Create an .env file in the root directory of the clone. The .env file should contain the following lines of code:

###Code Style and Directory Structire
1. We used jscs as our style and linting tool to maintain a common coding convention. Custom settings are included in .jscsrc in the root directory

2. The repo has the following directory structure. Not all files are shown in the individual directories. Self Explanatory configuration files in the root directory are also seletively listed. hooks, node_modules, www/lib are system folders and should not be modified without knowledge of how they work.

TODO - EDIT LATER OR REMOVE
```
PetFriendly
+-- models - Database Schemas
|   +-- stylesheets
|   +-- images
|   +-- javascript
|
+-- routes
+-- views
+-- models
+-- test
+--package.json
+--app.js
+--config.js
+--README.md
```

###Testing and Automation

EDIT OR REMOVE LATER
1. Mention how to run tests

From Hometap
Tests where created using mocha and chai/chai-http. All tests are contained in the test directory inside of the root directory. To run a test use the mocha command in the terminal along with the name of the test file.

To run the program locally you should use the debug command given in the package.json file. ```npm run debug```


2. Mention how to use gulp
3. Travis CI and git branching strategy

From Hometap
The code was developed using Travis CI and Gulp. The travis.yml file is located in the root directory of the repository along with the gulpfile that it executes.
