function FavoritesCtrl($scope, $rootScope, $state, favoritesService) {
  console.log('Entering FavoritesCtrl....');

  $scope.selected = 0;
  $scope.petFav = {};
  $scope.pet = {};
  var user;
  $scope.selectNext = function (){
    $scope.selected = $scope.selected + 1
  };

  if ($rootScope.session && $rootScope.session.user) {
    user = $rootScope.session.user;
    $scope.petFavs = $rootScope.session.user.petFavs;
    console.log('$scope.petFavs', $scope.petFavs);
  } else {
    console.log('User session unavailable, route to login..');
    $state.go('login');
  }

  $scope.deleteFavorite = function(pet) {

      favoritesService.deleteFav(user._id, pet)  
        .success(function(data) {
          if (data.alert) {
            $scope.alert = data.alert;
          } else {
            // DeleteFav successful
            console.log('Save successful');
            console.log(data);
            $rootScope.session.user = data.user;
          }
        })
        .error(function(err) {
          $scope.alert = 'Settings save failed'
          console.log(err);
        });
  }
}

angular.module('starter.controllers')
    .controller( 'FavoritesCtrl', FavoritesCtrl );
