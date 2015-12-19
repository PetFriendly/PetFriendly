"use strict";

function mapPetAPIParmsToFavs(pet, isFav) {
  var petFav = {}; 
  petFav.contact = {};
  petFav.options = {};

  petFav.isFav = isFav;
  petFav.name = pet.name.$t;
  petFav.age = pet.age.$t;
  petFav.pfId = pet.id.$t;
  petFav.description = pet.description.$t;
  petFav.age = pet.age.$t; //Not sure if string or number
  petFav.gender = pet.sex.$t;
  petFav.siz = pet.size.$t;
  petFav.animal = pet.animal.$t;
  petFav.contact.email = pet.contact.email.$t;
  petFav.contact.phone = pet.contact.phone.$t;
  petFav.contact.address1 = pet.contact.address1.$t;
  petFav.contact.address2 = pet.contact.address2.$t;
  petFav.contact.city = pet.contact.city.$t;
  petFav.contact.state = pet.contact.state.$t;
  petFav.contact.zip = pet.contact.zip.$t;
  petFav.url = ''; //NOT sure what this is
  petFav.shelterId = pet.shelterId.$t;
  petFav.photo1 = pet.media.photos.photo[0].$t;
  petFav.photo2 = pet.media.photos.photo[1].$t;
  petFav.photo3 = pet.media.photos.photo[2].$t;

  return petFav;
}

angular.module('starter')
  .factory('favoritesService', favoritesService);

function favoritesService($http) {
  return {
    savFavs: function(id, pet, isFav) {
      var petFav = mapPetAPIParmsToFavs(pet, isFav); 
      console.log(petFav);

      return $http.put('/favorites/' + id, {petFav: petFav}); 
    }
  };
}
