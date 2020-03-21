(function () {
  'use strict';

  var controllerId = 'fordere.matchDetailCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'matchService', 'teamService', matchDetailCtrl]);

  function matchDetailCtrl($routeParams, matchService, teamService) {
    var vm = this;

    vm.getResult = getResult;
    vm.isRegistered = isRegistered;

    init();

    function isRegistered() {
      if (!vm.match) {
        return false;
      }

      if (vm.match.RegisterDate) {
        return true;
      }

      return false;
    }

    function getResult() {
      if (!vm.match) {
        return '';
      }

      if (!isPlayed()) {
        return 'vs.';
      }

      return vm.match.HomeTeamScore + ':' + vm.match.GuestTeamScore;
    }

    function isPlayed() {
      return vm.match.ResultDate !== undefined;
    }

    function init() {
      matchService.queryById({ Id: $routeParams.id }).$promise.then(successfullyLoaded);

      function successfullyLoaded(result) {
        vm.match = result;

        teamService.queryById({ Id: result.HomeTeamId }, homeTeamLoaded);
        vm.guestteam = teamService.queryById({ Id: result.GuestTeamId }, guestTeamLoaded);

        function homeTeamLoaded(homeTeam) {
          vm.hometeam = homeTeam;
          vm.hometeam.Users = [homeTeam.Player1, homeTeam.Player2];
        }

        function guestTeamLoaded(guestTeam) {
          vm.guestteam = guestTeam;
          vm.guestteam.Users = [guestTeam.Player1, guestTeam.Player2];
        }
      }
    }
  }
})();