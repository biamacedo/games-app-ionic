angular.module('game.controllers', ['ngCordova'])

.controller('gmAppController', ['$scope', '$state', '$location', '$ionicHistory', 'UserService', function($scope, $state, $location, $ionicHistory, UserService) {
  $scope.mobile = {};
  $scope.mobile.platform = ionic.Platform.platform();
  console.log('Phone is:', $scope.mobile.platform);

  $scope.go = function(path){
    console.log("Moving to path: "+ path);
      $location.path(path);
  };

  $scope.updateUser = function(){
    $scope.user = UserService.current();
  };
  $scope.updateUser();

  // Side Menu Functions
  $scope.signOut = function(){
      console.log("Clicking on Sign Out Button");

      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $state.transitionTo("login");
  };
}])

.controller('gmLoginController', [
  '$scope',
  '$state',
  '$ionicHistory',
  '$ionicPlatform',
  'UserService',
  '$cordovaToast',
  function($scope, $state, $ionicHistory, $ionicPlatform, UserService, $cordovaToast) {
    $scope.signIn = function(){
        console.log("Clicking on Login Button");

        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        $state.transitionTo("app.main");
    };

    $scope.signInWithFacebook = function(){
        console.log("Clicking on Facebook Login Button");

        UserService.signInFacebook().then(function(user){

            $ionicHistory.nextViewOptions({
              disableBack: true
            });

            $state.transitionTo("app.main");
        }, function(error){
          $cordovaToast.showLongBottom('Login Error: ' + error);
        });

    };

    $scope.signInWithGoogle = function(){
        console.log("Clicking on Google Login Button");

        UserService.signInGoogle().then(function(user){

            $ionicHistory.nextViewOptions({
              disableBack: true
            });

            $state.transitionTo("app.main");
        }, function(error){
          $cordovaToast.showLongBottom('Login Error: ' + error);
        });
    };

}])

.controller('gmMainController', ['$scope', '$state', 'UserService', 'ManufacturerService' , function($scope, $state, UserService, ManufacturerService) {
    $scope.user = UserService.current();


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

.controller('gmGameDetailController', [
  '$scope',
  '$state',
  '$stateParams',
  'UserService',
  'GameService',
  '$cordovaToast',
function($scope, $state, $stateParams, UserService, GameService, $cordovaToast) {
    var gameIndexId = $stateParams.gameId;

    $scope.game = GameService.get(gameIndexId);

    var gameId = angular.copy($scope.game.id);

    $scope.isFavorite = function(){
      return UserService.user.hasFavorite(gameId);
    };
    $scope.favoriteToggle = function(){
      if (!$scope.isFavorite()){
          UserService.user.addFavorite(gameId);
          $cordovaToast.showLongBottom('Game Favorited!');
      } else {
          UserService.user.removeFavorite(gameId);
          $cordovaToast.showLongBottom('Game Un-Favorited!');
      }
    };

    $scope.isOwned = function(){
      console.log("isOwned");
      return UserService.user.hasOwned(gameId);
    };
    $scope.ownToggle = function(){
      if (!$scope.isOwned()){
          UserService.user.addOwned(gameId);
          $cordovaToast.showLongBottom('Game added to Owned List!');
      } else {
          UserService.user.removeOwned(gameId);
          $cordovaToast.showLongBottom('Game removed to Owned List!');
      }
    };

    $scope.isWished = function(){
      return UserService.user.hasWished(gameId);
    };
    $scope.wishToggle = function(){
      if (!$scope.isWished()){
          UserService.user.addWished(gameId);
          $cordovaToast.showLongBottom('Game added to Wish List!');
      } else {
          UserService.user.removeWished(gameId);
          $cordovaToast.showLongBottom('Game removed to Wish List!');
      }
    };


}])

.controller('gmUserProfileCtrl', ['$scope', 'UserService', '$cordovaToast', function($scope, UserService, $cordovaToast) {
  console.log("gmUserProfileCtrl");
  $scope.user = UserService.current();

  $scope.editComment = {
    comment: "",
    rating: 1,
    user: {
      name: $scope.user.name
    }
  };
  console.log($scope.editComment.rating);

  $scope.qualificateRatingStar = function(rating){
    console.log("Setting Rating");
    console.log(rating);
    $scope.editComment.rating = rating;
      console.log($scope.editComment.rating);
  };

  $scope.sendQualification = function(){
    console.log("Sending Qualification");
    console.log($scope.editComment.comment);
    var sendComment =  angular.copy($scope.editComment);
    UserService.user.addQualification(sendComment);
    $cordovaToast.showLongBottom('Qualification Added!');
    $scope.user = UserService.current();
    $scope.editComment.comment = "";
    $scope.editComment.rating = 1;
  };

}])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
