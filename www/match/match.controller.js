function filterPhotos(pets) {
  var photos = [];

  pets.forEach(function(pet) {
    if (pet.media && pet.media.photos) {
      photos = pet.media.photos.photo.filter(function(pic) {
          return (pic['@size'] === 'x');
      });
      pet.media.photos.photo = photos.slice();
    }
  });
  return;
}

function callAPIService($scope, $rootScope, user, options, apiRecordCount,
                          queryPetFinderAPIService, $ionicGesture, $ionicSlideBoxDelegate) {
  queryPetFinderAPIService.getPets(options)
    .then(function(data) {
      if (!data.pets) {
        $scope.alert = 'You\'ve run out of pets! Try changing your settings.';
        return;
      } else {
        //Save only original 'x' photos returned from API
        filterPhotos(data.pets);
        $scope.petsRemaining.count = data.pets.length;
      }

      if (user) {
        $scope.selected = 0; //reset after successful API call
        // If sends back same # records as requested,
        // API reload is required
        if (data.pets.length === apiRecordCount) {
          $rootScope.session.apiReload = true;
        } else {
          $rootScope.session.apiReload = false;
        }
        // console.log('pets.length = ', data.pets.length);
        // console.log('apiRecordCount = ', apiRecordCount);
        // console.log('$rootScope.session.apiReload = ', $rootScope.session.apiReload);

        //filter the below search to only show pets that do not already exist in DB
        var dbIds = [];
        user.petFavs.forEach(function(el) {
          dbIds.push(el.pfId);
        });
        $scope.pets = data.pets.filter(function(element) {
          return dbIds.indexOf(element.id.$t) == -1;
        });
        $scope.petsRemaining.count = $scope.pets.length;
        $rootScope.session.apiOffset = data.offset.$t;
        options.offset = data.offset.$t;
        // console.log($scope.pets);
        // console.log('petsRemaining = ', $scope.petsRemaining.count);
        // console.log('apiOffset = ', $rootScope.session.apiOffset);
        // console.log('filtered results from petfinder:');
        // for (var i = 0; i < $scope.pets.length; i++) {
        //   console.log('FILTERED PET NAME : ', i, $scope.pets[i].name.$t);
        // }

        if ($scope.petsRemaining.count === 0 && $rootScope.session.apiReload) {
          callAPIService($scope, $rootScope, user, options, apiRecordCount, queryPetFinderAPIService);
        }

      } else {
        // console.log('unfiltered query results from petfinder:');
        // console.log(data.pets);
        $scope.pets = data.pets;
      }

    })
    .catch(function(error) {
      // console.log('GET/POST error');
    });
}

function MatchCtrl($scope, $rootScope, $http, queryPetFinderAPIService,
                    API_RECORD_COUNT, favoritesService, $ionicSlideBoxDelegate) {
  $scope.selected = 0;
  $scope.photoSelected = 0;
  $scope.pet = {};
  $scope.alert = '';
  $scope.petsRemaining = {
    count: 0
  };
  var options = {
    settings: {}
  };
  var user;

  // console.log('Entering MatchCtrl....');
  // console.log('petRemaining', $scope.petsRemaining);

  if ($rootScope.session) {
    user = $rootScope.session.user;
    //$scope.petsRemaining.apiReload = $rootScope.session.apiReload;
  }

  if (user) {
    // console.log(user);
    options.settings.animal = user.settings.animal;
    options.settings.sizes = user.settings.sizes;
    options.settings.sex = user.settings.sex;
    options.settings.age = user.settings.age;
    options.settings.zipcode = user.settings.zipcode;
    options.offset = $rootScope.session.apiOffset;
    // console.log(options);
  } else {
    //Initialize all setting to blank srings
    var options = {
      settings: {
        animal: '',
        sizes: '',
        sex: '',
        age: '',
        zipcode: '97024'
      },
      offset: ''
    };
  }

  if ($rootScope.session && $rootScope.session.apiReload === true) {
    callAPIService($scope, $rootScope, user, options, API_RECORD_COUNT, queryPetFinderAPIService);
  }

  $scope.photoNext = function(pet) {
    $scope.photoSelected = $scope.photoSelected + 1
    if ($scope.photoSelected === pet.media.photos.photo.length) {
      $scope.photoSelected = 0;
    }
    // console.log('photoSelected = ', $scope.photoSelected);
  };

  $scope.saveFavorite = function(pet, isFav) {

    $scope.selectNext = function() {
      $scope.selected = $scope.selected + 1;
      $scope.petsRemaining.count--;
      $scope.photoSelected = 0;
      // console.log('petsRemaining = ', $scope.petsRemaining.count);
    };

    //No user logged in so don't attempt to save
    if (!user) {
      $scope.selectNext();
      return;
    }

    favoritesService.savFav(user._id, pet, isFav)
      .success(function(data) {
        if (data.alert) {
          $scope.alert = data.alert;
        } else {
          // Login successful
          // console.log('Save favorite successful');
          // console.log(data);
          $rootScope.session.user = data.user;
        }
      })
      .error(function(err) {
        $scope.alert = 'Settings save failed';
        console.log(err);
      });

    $scope.selectNext();
    // console.log('pets.length =', $scope.pets.length);
  };

  $scope.$watch('petsRemaining.count', function(newValue, oldValue) {
    if ($scope.petsRemaining.count === 0 && $rootScope.session.apiReload === true) {
      // console.log('Ready to call API again!!!!');
      options.offset = $rootScope.session.apiOffset;
      // console.log('offset = ', options.offset);
      callAPIService($scope, $rootScope, user, options, API_RECORD_COUNT, queryPetFinderAPIService);
    } else if ($scope.petsRemaining.count === 0) {
      $scope.alert = 'You\'ve run out of pets! Try changing your settings.';
    }
  }, true);

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
    $ionicSlideBoxDelegate.update();
  };

}

angular.module('pfApp.controllers')
    .controller('MatchCtrl', MatchCtrl);
