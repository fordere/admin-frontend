(function () {
  'use strict';

  var controllerId = 'fordere.mydayCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$scope', '$filter', 'matchService', 'barService', 'toastr', 'AuthService', '$rootScope', myseasonCtrl]);

  function myseasonCtrl($scope, $filter, matchService, barService, toastr, authService, $rootScope) {

    var vm = this;
    vm.isHomeMatch = isHomeMatch;
    vm.getOpponentTeamName = getOpponentTeamName;
    vm.getOpponentTeamId = getOpponentTeamId;
    vm.getResultType = getResultType;
    vm.myTeamScore = myTeamScore;
    vm.opponentTeamScore = opponentTeamScore;

    vm.init = init;

    init();

    $rootScope.$on("event:mymatches-changed", init);

    $scope.$watch(function () {
      return authService.getAuthenticatedUser().Id;
    }, function () {
      vm.isAuthenticated = authService.isAuthenticated();

      if (vm.isAuthenticated) {
        init();
      }
    });

    function opponentTeamScore(match) {
      if (match.HomeTeamScore === undefined) {
        return "";
      }

      if (isHomeMatch(match)) {
        return match.GuestTeamScore;
      }

      return match.HomeTeamScore;
    }

    function myTeamScore(match) {
      if (match.HomeTeamScore === undefined) {
        return "";
      }

      if (isHomeMatch(match)) {
        return match.HomeTeamScore;
      }

      return match.GuestTeamScore;
    }

    function getResultType(match) {
      if (match.HomeTeamScore === undefined) {
        return "";
      }

      if (isHomeMatch(match)) {
        if (match.WinnerTeamId === match.HomeTeamId) {
          return "Sieg";
        } else {
          return "Niederlage";
        }
      } else {
        if (match.WinnerTeamId === match.HomeTeamId) {
          return "Niederlage";
        } else {
          return "Sieg";
        }
      }
    }

    function isHomeMatch(match) {
      if (!match) {
        return false;
      }

      return match.HomePlayer1Id == getCurrentUserId() || match.HomePlayer2Id == getCurrentUserId();
    }

    function getCurrentUserId() {
      return authService.getAuthenticatedUser().Id;
    }

    // Private functions implementation 

    function getOpponentTeamName(match) {
      if (isHomeMatch(match)) {
        return match.GuestTeamName;
      }
      return match.HomeTeamName;
    }

    function getOpponentTeamId(match) {
      if (isHomeMatch(match)) {
        return match.GuestTeamId;
      }
      return match.HomeTeamId;
    }

    function init() {
      var userId = getCurrentUserId();

      if (userId) {
        vm.matches = matchService.myDay();
      }
    }
  }
})();