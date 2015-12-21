function MatchCtrl($scope, $rootScope, $http, queryPetFinderAPIService, favoritesService) {
  $scope.selected = 0;
  $scope.pet = {};
  $scope.petsRemaining = {
    count: -1,
    apiReload: false
  };
  var options = {
    settings: {}
  };

  console.log('Entering MatchCtrl....');
  if ($rootScope.session) {
    var user = $rootScope.session.user;
  }

  if (user) {
    //console.log(user);
    options.settings.animal = user.settings.animal;
    options.settings.sizes = user.settings.sizes;
    options.settings.sex = user.settings.sex;
    options.settings.age = user.settings.age;
    options.settings.zipcode = user.settings.zipcode;
    console.log(options);
  } else {
    //Initialize all setting to blank srings
    var options = {
      settings: {
        animal: '',
        sizes: '',
        sex: '',
        age: '',
        zipcode: "97024"
      }
    }
  }

  queryPetFinderAPIService.getPets(options)
    .then(function(pets) {
      if (user) {
        // If sends back same # records as requested,
        // API reload is required
        // length is num and apiRecordCount is string so use ==
        if (pets.length == $rootScope.session.apiRecordCount) {
          $scope.petsRemaining.apiReload = true;
        }
        console.log('pets.length = ', pets.length);
        console.log('$rootScope.session.apiRecordCount = ', $rootScope.session.apiRecordCount);
        console.log('$scope.petsRemaining.apiReload = ', $scope.petsRemaining.apiReload);
        //filter the below search to only show pets that do not already exist in DB
        var dbIds = [];
        user.petFavs.forEach(function(el){
          dbIds.push(el.pfId)
        })
        //console.log($scope.dbIds)
        $scope.pets = pets.filter(function(element){
          return dbIds.indexOf(element.id.$t) == -1;
        })
        $scope.petsRemaining.count = $scope.pets.length;
        console.log($scope.pets);
        console.log('petsRemaining = ', $scope.petsRemaining.count);
        console.log("filtered results from petfinder:");
      } else {
        console.log("unfiltered query results from petfinder:");
        console.log(pets);
        $scope.pets = pets;
        $scope.petsRemaining.count = $scope.pets.length;
        console.log('petsRemaining = ', $scope.petsRemaining.count);
      };

    })
    .catch(function(error) {
      console.log("GET/POST error");
    });

  $scope.saveFavorite = function(pet, isFav) {

    $scope.selectNext = function (){
      $scope.selected = $scope.selected + 1
      $scope.petsRemaining.count--;
      console.log('petsRemaining = ', $scope.petsRemaining.count);
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
          console.log('Save successful');
          console.log(data);
          $rootScope.session.user = data.user;
          //$state.go('tab.match', { reload: true });
          //$state.go('tab.match');
        }
      })
      .error(function(err) {
        $scope.alert = 'Settings save failed'
        console.log(err);
      });

    $scope.selectNext();
    console.log('pets.length =', $scope.pets.length);
  }

  $scope.$watch('petsRemaining.count', function(newValue, oldValue){
    if ($scope.petsRemaining.count === 0 && $scope.petsRemaining.apiReload === true) {
      console.log('Ready to call API again!!!!');
    }
  }, true);
}

angular.module('starter.controllers')
    .controller( 'MatchCtrl', MatchCtrl );
