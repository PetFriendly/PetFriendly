
function MatchCtrl($scope, $rootScope, $http, queryPetFinderAPIService, favoritesService) {
  $scope.selected = 0;
  $scope.pet = {};
  var options = {
    settings: {}
  };

  console.log('Entering MatchCtrl....');
  if ($rootScope.session) {
    var user = $rootScope.session.user;
  }

  if (user) {
    console.log(user);
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
      console.log(pets);
      $scope.pets = pets;
    })
    .catch(function(error) {
      console.log("GET/POST error");
    });

    $scope.saveFavorite = function(pet, isFav) {
      
      $scope.selectNext = function (){
        $scope.selected = $scope.selected + 1
      };

      //No user logged in so don't attempt to save
      if (!user) { 
        $scope.selectNext();
        return;
      }

      favoritesService.savFavs(user._id, pet, isFav)  
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
    }
}

angular.module('starter.controllers')
    .controller( 'MatchCtrl', MatchCtrl );