function LogoutCtrl ($rootScope, $state) {
  // console.log('Entering LogoutCtrl....');
  $rootScope.session = {};
  $rootScope.session.apiReload = true;
  $rootScope.session.apiOffset = 0;
  $state.go('login');
}

angular.module('pfApp.controllers')
    .controller('LogoutCtrl', LogoutCtrl);
