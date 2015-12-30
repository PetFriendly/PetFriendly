"use strict";

function mapPetAPIParmsToFavs(pet, isFav) {
  var favorite = {};
  favorite.contact = {};
  favorite.options = {};
  favorite.isFav = isFav;
  favorite.name = pet.name ? pet.name.$t : '';
  favorite.pfId = pet.id ? pet.id.$t : '';
  favorite.description = pet.description ? pet.description.$t : '';
  favorite.age = pet.age ? pet.age.$t : '';
  favorite.gender = pet.gender ? pet.gender.$t : '';
  favorite.siz = pet.size ? pet.size.$t : '';
  favorite.animal = pet.animal ? pet.animal.$t : '';

  if (pet.contact) {
    favorite.contact.email = pet.contact.email ? pet.contact.email.$t : '';
    favorite.contact.phone = pet.contact.phone ? pet.contact.phone.$t : '';
    favorite.contact.address1 = pet.contact.address1 ? pet.contact.address1.$t : '';
    favorite.contact.address2 = pet.contact.address2 ? pet.contact.address2.$t : '';
    favorite.contact.city = pet.contact.city ? pet.contact.city.$t : '';
    favorite.contact.state = pet.contact.state ? pet.contact.state.$t : '';
    favorite.contact.zip = pet.contact.zip ? pet.contact.zip.$t : '';
  }

  favorite.url = 'www.petfinder.com/petdetail/' + favorite.pfId;
  favorite.shelterId = pet.shelterId ? pet.shelterId.$t : '';

  if (pet.media && pet.media.photos) {
    favorite.photo1 = pet.media.photos.photo[0] ? pet.media.photos.photo[0].$t : '';
    favorite.photo2 = pet.media.photos.photo[1] ? pet.media.photos.photo[1].$t : '';
    favorite.photo3 = pet.media.photos.photo[2] ? pet.media.photos.photo[2].$t : '';
   }

  return favorite;
}

angular.module('pfApp')
  .factory('favoritesService', favoritesService);

function favoritesService($http) {
  return {
    savFav: function(id, pet, isFav) {
      var petFav = mapPetAPIParmsToFavs(pet, isFav);
      // console.log('petFav in savFav:', petFav);

      return $http.put('/favorite/add/' + id, {petFav: petFav});
    },
    deleteFav: function(id, petFav) {
      petFav.isFav = false;
      // console.log('petFav in deleteFav:', petFav);

      return $http.put('/favorite/update/' + id, {petFav: petFav});
    }
  };
}
