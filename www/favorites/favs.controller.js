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

// $scope.saveFavorite = function(pet, isFav) {

//       favoritesService.savFavs(user._id, pet, isFav)  
//         .success(function(data) {
//           if (data.alert) {
//             $scope.alert = data.alert;
//           } else {
//             // Login successful
//             console.log('Save successful');
//             console.log(data);
//             $rootScope.session.user = data.user;
//             //$state.go('tab.match', { reload: true });
//             //$state.go('tab.match');
//           }
//         })
//         .error(function(err) {
//           $scope.alert = 'Settings save failed'
//           console.log(err);
//         });
        
//       $scope.selectNext();
//     }
// }

angular.module('starter.controllers')
    .controller( 'FavoritesCtrl', FavoritesCtrl );
