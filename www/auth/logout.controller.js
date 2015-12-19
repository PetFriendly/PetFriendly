function LogoutCtrl ($scope, $rootScope, $state) {
  console.log('Entering LogoutCtrl....');

  //$scope.logout = function(){
    console.log('Logout pressed...');
    $rootScope.session = undefined;
    $state.go('login');
  //};

}

angular.module('starter.controllers')
    .controller( 'LogoutCtrl', LogoutCtrl );
