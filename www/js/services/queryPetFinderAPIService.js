"use strict";

angular.module('starter')
  //original API
  //http://api.petfinder.com/pet.find?format=json&key=f7940f8a4ac510a56c2b8bebbd6df0ce&animal=dog&location=97007&count=2
  .constant('API_ROUTE', '/pfapi/pets')
  .factory('queryPetFinderAPIService', queryPetFinderAPIService);

function queryPetFinderAPIService($http, API_ROUTE) {
  return {
    getPets: function(options) {
      console.log('called getPets in service..');
      //count defaults to 25 records. distance commented out until tested and added to user model
      return $http.get(API_ROUTE +
        '?location=' + options.zipcode +
        '&animal=' + options.settings.animal +
        '&size=' + options.settings.size +
        '&sex=' + options.settings.sex +
        '&age=' + options.settings.age
        //'&distance=' + currentUser.settings.distance
      );
    }
  };
}
