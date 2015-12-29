function LoginCtrl ($scope, $http, $state, $rootScope) {
  // console.log('Entering LoginCtrl....');

  $scope.user  = {
    username: '',
    password: ''
  };
  $scope.alert = '';

  $scope.login = function(user) {
    $scope.alert = '';
    // console.log(user);
    $http.post('/login', user).
      success(function(data) {
        if (data.alert) {
          $scope.alert = data.alert;
        } else {
          // Login successful
          // console.log('Login successful');
          // console.log(data);
          $rootScope.session = {};
          $rootScope.session.user = data.user;
          $rootScope.session.apiReload = true;
          $rootScope.session.apiOffset = 0;
          $state.go('tab.match');
          // console.log('exiting LoginCtrl')
        }
      }).
      error(function(err) {
        $scope.alert = 'Login failed'
        // console.log(err);
      });
    // console.log('Login pressed...');

  };

  $scope.register = function(user) {
    $scope.alert = '';
    $http.post('/register', user).
      success(function(data) {
        if (data.alert) {
          $scope.alert = data.alert;
        } else {
          // Registration successful
          // console.log(data);
          // console.log($rootScope);
          $rootScope.session = {};
          $rootScope.session.user = data.user;
          $rootScope.session.apiReload = true;
          $rootScope.session.apiOffset = 0;
          $state.go('tab.settings');
        }
      }).
      error(function() {
        $scope.alert = 'Registration failed'
      });
    // console.log('Register pressed...');

  };
}

angular.module('pfApp.controllers')
    .controller('LoginCtrl', LoginCtrl);
