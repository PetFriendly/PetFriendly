function LogoutCtrl ($rootScope, $state) {
  console.log('Entering LogoutCtrl....');
  $rootScope.session = undefined;
  $state.go('login');
}

angular.module('starter.controllers')
    .controller( 'LogoutCtrl', LogoutCtrl );
