function FavoritesCtrl($scope, $rootScope, $state, favoritesService) {
  // console.log('Entering FavoritesCtrl....');

  $scope.selected = 0;
  $scope.petFav = {};
  $scope.pet = {};
  var user;
  $scope.selectNext = function() {
    $scope.selected = $scope.selected + 1
  };

  if ($rootScope.session && $rootScope.session.user) {
    user = $rootScope.session.user;
    $scope.petFavs = user.petFavs;
    // console.log('$scope.petFavs', $scope.petFavs);
  } else {
    // console.log('User session unavailable, route to login..');
    $state.go('login');
  }

  $scope.deleteFavorite = function(pet) {

      favoritesService.deleteFav(user._id, pet)
        .success(function(data) {
          if (data.alert) {
            $scope.alert = data.alert;
          } else {
            // deleteFav successful
            // console.log('Delete favorite successful');
            // console.log(data);
            $rootScope.session.user = data.user;
          }
        })
        .error(function(err) {
          $scope.alert = 'Delete favorite failed'
          console.log(err);
        });
  }
}

angular.module('pfApp.controllers')
    .controller('FavoritesCtrl', FavoritesCtrl);
