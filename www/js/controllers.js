angular.module('starter.controllers', [])

.controller('SettingsCtrl', function($scope, $rootScope, $http, $state) {
  console.log('Entering SettingsCtrl....');

  // $scope.settings = {};
  $scope.alert = '';
  var user;

  if ($rootScope.session && $rootScope.session.user) {
    console.log('user.session is OK');
    user = $rootScope.session.user;
    $scope.settings = user.settings;
    console.log('user.session is OK');
  } else {
    console.log('User session unavailable, route to login..');
    $state.go('login');
  }
  // if ($rootScope.session) {
  //   var user = $rootScope.session.user;
  // }
  console.log('SettingsCtrl..user', user);
  var initialized = false;
  var dirty = false;
  $scope.$watch('settings', function(newValue, oldValue){
    if (!initialized) {
      initialized = true;
      return;
    }
    dirty = true;
    console.log('is dirty', newValue, oldValue);
  }, true)
  $scope.$on('$destroy', function(){
    var settings = $scope.settings;
    $scope.alert = '';
    console.log('Settings dirty', dirty);
    if (!dirty) {
      return;
    }
    $http.put('/settings/' + user._id, {settings: settings}).
      success(function(data) {
        if (data.alert) {
          $scope.alert = data.alert;
        } else {
          // Login successful
          console.log('Save successful');
          console.log(data);
          // $rootScope.session = {}
          // $rootScope.session.user = data.user;
          //$state.go('tab.match', { reload: true });
        }
      }).
      error(function(err) {
        $scope.alert = 'Settings save failed'
        console.log(err);
      });
    console.log('Login pressed...');
  })
})


.controller('MatchCtrl', function($scope, $rootScope, $http, queryPetFinderAPIService, favoritesService) {
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
})

//AUTH PASSPORT
.controller('LoginCtrl', function($scope, $http, $state, $rootScope) {
  console.log('Entering LoginCtrl....');

  $scope.user  = {
    username: '',
    password: ''
  };
  $scope.alert = '';

  $scope.login = function(user){
    $scope.alert = '';
    console.log(user);
    $http.post('/login', user).
      success(function(data) {
        if (data.alert) {
          $scope.alert = data.alert;
        } else {
          // Login successful
          console.log('Login successful');
          console.log(data);
          $rootScope.session = {}
          $rootScope.session.user = data.user;
          $state.go('tab.match');
          console.log('exiting LoginCtrl')
        }
      }).
      error(function(err) {
        $scope.alert = 'Login failed'
        console.log(err);
      });
    console.log('Login pressed...');

  };

  $scope.register = function(user){
    $scope.alert = '';
    $http.post('/register', user).
      success(function(data) {
        if (data.alert) {
          $scope.alert = data.alert;
        } else {
          // Registration successful
          $rootScope.session = {}
          $rootScope.session.user = data.user;
          $state.go('tab.settings');
        }
      }).
      error(function() {
        $scope.alert = 'Registration failed'
      });
    console.log('Register pressed...');

  };

    // $scope.userinfo = function() {
    //     $http.get('/auth/currentuser').
    //         success(function (data) {
    //             $scope.loggeduser = data;
    //         }).
    //         error(function () {
    //             $location.path('/signin');
    //         });
    // }

  $scope.logout = function(){
    // $http.get('/auth/logout')
    //   .success(function() {
    //     $scope.loggeduser = {};
    //     $location.path('/signin');

    //   })
    //   .error(function() {
    //     $scope.alert = 'Logout failed'
    //   });
    console.log('Logout pressed...');
  };
})

// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })


// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })



.controller('FavoritesCtrl', function($scope, $rootScope, $state) {
  console.log('Entering FavoritesCtrl....');

  $scope.selected = 0;
  $scope.petFav = {};
  $scope.selectNext = function (){
    $scope.selected = $scope.selected + 1
  };

  if ($rootScope.session && $rootScope.session.user) {
    $scope.petFavs = $rootScope.session.user.petFavs;
    console.log($scope.petFavs);
  } else {
    console.log('User session unavailable, route to login..');
    $state.go('login');
  }
});
