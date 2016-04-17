angular.module('game.directives', [])

.directive('mainTile', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      place: '=',
      onClick: '&'
    },
    templateUrl: 'templates/directives/main-tile.html'
  };
});
