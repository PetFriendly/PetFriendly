function LogoutCtrl ($rootScope, $state) {
  // console.log('Entering LogoutCtrl....');
  $rootScope.session = undefined;
  $state.go('login');
}

angular.module('pfApp.controllers')
    .controller('LogoutCtrl', LogoutCtrl);
