// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('game', [
    'ionic',
    'game.directives',
    'game.controllers',
    'game.factories'])

.run(function($ionicPlatform) {
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
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login-page.html',
      controller: 'gmLoginController'
  })

  .state('main', {
      url: '/',
      templateUrl: 'templates/main-page.html',
      controller: 'gmMainController'
  })

  // setup an abstract state for the tabs directive
  .state('market', {
      url: '/market',
      abstract: true,
      templateUrl: 'templates/market-tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('market.sell', {
    url: '/sell',
    views: {
      'market-sell': {
        templateUrl: 'templates/market-sell-page.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('market.buy', {
      url: '/buy',
      views: {
        'market-buy': {
          templateUrl: 'templates/market-buy-page.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('settings', {
    url: '/settings',
    views: {
      'settings': {
        templateUrl: 'templates/settings-page.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
