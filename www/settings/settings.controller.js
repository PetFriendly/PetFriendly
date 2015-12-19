
function SettingsCtrl($scope, $rootScope, $http, $state) {
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
}

angular.module('starter.controllers')
    .controller( 'SettingsCtrl', SettingsCtrl );
