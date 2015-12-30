"use strict";

angular.module('pfApp')
  //original API
  //http://api.petfinder.com/pet.find?format=json&key=f7940f8a4ac510a56c2b8bebbd6df0ce&animal=dog&location=97007&count=2
  .constant('API_ROUTE', '/pfapi/pets')
  .constant('API_RECORD_COUNT', 50)
  .factory('queryPetFinderAPIService', queryPetFinderAPIService);

function queryPetFinderAPIService($http, API_ROUTE, API_RECORD_COUNT) {
  return {
    getPets: function(options) {
      // console.log('?location=' + options.settings.zipcode +
      //   '&animal=' + options.settings.animal +
      //   '&size=' + options.settings.sizes +
      //   '&sex=' + options.settings.sex +
      //   '&age=' + options.settings.age +
      //   '&count=' + API_RECORD_COUNT +
      //   '&offset=' + options.offset);
      return $http.get(API_ROUTE +
        '?location=' + options.settings.zipcode +
        '&animal=' + options.settings.animal +
        '&size=' + options.settings.sizes +
        '&sex=' + options.settings.sex +
        '&age=' + options.settings.age + 
        '&count=' + API_RECORD_COUNT +
        '&offset=' + options.offset
      ).then( function(response){
        // console.log(response);
        // API will return array (pet[]) if more than 1 pet,
        // will return pet Object if 1 pet found,
        // pet is undefined if NO pets 
        if (!Array.isArray(response.data.petfinder.pets.pet)) {
          // console.log("API RETURNED NOT ARRAY");
          if (typeof response.data.petfinder.pets.pet === 'object') {
            // console.log("API RETURNED 1 OBJECT PET");
            //convert to array
            var petArray = [response.data.petfinder.pets.pet];
            response.data.petfinder.pets.pet = petArray;
          }
        }
        return {
          pets: response.data.petfinder.pets.pet,
          offset: response.data.petfinder.lastOffset
        };
      });
    }
  };
}
