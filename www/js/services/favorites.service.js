"use strict";

function mapPetAPIParmsToFavs(pet, isFav) {
  var favorite = {}; 
  favorite.contact = {};
  favorite.options = {};

  favorite.isFav = isFav;
  favorite.name = pet.name.$t;
  favorite.age = pet.age.$t;
  favorite.pfId = pet.id.$t;
  favorite.description = pet.description.$t;
  favorite.age = pet.age.$t; //Not sure if string or number
  favorite.gender = pet.sex.$t;
  favorite.siz = pet.size.$t;
  favorite.animal = pet.animal.$t;
  favorite.contact.email = pet.contact.email.$t;
  favorite.contact.phone = pet.contact.phone.$t;
  favorite.contact.address1 = pet.contact.address1.$t;
  favorite.contact.address2 = pet.contact.address2.$t;
  favorite.contact.city = pet.contact.city.$t;
  favorite.contact.state = pet.contact.state.$t;
  favorite.contact.zip = pet.contact.zip.$t;
  favorite.url = ''; //NOT sure what this is
  favorite.shelterId = pet.shelterId.$t;
  favorite.photo1 = pet.media.photos.photo[0].$t;
  favorite.photo2 = pet.media.photos.photo[1].$t;
  favorite.photo3 = pet.media.photos.photo[2].$t;

  return favorite;
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
