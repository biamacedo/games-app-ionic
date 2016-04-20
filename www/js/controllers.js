angular.module('game.controllers', [])

.controller('gmAppController', ['$scope', '$state', '$ionicHistory', function($scope, $state, $ionicHistory) {
  $scope.mobile = {};
  $scope.mobile.platform = ionic.Platform.platform();
  console.log('Phone is:', $scope.mobile.platform);


  // Side Menu Functions
  $scope.signOut = function(){
      console.log("Clicking on Sign Out Button");

      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $state.transitionTo("login");
  };
}])

.controller('gmLoginController', ['$scope', '$state', '$ionicHistory', '$ionicPlatform', 'UserService', function($scope, $state, $ionicHistory, $ionicPlatform, UserService) {
    $scope.signIn = function(){
        console.log("Clicking on Login Button");

        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        $state.transitionTo("app.main");
    };

    $scope.signInWithFacebook = function(){
        console.log("Clicking on Facebook Login Button");

        $ionicPlatform.ready(function() {

          UserService.signInFacebook();

        });

        // $ionicHistory.nextViewOptions({
        //   disableBack: true
        // });
        //
        // $state.transitionTo("app.main");
    };

    $scope.signInWithGoogle = function(){
        console.log("Clicking on Google Login Button");

        $ionicPlatform.ready(function() {

          UserService.signInGoogle();

        });

        // $ionicHistory.nextViewOptions({
        //   disableBack: true
        // });
        //
        // $state.transitionTo("app.main");
    };

}])

.controller('gmMainController', ['$scope', '$state', 'ManufacturerService' , function($scope, $state, ManufacturerService) {

    $scope.manufacturers = ManufacturerService.all();


}])

.controller('gmPlatformListController', ['$scope', '$state', '$stateParams', 'PlatformService', 'ManufacturerService' , function($scope, $state, $stateParams, PlatformService, ManufacturerService) {
    var manufacturerId = $stateParams.manufacturerId;

    $scope.manufacturer = ManufacturerService.get(manufacturerId).name;

    $scope.platforms = PlatformService.all();


}])

.controller('gmGameListController', ['$scope', '$state', '$stateParams', 'GameService', 'PlatformService' , function($scope, $state, $stateParams, GameService, PlatformService) {
    var platformId = $stateParams.platformId;

    $scope.platform = PlatformService.get(platformId).name;

    $scope.games = GameService.all();

}])

.controller('gmGameDetailController', ['$scope', '$state', '$stateParams', 'GameService' , function($scope, $state, $stateParams, GameService) {
    var gameId = $stateParams.gameId;

    $scope.game = GameService.get(gameId);

}])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
