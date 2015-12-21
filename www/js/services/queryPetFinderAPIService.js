"use strict";

angular.module('starter')
  //original API
  //http://api.petfinder.com/pet.find?format=json&key=f7940f8a4ac510a56c2b8bebbd6df0ce&animal=dog&location=97007&count=2
  .constant('API_ROUTE', '/pfapi/pets')
  .factory('queryPetFinderAPIService', queryPetFinderAPIService);

function queryPetFinderAPIService($http, API_ROUTE) {
  return {
    getPets: function(options) {
      console.log('?location=' + options.settings.zipcode +
        '&animal=' + options.settings.animal +
        '&size=' + options.settings.sizes +
        '&sex=' + options.settings.sex +
        '&age=' + options.settings.age + 
        '&offset=' + options.offset);
      return $http.get(API_ROUTE +
        '?location=' + options.settings.zipcode +
        '&animal=' + options.settings.animal +
        '&size=' + options.settings.sizes +
        '&sex=' + options.settings.sex +
        '&age=' + options.settings.age + 
        '&offset=' + options.offset
      ).then( function(response){
        console.log(response);
        return {
          pets: response.data.petfinder.pets.pet,
          offset: response.data.petfinder.lastOffset
        };
      });
    }
  };
}
