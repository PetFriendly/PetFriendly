// PetFriendly App
angular.module('pfApp', ['ionic', 'pfApp.controllers'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  //Initialize $rootScope.session
  $rootScope.session = {};
  $rootScope.session.apiReload = true;
  $rootScope.session.apiOffset = 0;
  console.log('run...$rootScope.session.apiReload', $rootScope.session.apiReload);
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Set maxCache to 0 so views reload
  $ionicConfigProvider.views.maxCache(0);

  // AngularUI Router
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'settings/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('tab.match', {
      url: '/match',
      views: {
        'tab-match': {
          templateUrl: 'match/tab-match.html',
          controller: 'MatchCtrl'
        }
      }
    })

  .state('tab.favorites', {
    url: '/favorites',
    views: {
      'tab-favorites': {
        templateUrl: 'favorites/tab-favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  // PASSPORT AUTH
  .state('login', {
    url: '/login',
    templateUrl: 'auth/login.html',
    controller: 'LoginCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'auth/register.html',
    controller: 'LoginCtrl'
  })
  .state('logout', {
    url: '/logout',
    controller: 'LogoutCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/settings');

});
