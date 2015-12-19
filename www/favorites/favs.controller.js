function FavoritesCtrl($scope, $rootScope, $state) {
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
}

angular.module('starter.controllers')
    .controller( 'FavoritesCtrl', FavoritesCtrl );
