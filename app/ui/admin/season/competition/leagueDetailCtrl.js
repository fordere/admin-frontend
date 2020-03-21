(function () {
  'use strict';

  var controllerId = 'fordere.admin.leagueDetailCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'leagueService', '$location', leagueDetailCtrl]);

  function leagueDetailCtrl($routeParams, leagueService, $location) {
    var vm = this;

    if ($routeParams.id != 0) {
      vm.league = leagueService.getById({ Id: $routeParams.id });
    } else {
      vm.league = { Id: 0, Number: 1, Group: 0, LeagueMatchCreationMode: 'Single', CompetitionId: $routeParams.competitionId };
    }

    vm.save = save;
    vm.gotoList = gotoList;

    function save() {
      if (vm.league.Id != 0) {

        leagueService.save(vm.league).$promise.then(function () {
          vm.gotoList();
        });
      } else {
        leagueService.create(vm.league, function () {
          vm.gotoList();
        });
      }
    }

    function gotoList() {
      $location.path('/admin/season/' + $routeParams.seasonId + "/competitions/" + $routeParams.competitionId + "/leagues");
    }
  }

})();