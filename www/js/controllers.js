angular.module('starter.controllers', [])

.controller('SettingsCtrl', function($scope) {})

.controller('DetailsCtrl', function($scope) {})

//AUTH PASSPORT
.controller('LoginCtrl', function($scope, $http) {
  console.log('Entering LoginCtrl....');

  $scope.user  = {
    username: '',
    password: ''
  };
  $scope.alert = '';
 
  $scope.login = function(user){
    $http.post('/auth/login', user).
      success(function(data) {
        $scope.loggeduser = data;
        $location.path('/user');
      }).
      error(function() {
        $scope.alert = 'Login failed'
      });
    console.log('Login pressed...');
 
  };
 
  $scope.register = function(user){
    $http.post('/auth/register', user).
      success(function(data) {
        $scope.alert = data.alert;
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
