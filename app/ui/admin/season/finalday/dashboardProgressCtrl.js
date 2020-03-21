(function () {
  'use strict';

  var controllerId = 'fordere.admin.finalday.dashboardProgressCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'finalDayService', 'finalDayTournamentService', '$rootScope', dashboardProgressCtrl]);

  function dashboardProgressCtrl($routeParams, finalDayService, finalDayTournamentService, $rootScope) {
    var vm = this;

    vm.start = start;
    vm.hold = hold;
    vm.continue = continueCompetition;
    vm.newCrazyDypRound = newCrazyDypRound;
    vm.labels = ['Gespielt', 'Offen', 'Running'];
    vm.colors = ['#00913D', '#FF3300', '#00C06B'];
    vm.chartOptions = {
      animation: false
    };

    $rootScope.$on('finalday:match:changed', function () {
      init();
    });

    function newCrazyDypRound(competitionId) {
      vm.newRoundAddInProgress = true;
      finalDayTournamentService.createNewRound({ Id: competitionId }).$promise.then(() => {
        vm.newRoundAddInProgress = false;
        $rootScope.$broadcast('finalday:competitionstate:changed');
      });
    }

    function start(competitionId) {
      updateTournamentState(competitionId, 'Running');
    }

    function hold(competitionId) {
      updateTournamentState(competitionId, 'OnHold');
    }

    function continueCompetition(competitionId) {
      updateTournamentState(competitionId, 'Running');
    }

    function updateTournamentState(competitionId, state) {
      return finalDayTournamentService.updateState({ Id: competitionId, CompetitionState: state }).$promise.then(function () {
        vm.competitions.find(function (x) { return x.CompetitionId === competitionId; }).CompetitionState = state;
        $rootScope.$broadcast('finalday:competitionstate:changed');
      });
    }

    function init() {
      finalDayService.getProgress({ Id: $routeParams.Id }, function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].progress = [data[i].MatchesPlayed, data[i].MatchesOpen, data[i].MatchesRunning];
        }

        vm.competitions = data;
      });
    }

    init();
  }
})();
