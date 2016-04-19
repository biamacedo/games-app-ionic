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

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/side-menu.html",
    controller: 'gmAppController'
  })

  .state('app.main', {
      url: '/',
      views: {
        'menuContent' :{
          templateUrl: 'templates/main-page.html',
          controller: 'gmMainController'
        }
      }
  })

  .state('app.platform-list', {
      url: '/platform/list/:manufacturerId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/game-platform-list-page.html',
          controller: 'gmPlatformListController'
        }
      }
  })

  .state('app.game-list', {
      url: '/game/list/:platformId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/game-list-page.html',
          controller: 'gmGameListController'
        }
      }
  })

  .state('app.game-detail', {
      url: '/game/detail/:gameId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/game-detail-page.html',
          controller: 'gmGameDetailController'
        }
      }
  })

  // setup an abstract state for the tabs directive
  .state('app.market', {
      url: '/market',
      views: {
        'menuContent' :{
          templateUrl: 'templates/market-tabs.html'
        }
      }
  })

  // Each tab has its own nav history stack:

  .state('app.market.sell', {
    url: '/sell',
    views: {
      'marketSell': {
        templateUrl: 'templates/market-sell-page.html'//,
        // controller: 'DashCtrl'
      }
    }
  })

  .state('app.market.buy', {
      url: '/buy',
      views: {
        'marketBuy': {
          templateUrl: 'templates/market-buy-page.html'//,
          // controller: 'ChatsCtrl'
        }
      }
    })

  .state('app.user', {
    url: '/user',
    abstract:true
  })

  .state('app.user.games', {
    url: '/games',
    views: {
      'menuContent' :{
        templateUrl: 'templates/user-games-tabs.html'
      }
    }
  })

  .state('app.user.games.owned', {
    url: '/owned',
    views: {
      'gamesOwned' :{
        templateUrl: 'templates/user-games-owned-page.html'
      }
    }
  })

  .state('app.user.games.wish', {
    url: '/wish',
    views: {
      'gamesWish' :{
        templateUrl: 'templates/user-games-wish-page.html'
      }
    }
  })

  .state('app.user.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/user-profile-page.html'//,
        // controller: 'AccountCtrl'
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings-page.html'//,
        // controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
