angular.module('starter.controllers', [])

.controller('SettingsCtrl', function($scope) {})

.controller('DetailsCtrl', function($scope, $rootScope, $http, queryPetFinderAPIService) {

  $scope.pet = {};
  console.log('Entering DetailsCtrl....');
  if ($rootScope.session) {
    var user = $rootScope.session.user;
  }
  var options = {
    zipcode: "97204",
    settings: {
      animal: "",
      size: "",
      sex: "",
      age: ""
    }
  };

  if (user) {
    options.zipcode = user.zipcode || "97204";
    options.settings.animal = user.settings.animal;
    options.settings.size = user.settings.size;
    options.settings.sex = user.settings.sex;
    options.settings.age = user.settings.age;
  }

  queryPetFinderAPIService.getPets(options)
    .then(function(response) {
      console.log("GET success");
      console.log(response);
      //build stack of cards

      // create empty pets array
      var pets = [];

      // add pets objects to pets array
      pets = response.data.petfinder.pets.pet;

      // loop through pets array, extract prop/val from each pet object
      // ex: for ( var i=0; i < pets.length; i++ )
      // in your loop, grab pets[i] - unless you need a hardcoded sub object

      console.dir(pets);
      $scope.pet.name = pets[0].name.$t;
      $scope.pet.age = pets[0].age.$t;
      $scope.pet.photo1 = pets[0].media.photos.photo[2].$t;
      $scope.pet.description = pets[0].description.$t;

    })
    .catch(function(error) {
      console.log("GET/POST error");
    });
})

.controller('MatchCtrl', function($scope, $rootScope, $http, queryPetFinderAPIService) {

  $scope.pet = {};
  console.log('Entering MatchCtrl....');
  if ($rootScope.session) {
    var user = $rootScope.session.user;
  }
  var options = {
    zipcode: "97204",
    settings: {
      animal: "",
      size: "",
      sex: "",
      age: ""
    }
  };

  if (user) {
    options.zipcode = user.zipcode || "97204";
    options.settings.animal = user.settings.animal;
    options.settings.size = user.settings.size;
    options.settings.sex = user.settings.sex;
    options.settings.age = user.settings.age;
  }

  queryPetFinderAPIService.getPets(options)
    .then(function(response) {
      console.log("GET success");
      console.log(response);
      //build stack of cards

      // create empty pets array
      var pets = [];

      // add pets objects to pets array
      pets = response.data.petfinder.pets.pet;

      // loop through pets array, extract prop/val from each pet object
      // for ( var i=0; i < pets.length; i++ )
      // in your loop, grab pets[i] - unless you need a hardcoded sub object

      for ( var i=0; i < pets.length; i++ ) {
      console.dir(i);
      console.dir($scope.pet.name);
      $scope.pet.name = pets[i].name.$t;
      $scope.pet.age = pets[i].age.$t;
      // $scope.pet.photo1 = pets[i].media.photos.photo[0].$t;
      $scope.pet.description = pets[i].description.$t;
      }
    })
    .catch(function(error) {
      console.log("GET/POST error");
    });
})

//AUTH PASSPORT
.controller('LoginCtrl', function($scope, $http, $location, $rootScope) {
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
          $location.path('/tab/match');
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
          $location.path('/settings');
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



.controller('FavoritesCtrl', function($scope) {
  $scope.settings = {
    // enableFriends: true
  };
});
