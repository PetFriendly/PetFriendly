"use strict";

angular.module('starter')
  //http://api.petfinder.com/pet.find?format=json&key=f7940f8a4ac510a56c2b8bebbd6df0ce&animal=dog&location=97007&count=2
  .constant('API_ROUTE', 'http://api.petfinder.com/pet.find?format=json')
  .constant('API_KEY', '&key=f7940f8a4ac510a56c2b8bebbd6df0ce')
  .constant('OPTIONS', '&animal=dog&location=97007&count=10')
  .factory('PfApiService', PfApiService);

function PfApiService($http, API_ROUTE, API_KEY, OPTIONS) {
  return {
    getPets: function() {
      console.log('called getPets in service..');
      return $http.get(API_ROUTE+API_KEY+OPTIONS);
    }
  };
}
