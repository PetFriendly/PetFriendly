angular.module('starter.controllers', [])

.controller('SettingsCtrl', function($scope) {})

.controller('DetailsCtrl', function($scope) {})

//AUTH PASSPORT
.controller('LoginCtrl', function($scope, $http, $location) {
  console.log('Entering LoginCtrl....');

  $scope.user  = {
    username: '',
    password: ''
  };
  $scope.alert = '';
 
  $scope.login = function(user){
    $scope.alert = '';
    console.log(user);
    $http.post('http://petfriendly.herokuapp.com/login', user).
      success(function(data) {
        if (data.alert) {
          $scope.alert = data.alert;
        } else {
          // Login successful
          console.log('Login successful');
          $location.path('/tab/match');
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
    $http.post('http://petfriendly.herokuapp.com/register', user).
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
