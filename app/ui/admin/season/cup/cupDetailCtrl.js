(function() {
  'use strict';

  var controllerId = 'fordere.admin.cupDetailCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$location', '$routeParams', 'cupService', 'competitionService', 'matchService', cupDetailCtrl]);

  function cupDetailCtrl($location, $routeParams, cupService, competitionService, matchService) {
    var vm = this;
    vm.cupService = cupService;
    vm.competitions = competitionService.query();
    vm.startCup = startCup;
    vm.displayRound = $routeParams.round || 1;
    vm.fetchCupMatches = fetchCupMatches;
    vm.navigateToList = navigateToList;
    vm.startNextRound = startNextRound;
    vm.editMatch = editMatch;
    vm.matchService = matchService;
    vm.saveMatch = saveMatch;
    vm.cancelEditMatch = cancelEditMatch;
    vm.getPlayedCount = getPlayedCount;
    vm.getTotalGamesCount = getTotalGamesCount;
    vm.getPlayedPercentage = getPlayedPercentage;

    init();

    function init() {
      vm.cup = cupService.get({ Id: $routeParams.id }, function() {
        vm.matches = cupService.getMatchesByRound({ Id: $routeParams.id, Round: vm.displayRound || 1 });
      });
    }
     
    function navigateToList() {
      $location.path('/admin/cups');
    }
    
    function startCup(competitionId) {
      vm.cupService.createFromCompetition({ Id: vm.cup.Id, CompetitionId: competitionId }, function() {
        init();
      });
    }

    function fetchCupMatches() {
      //$location.path('/admin/cups/' + $routeParams.id + '/round-' + vm.displayRound);
      vm.matches = cupService.getMatchesByRound({ Id: $routeParams.id, Round: vm.displayRound || 1 });
    }

    function startNextRound() {
      cupService.startNextRound({ Id: $routeParams.id }, function() {
        vm.cup = cupService.get({ Id: $routeParams.id }, function() {
          vm.displayRound = vm.cup.CurrentRound;
          init();
        });
      });
    }

    function editMatch(match) {
      $('#editMatch').appendTo('body').modal('show');

      vm.editingMatch = match;
    }

    function saveMatch() {
      $('#editMatch').modal('hide');
      vm.matchService.saveResult({ Id: vm.editingMatch.Id, HomeTeamScore: vm.editingMatch.HomeTeamScore, GuestTeamScore: vm.editingMatch.GuestTeamScore }, function() {
        fetchCupMatches();
      });
    }

    function cancelEditMatch() {
      vm.editingMatch = undefined;
      $('#editMatch').modal('hide');
    }


    function getPlayedCount() {
      if (!vm.matches) {
        return 0;
      }

      return vm.matches.filter(function(m) { return m.PlayDate; }).length;
    }

    function getTotalGamesCount() {
      if (!vm.matches) {
        return 0;
      }

      return vm.matches.length;
    }

    function getPlayedPercentage() {
      return (getPlayedCount() / getTotalGamesCount() * 100).toFixed(2);
    }

  }
})();