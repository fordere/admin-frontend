(function () {
  'use strict';

  var controllerId = 'fordere.admin.mailingListCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$scope', 'mailingListService', 'seasonService', 'competitionService', 'leagueService', mailingListCtrl]);

  function mailingListCtrl($scope, mailingListService, seasonService, competitionService, leagueService) {
    var vm = this;

    vm.getLeagueName = getLeagueName;

    vm.seasons = seasonService.query();
    vm.allMails = mailingListService.getMailsForAll();

    $scope.$watch(function () { return vm.selectedSeason; }, function () {
      vm.selectedCompetition = undefined;
      vm.selectedLeague = undefined;

      vm.seasonMails = undefined;
      vm.competitionMails = undefined;
      vm.leagueMails = undefined;

      refreshCompetitions();
      refreshSeasonMails();
    });

    $scope.$watch(function () { return vm.selectedCompetition; }, function () {
      vm.selectedLeague = undefined;
      vm.competitionMails = undefined;
      vm.leagueMails = undefined;

      refreshLeagues();
      refreshCompetitionMails();
    });

    $scope.$watch(function () { return vm.selectedLeague; }, function () {
      vm.leagueMails = undefined;

      refreshLeagueMails();
    });

    function refreshCompetitions() {
      if (vm.selectedSeason) {
        vm.competitions = competitionService.getBySeasonId({ Id: vm.selectedSeason });
      }
    }

    function refreshLeagues() {
      if (vm.selectedCompetition) {
        vm.leagues = leagueService.byCompetitionId({ Id: vm.selectedCompetition });
      }
    }

    function refreshSeasonMails() {
      if (vm.selectedSeason) {
        vm.seasonMails = mailingListService.getMailsBySeason({ Id: vm.selectedSeason });
      }
    }

    function refreshCompetitionMails() {
      if (vm.selectedCompetition) {
        vm.competitionMails = mailingListService.getMailsByCompetition({ Id: vm.selectedCompetition });
      }
    }

    function refreshLeagueMails() {
      if (vm.selectedLeague) {
        vm.leagueMails = mailingListService.getMailsByLeague({ Id: vm.selectedLeague });
      }
    }

    function getLeagueName(league) {
      var leagueName = league.Number + '. Liga';

      if (league.Group) {
        leagueName += ' Gruppe ' + league.Group;
      }

      return leagueName;
    }
  }
})();